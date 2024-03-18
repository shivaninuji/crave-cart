"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface OrderItem {
  _id: string;
  foodId: string;
  userId: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
}

const OrdersByUserId = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/order/user/${userId}`)
      .then((response) => response.json())
      .then((data: OrderItem[]) => setOrders(data))
      .catch((error) =>
        console.error("Error fetching orders by user ID:", error)
      );
  }, [userId]);

  return (
    <div className="pt-20">
      {orders.length > 0 ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader>
                <CardTitle>Order ID: {order.orderId}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Food ID: {order.foodId}</p>
                <p>User ID: {order.userId}</p>
                <p>Status: {order.status}</p>
                <p>Created At: {order.createdAt}</p>
                <p>Updated At: {order.updatedAt}</p>
              </CardContent>
              <CardFooter>
                {/* Add any additional details or actions related to orders */}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div>No orders found for this user.</div>
      )}
    </div>
  );
};

export default OrdersByUserId;
