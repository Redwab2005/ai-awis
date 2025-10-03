const OpenAI = require("openai");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const FormData = require("form-data");
const e = require("express");
const { resource } = require("../app");
const fs = require("fs");
const pdf = require("pdf-parse/lib/pdf-parse.js");
const AiModel = require("../model/aiModel");
const { count } = require("console");

const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

const recentCreation = async (req, res) => {
  try {
    const creations = await AiModel.find({ user_id: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json({
      success: true,
      count: creations.length,
      creations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

    await AiModel.create({
      user_id: req.user._id,
      type: "article",
      prompt,
      result: content,
    });

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

    // Save to database
    await AiModel.create({
      user_id: req.user._id,
      type: "blog-title",
      prompt,
      result: content,
    });
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
    await AiModel.create({
      user_id: req.user._id,
      type: "image-generation",
      isPublic: req.body.isPublic || false,
      prompt,
      result: uploadResponse.secure_url,
    });
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
const removeBackground = async (req, res) => {
  try {
    const path = req.file.path;

    // ✅ Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
    });

    await AiModel.create({
      user_id: req.user._id,
      type: "remove-background",
      prompt: `Remove background from ${req.file.originalname}`,
      result: uploadResponse.secure_url,
    });
    fs.unlink(resume.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });
    res.json({
      success: true,
      content: uploadResponse.secure_url,
    });
  } catch (error) {
    console.error("Image generation error:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const removeObject = async (req, res) => {
  try {
    const { object } = req.body;
    const path = req.file.path;

    // ✅ Upload to Cloudinary
    const { public_id } = await cloudinary.uploader.upload(path);
    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });

    await AiModel.create({
      user_id: req.user._id,
      type: "remove-object",
      prompt: `Remove ${object} from ${req.file.originalname}`,
      result: imageUrl,
    });
    fs.unlink(resume.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });
    res.json({
      success: true,
      content: imageUrl,
    });
  } catch (error) {
    console.error("Image generation error:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const resumeReview = async (req, res) => {
  try {
    const  resume  = req.file;
    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File size exceeds 5MB limit",
      });
    }

    const dataBuffer = fs.readFileSync(resume.path);
    const pdf1 = await pdf(dataBuffer);
    const prompt = `Review my resume provide constructive feedback on its strengths and weaknesses and areas for improvement: ${pdf.text}`;
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await AiModel.create({
      user_id: req.user._id,
      type: "resume-review",
      prompt: `Review ${req.file.originalname} resume`,
      result: content,
    });
        // Delete file after finishing
    fs.unlink(resume.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });
    res.json({
      success: true,
      content,
    });
    
  } catch (error) {
    console.error("Image generation error:", error.message);
     if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Cleanup failed:", err);
      });
    }
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const community = async (req, res) => {
  try {
    const creations = await AiModel.find({
      type: "image-generation",
      isPublic: true,
    })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({
      success: true,
      creations,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateArticle,
  generateImage,
  generateBlogTitle,
  removeBackground,
  removeObject,
  resumeReview,
  recentCreation,
  community,
};
