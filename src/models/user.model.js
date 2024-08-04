import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "banned", "blocked"],
      default: "active",
    },
    role: {
      type: String,
      enum: ["admin", "user", "reporter"],
      default: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;
