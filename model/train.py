import torch
from torch import nn
from torch._C import device
from torch.nn import functional as F
from torch.utils.data import DataLoader
from torchvision import datasets
from torchvision.datasets.sbd import shutil
from torchvision.transforms import v2 as transforms
from torch.optim import AdamW
from torch.optim.lr_scheduler import CosineAnnealingLR
import math
from tqdm import tqdm
from glob import glob
import os
import numpy as np

DATA_DIR = "/kaggle/input/datasets/abdallahalidev/plantvillage-dataset/color"
IMAGE_SUBSET = "Corn*/*"
MAIZE_DIR = "Maize"
CORN_IMAGES = glob(os.path.sep.join([DATA_DIR, IMAGE_SUBSET]))
IMAGE_SIZE = 224
EPOCHS = 50
LEARNING_RATE = 3e-4 * 8
BATCH_SIZE = 64
NUM_WORKERS = os.cpu_count()

# AUGMENTATION HPARAMS
MIXUP_ALPHA = 0.4
CUTMIX_ALPHA = 1.0
PROB_MIXUP = 0.4
PROB_CUTMIX = 0.4

# Label smoothing for generalization
LABEL_SMOOTHING = 0.1

def make_subset():
    """Separates out Corn images from the rest of the images.
Corn images will be moved to their own directory and used for training.
    """
    classes = "Healthy Nothern_Leaf_Blight Common_Rust Gray_Leaf_Spot".split(" ")
    for dir_ in classes:
        os.makedirs(f"Maize/{dir_}", exist_ok=True)

    count = 0
    for img_path in tqdm(CORN_IMAGES, desc="Separating Corn images"):
        for class_ in classes:
            if class_.lower() in img_path.lower():
                shutil.copy2(img_path, f"Maize/{class_}/{img_path}")
                count += 1

    print(f"Successfully moved {count} images from Corn* to Maize directories.")

def get_dataset_stats(data_dir):
    """
    Calculates the global mean and standard deviation statistics of the training images (Corn), used for normalization.
    """

    dataset = datasets.ImageFolder(root=data_dir,
                                   transform=transforms.Compose([
                                       transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
                                       transforms.ToDtype(torch.float32, scale=True)
                                       ]))

    loader = DataLoader(dataset=dataset, batch_size=BATCH_SIZE, num_workers=NUM_WORKERS)

    count = 0
    first_moment = torch.empty(3)
    second_moment = torch.empty(3)

    print("[INFO] Calculating Mean and Std...")
    for images, _ in tqdm(loader):
        b, c, h, w = images.shape
        nb_pixels = b * h * w # Number of Pixels per channel
        sum_ = torch.sum(images, dim=[0, 2, 3]) # Sum per chanel
        sum_of_square = torch.sum(images ** 2, dim=[0, 2, 3])
        first_moment = (count * first_moment + sum_) / (count + nb_pixels)
        second_moment = (count * first_moment + sum_of_square) / (count + nb_pixels)
        count += nb_pixels

    return first_moment.tolist(), torch.sqrt(second_moment.square()).tolist()

MEAN, STD = get_dataset_stats(MAIZE_DIR)
print(f"Mean: {MEAN} | STD: {STD}")

train_transform = transforms.Compose([
    transforms.ToImage(),
    transforms.ToDtype(torch.float32, scale=True),
    transforms.RandomResizedCrop(IMG_SIZE),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(0.2, 0.2, 0.2),
    transforms.Normalize(MEAN, STD)
])

val_transform = transforms.Compose([
    transforms.ToImage(),
    transforms.ToDtype(torch.float32, scale=True),
    transforms.Resize((IMG_SIZE, IMG_SIZE)),
    transforms.Normalize(MEAN, STD)
])

def rand_bbox(size, lam):
    """
    Generates a random bounding box for CutMix.
    """
    W = size[2]
    H = size[3]
    cut_rat = np.sqrt(1. - lam) # Cut ratio
    cut_w = int(W * cut_rat)
    cut_h = int(H * cut_rat)

    # random center
    cx = np.random.randint(W)
    cy = np.random.randint(H)

    bbx1 = np.clip(cx - cut_w // 2, 0, W)
    bby1 = np.clip(cy - cut_h // 2, 0, H)

    bbx2 = np.clip(cx + cut_w // 2, 0, W)
    bby2 = np.clip(cy + cut_h // 2, 0, H)

    return bbx1, bby1, bbx2, bby2

def mixup_cutmix_data(x, y, alpha_mix=0.4, alpha_cut=1.0):
    """
    TPU-optimized MixUp/CutMix with explicit int32 casting to fix X64 RNG errors.
    """
    p = np.random.rand()
    batch_size, channels, h, w = x.shape
    device = x.device

    if p < PROB_MIXUP:
        lam = float(np.random.beta(alpha_mix, alpha_mix))

        index = torch.randperm(batch_size, device=device, dtype=torch.int32)

        mixed_x = lam * x + (1 - lam) * x[index, :]
        y_a, y_b = y, y[index]

        return mixed_x, y_a, y_b, lam, "mixup"

    elif p < (PROB_MIXUP + PROB_CUTMIX):
        lam = float(np.random.beta(alpha_cut, alpha_cut))

        index = torch.randperm(batch_size, device=device, dtype=torch.int32)

        y_a, y_b = y, y[index]

        cut_rat = np.sqrt(1. - lam) # Cut ratio
        cut_w = int(w * cut_rat)
        cut_h = int(h * cut_rat)

        # random center
        cx = np.random.randint(W)
        cy = np.random.randint(H)

        bbx1 = np.clip(cx - cut_w // 2, 0, w)
        bby1 = np.clip(cy - cut_h // 2, 0, h)

        bbx2 = np.clip(cx + cut_w // 2, 0, w)
        bby2 = np.clip(cy + cut_h // 2, 0, h)

        mask_np = np.ones((h, w), dtype=np.float32)
        mask_np[bby1:bby2, bbx1:bbx2] = 0.0

        mask = torch.from_numpy(mask_np).to(device)
        mask = mask.view(1, 1, h, w)

        mixed_x = x * mask + x[index] * (1 - mask)

        lam = 1 - ((bbx2 - bbx1) * (bby2 - bby1) / (w * h))

        return mixed_x, y_a, y_b, lam, 'cutmix'

    else:
        return x, y, y, 1.0, 'none'



