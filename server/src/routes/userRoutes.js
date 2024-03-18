import express from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  getAllUsers,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/middleWareJWT.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Retrieve all users
router.get("/", getAllUsers);

// Get a specific user by ID
router.get("/:id", getUserById);

export { router as userRouter };
