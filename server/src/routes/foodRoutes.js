import express from "express";
import {
  getFoodItems,
  addFoodItem,
  searchfood,
} from "../controllers/foodController.js";
import { verifyToken } from "../middlewares/middleWareJWT.js";

const router = express.Router();

// Route to get food items with filters
router.get("/", getFoodItems);

// Route to add a new food item
// router.post("/", verifyToken, addFoodItem);
router.post("/", addFoodItem);

// Route to recommend food items based on entered letters
router.get("/recommend/:query", searchfood);

export { router as foodRouter };
