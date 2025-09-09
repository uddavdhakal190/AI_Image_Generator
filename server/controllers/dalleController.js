// controllers/dalleController.js
import OpenAI from "openai";
import * as dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: "Prompt is required" });
    }
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ success: false, message: "OPENAI_API_KEY is missing in .env" });
    }

    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const b64 = result?.data?.[0]?.b64_json;
    if (!b64) {
      return res.status(502).json({ success: false, message: "No image returned from OpenAI" });
    }

    const base64 = `data:image/png;base64,${b64}`;
    return res.status(200).json({ success: true, photo: base64 });
  } catch (err) {
    console.error("Image generation failed:", err?.response?.data || err?.message || err);
    const status = err?.status || err?.response?.status || 500;
    return res.status(status).json({
      success: false,
      message: "Image generation failed",
      detail: err?.response?.data || err?.message || "Unknown error",
    });
  }
};