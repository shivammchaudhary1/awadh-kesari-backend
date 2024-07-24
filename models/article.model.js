import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true, // Trims whitespace from both ends of a string
    },
    subheading: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String], // Corrected type declaration
      validate: {
        validator: function (arr) {
          return arr.every((img) => typeof img === "string");
        },
        message: "All images must be strings.",
      },
    },
    videoLink: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true, // Corrected to `true`
  }
);

// Add indexes for optimization
articleSchema.index({ title: 1 });
articleSchema.index({ date: -1 });

export default mongoose.model("Article", articleSchema);
