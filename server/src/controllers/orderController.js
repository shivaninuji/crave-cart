import { OrderModel } from "../models/Order.js";

// Controller function to place a new order
export async function placeOrder(req, res) {
  try {
    const { foodId, userId, orderId, userAddressId, paymentMode } = req.body;

    // Create a new order
    const order = new OrderModel({
      foodId,
      userId,
      orderId,
      userAddressId,
      paymentMode,
    });

    // Save the order to the database
    await order.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", orderId: order._id });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
}

// Controller function to fetch all orders
export async function getAllOrders(req, res) {
  try {
    const orders = await OrderModel.find().exec();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}

// Controller function to fetch orders by user ID
export async function getOrdersByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const orders = await OrderModel.find({ userId }).exec();
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
}

// Controller function to update order status
export async function updateOrderStatus(req, res) {
  try {
    const orderId = req.params.orderId;
    const { status } = req.body;

    const order = await OrderModel.findById(orderId).exec();
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    order.updatedAt = new Date();

    await order.save();

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update order status" });
  }
}
