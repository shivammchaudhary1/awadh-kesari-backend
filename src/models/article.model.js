import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
  {
    reporterId: {
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
    category: {
      type: String,
      // enum:["Sports","Entertainment","Health","Technology","Business","General","National","International"],
      trim: true,
      required: true,
    },
    images: {
      type: [String], // Corrected type declaration
      default: [],
      // validate: {
      //   validator: function (arr) {
      //     return arr.every((img) => typeof img === "string");
      //   },
      //   message: "All images must be strings.",
      // },
    },
    videoLink: {
      type: String,
      default: "",
    },
  },
  {
    versionKey: false,
    timestamps: true, // Corrected to `true`
  }
);

// Add indexes for optimization
articleSchema.index({ title: 1 });
articleSchema.index({ reporterId: 1 });

export default mongoose.model("Article", articleSchema);
