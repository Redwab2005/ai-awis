const express = require("express");
const {generateImage, generateArticle, generateBlogTitle, removeBackground, removeObject, resumeReview } = require("../controllers/aiController");
const upload = require("../configs/multer");


const aiRouter = express.Router();
aiRouter.post("/generate-image", generateImage);
aiRouter.post("/generate-blog-title", generateBlogTitle);
aiRouter.post("/generate-article", generateArticle);
aiRouter.post("/remove-background", upload.single("image"), removeBackground);
aiRouter.post("/remove-object", upload.single("image"), removeObject);
aiRouter.post("/resume-review", upload.single("resume"), resumeReview);

module.exports = aiRouter;