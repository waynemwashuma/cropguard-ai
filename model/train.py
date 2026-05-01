import torch
from torch import nn
from torch.nn import functional as F
from torchvision.transforms import v2 as transforms
from torch.option import AdamW
from torch.optim.lr_scheduler import CosineAnnealingLR
import math
from tqdm import tqdm
from glob import glob
import os

DATA_DIR = glob("/kaggle/input/datasets/abdallahalidev/plantvillage-dataset/color")
IMAGE_SUBSET = "Corn*/*"
CORN_IMAGES = glob(os.path.join(DATA_DIR, IMAGE_SUBSET))
IMAGE_SIZE = 224
EPOCHS = 50
LEARNING_RATE = 3e-4


