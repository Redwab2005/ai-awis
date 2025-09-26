const express = require("express");
const {generateImage} = require("../controllers/aiController");
const {generateBlogTitle}= require("../controllers/aiController");
const {generateArticle}= require("../controllers/aiController");


const aiRouter = express.Router();
aiRouter.post("/generate-image", generateImage);
aiRouter.post("/generate-blog-title", generateBlogTitle);
aiRouter.post("/generate-article", generateArticle);

module.exports = aiRouter;