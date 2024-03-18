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
export const searchfood = async (req, res) => {
  try {
    const query = req.params.query;
    // Perform a search query to find blog posts with titles matching the entered query
    const regex = new RegExp(query, "i"); // Case-insensitive search
    const blogs = await FoodModel.find({ name: regex });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
