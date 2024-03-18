import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "food",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
});

export const OrderModel = mongoose.model("Order", OrderSchema);
