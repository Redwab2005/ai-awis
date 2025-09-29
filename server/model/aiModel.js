const { default: mongoose } = require("mongoose");

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
      "atical",
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
        return this.type === "image-generation";
      },
      message: "isPublic is only valid for image-generation type",
    },
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
