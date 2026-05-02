import express from "express";
import multer from "multer";
import { InferenceSession, Tensor } from "onnxruntime-node";
import sharp from "sharp";

const app = express();
const upload = multer();

const MODEL_PATH = "../../model/model.onnx";
let session: InferenceSession;
async function loadModel() {
  const model = await InferenceSession.create(MODEL_PATH);
  console.log("Model loaded");
  console.log("Inputs:", session.inputNames);
  console.log("Outputs:", session.outputNames);

  session = model
  return model
}

async function preprocessImage(buffer: sharp.SharpOptions | undefined) {
  // Resize to 224x224 and get raw RGB
  const image = await sharp(buffer)
    .resize(224, 224)
    .removeAlpha()
    .raw()
    .toBuffer();

  const floatData = new Float32Array(1 * 3 * 224 * 224);

  // Convert HWC → CHW
  for (let i = 0; i < 224 * 224; i++) {
    floatData[i] = image[i * 3] / 255.0;                 // R
    floatData[i + 224 * 224] = image[i * 3 + 1] / 255.0; // G
    floatData[i + 2 * 224 * 224] = image[i * 3 + 2] / 255.0; // B
  }

  return new Tensor("float32", floatData, [1, 3, 224, 224]);
}

app.post("/infer", upload.single("image"), async (req, res) => {
  try {
    if ("file" in req && !req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const inputTensor = await preprocessImage((req as any).file.buffer);

    const feeds:Record<string, any> = {};
    feeds[session.inputNames[0]] = inputTensor;

    const results = await session.run(feeds);

    const outputName = session.outputNames[0];
    const output = results[outputName].data;
    
    console.log(output);
    // TODO: convert this into diseases enum
    res.json({
      output: Array.from(output)
    });

    

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Inference failed" });
  }
});

const PORT = 3000;

loadModel().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});