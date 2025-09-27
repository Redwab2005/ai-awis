const OpenAI = require("openai");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const FormData = require("form-data");
const e = require("express");
const { resource } = require("../app");
const fs = require("fs");
const pdf = require("pdf-parse/lib/pdf-parse.js");


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

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const generateBlogTitle = async (req, res) => {
  try {
    const { prompt} = req.body;

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

    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
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
const removeBackground = async (req, res) => {
  try {
    const path = req.file.path;

   
    // ✅ Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(path,{
      transformation:[
        {
          effect:'background_removal',
          background_removal:'remove_the_background',
        }
      ]
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
    const {public_id} = await cloudinary.uploader.upload(path);
    const imageUrl = cloudinary.url(public_id,{
      transformation: [{effect:`gen_remove:${object}`}],
      resource_type:'image'
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
    
    const { resume } = req.file;
    if (resume.size > 5 * 1024 * 1024) {
      return res.json ({
        success: false,
        message: "File size exceeds 5MB limit",
      })
    }

   
   const dataBuffer = fs.readFileSync(resume.path);
   const pdf = await pdf(dataBuffer);
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
    res.json({
      success: true,
      content,
    });
  } catch (error) {
    console.error("Image generation error:", error.message);
    res.json({
      success: false,
      message: error.message,
    });
  }
};





// export in CommonJS
module.exports = { generateArticle, generateImage, generateBlogTitle, removeBackground, removeObject, resumeReview };