import { FoodModel } from "../models/Food.js";
import { UserModel } from "../models/Users.js";

// Function to fetch food items with filters
export async function getFoodItems(req, res) {
  try {
    let query = {};

    // Apply filters if provided
    const filters = req.query;
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

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching food items:", error);
    res.status(500).json({ error: "Error fetching food items" });
  }
}

// Function to add a new food item
export async function addFoodItem(req, res) {
  try {
    // Extract the data from the request body
    const {
      name,
      ingredients,
      instructions,
      imageUrl,
      diet,
      description,
      price,
      userOwner,
    } = req.body;

    // Check if the user exists
    // const user = await UserModel.findById(userOwner);
    // if (!user) {
    //   console.error("User not found");
    //   return res.status(404).json({ message: "User not found" });
    // }

    // Create and save the new food item
    const newFoodItem = await FoodModel.create({
      name,
      ingredients,
      instructions,
      imageUrl,
      diet,
      description,
      price,
      // userOwner: user._id,
      userOwner,
    });

    // Return a success response
    res
      .status(201)
      .json({ message: "Food item added successfully", foodItem: newFoodItem });
  } catch (error) {
    console.error("Error adding food item:", error);
    // Return an error response
    res.status(500).json({ message: "Internal Server Error" });
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
