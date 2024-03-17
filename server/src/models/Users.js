import mongoose from "mongoose";

// Define a MongoDB schema for user data
const UserSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    displayName: { type: String },
    email: { type: String },
    image: { type: String },
    role: {
      type: String,
      enum: ["user", "admin"],
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model("users", UserSchema);
