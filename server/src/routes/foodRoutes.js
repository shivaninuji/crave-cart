import express from "express";
import {
  getFoodItems,
  addFoodItem,
  recommendFoodItems,
} from "../controllers/foodController.js";
import { verifyToken } from "../middlewares/middleWareJWT.js";

const router = express.Router();

// Route to get food items with filters
router.get("/", getFoodItems);

// Route to add a new food item
router.post("/", verifyToken, addFoodItem);

// Route to recommend food items based on entered letters
router.get("/recommend", recommendFoodItems);

export { router as foodRouter };
