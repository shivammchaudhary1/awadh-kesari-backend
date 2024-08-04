import mongoose from "mongoose";

const commnetSchema = new mongoose.Schema(
  {
    articleId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Comment", commnetSchema);
