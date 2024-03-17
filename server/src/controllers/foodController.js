import { FoodModel } from "../models/Food.js";

// Function to fetch food items with filters
export async function getFoodItems(filters) {
  try {
    let query = {};

    // Apply filters if provided
    if (filters) {
      if (filters.veg) {
        query.diet = "veg";
      } else if (filters.nonVeg) {
        query.diet = "non-veg";
      } else if (filters.dessert) {
        query.diet = "dessert";
      }
    }

    // Fetch recipes based on the query
    const recipes = await FoodModel.find(query)
      .select("name description price imageUrl")
      .exec();

    return recipes;
  } catch (error) {
    console.error("Error fetching food items:", error);
    throw error;
  }
}

// Function to add a new food item
export async function addFoodItem(
  name,
  ingredients,
  instructions,
  imageUrl,
  diet,
  description,
  price,
  userOwner
) {
  try {
    const newFoodItem = await FoodModel.create({
      name,
      ingredients,
      instructions,
      imageUrl,
      diet,
      description,
      price,
      userOwner,
    });
    return newFoodItem;
  } catch (error) {
    console.error("Error adding food item:", error);
    throw error;
  }
}

// Function to recommend food items based on entered letters
export async function recommendFoodItems(prefix) {
  try {
    // Create a regular expression to match food names starting with the given prefix
    const regex = new RegExp(`^${prefix}`, "i");

    // Find food items whose names match the regex
    const recommendedItems = await RecipeModel.find({ name: regex })
      .select("name description price imageUrl")
      .exec();

    return recommendedItems;
  } catch (error) {
    console.error("Error recommending food items:", error);
    throw error;
  }
}
