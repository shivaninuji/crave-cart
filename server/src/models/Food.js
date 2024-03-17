import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{ type: String, required: true }],
  instructions: [{ type: String, required: true }],
  imageUrl: { type: String, required: true },
  diet: { type: String, required: true, enum: ["veg", "non-veg", "dessert"] },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});
export const FoodModel = mongoose.model("food", FoodSchema);
