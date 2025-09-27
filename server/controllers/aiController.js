const OpenAI = require("openai");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const FormData = require("form-data");

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const generateArticle = async (req, res) => {
  try {
    const { prompt, length } = req.body;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generateBlogTitle = async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;

    res.status(200).json({
      success: true,
      content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;

    const form = new FormData();
    form.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      form,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          ...form.getHeaders(),
        },
        responseType: "arraybuffer",
      }
    );

    // ✅ convert to base64
    const base64Image = Buffer.from(data, "binary").toString("base64");

    // ✅ Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64Image}`,
      { folder: "clipdrop" }
    );

    res.status(200).json({
      success: true,
      content: uploadResponse.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export in CommonJS
module.exports = { generateArticle, generateImage, generateBlogTitle };
