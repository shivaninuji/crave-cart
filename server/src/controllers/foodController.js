import { FoodModel } from "../models/Food.js";
import { UserModel } from "../models/User.js";

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

import { query } from "express";
// Function to search for food items by name
export async function searchFoodItems(req, res) {
  try {
    // Get the search query from the request parameters
    const searchTerm = req.query.name?.toLowerCase(); // Lowercase for case-insensitive search

    // Check if search term is provided
    if (!searchTerm) {
      return res.status(400).json({ message: "Please provide a search term" });
    }

    // Build the search query using regular expression for partial matches
    const searchRegex = new RegExp(searchTerm, "i"); // 'i' flag for case-insensitive

    // Find recipes matching the search term
    const recipes = await FoodModel.find({ name: searchRegex })
      .select("name description price imageUrl") // Select specific fields
      .exec();

    // Return the search results
    res.json(recipes);
  } catch (error) {
    console.error("Error searching food items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
