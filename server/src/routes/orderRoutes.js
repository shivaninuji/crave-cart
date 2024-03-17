import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/middleWareJWT.js";

const router = express.Router();

// Route to place a new order
router.post("/", verifyToken, placeOrder);

// Route to fetch all orders
router.get("/", verifyToken, getAllOrders);

// Route to fetch orders by user ID
router.get("/user/:userId", verifyToken, getOrdersByUserId);

// Route to update order status by order ID
router.put("/:orderId/status", verifyToken, updateOrderStatus);

export { router as orderRouter };
