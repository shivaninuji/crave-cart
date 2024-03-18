import express from "express";
import {
  placeOrder,
  getAllOrders,
  getOrdersByUserId,
  updateOrderStatus,
  getOrdersWithFoodDetails,
} from "../controllers/orderController.js";
import { verifyToken } from "../middlewares/middleWareJWT.js";

const router = express.Router();

// Route to place a new order
router.post("/", placeOrder);

router.get("/", getOrdersWithFoodDetails);

// Route to fetch all orders
router.get("/details", getAllOrders);

// Route to fetch orders by user ID
router.get("/user/:userId", getOrdersByUserId);

// Route to update order status by order ID
router.put("/:orderId/status", updateOrderStatus);

export { router as orderRouter };
