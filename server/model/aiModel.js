const { default: mongoose } = require("mongoose");
const { validate } = require("./userModel");

const aiModelSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: [
      "article",
      "blog-title",
      "image-generation",
      "remove-background",
      "remove-object",
      "resume-review",
    ],
  },
  isPublic: {
    type: Boolean,
    default: false,
    validate: {
      validator: function (v) {
        // allow true only if type === "image-generation"
        if (v === true && this.type !== "image-generation") {
          return false;
        }
        return true;
      },
      message: "isPublic can only be true when type is 'image-generation'",
    },
  },
  likes: {
    type: Number,
    default: 0,
    validate: {
      validator: function (v) {
        return v >= 0 && this.isPublic === true;
      },
      message: "Likes cannot be negative and can only be set for public items",
    },
  },
  likedBy: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
  },
  prompt: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const AiModel = mongoose.model("AiModel", aiModelSchema);
module.exports = AiModel;
