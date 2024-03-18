"use client";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

import { useToast } from "@/components/ui/use-toast";

import emailjs from "emailjs-com";

const emailServiceId = process.env.NEXT_PUBLIC_SERVICE_ID!;
const emailTemplateId = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
const emailApiKey = process.env.NEXT_PUBLIC_API_KEY!;

interface FoodItem {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

interface UserData {
  displayName: string;
  image: string;
  _id: string;
}

const Food = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  const { toast } = useToast();

  const getUser = async () => {
    try {
      const response = await axios.get<{ user: UserData }>(
        "http://localhost:3001/login/success",
        { withCredentials: true }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/food")
      .then((response) => response.json())
      .then((data: FoodItem[]) => setFoodItems(data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  const handleOrder = async (foodId: string) => {
    try {
      const response = await fetch("http://localhost:3001/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          foodId,
          userId: userData?._id, // Replace with actual user ID
          // orderId: "order1", // Replace with actual order ID
        }),
      });
      const data = await response.json();
      console.log("Order placed successfully:", data);
      try {
        const templateParams = {
          from_name: "Crave Cart",
          to_name: userData?.displayName,
        };

        await emailjs.send(
          emailServiceId,
          emailTemplateId,
          templateParams,
          emailApiKey
        );

        toast({
          title: "Order Placed! Check your mail.",
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Error! Please try again.",
          variant: "destructive",
        });
        console.error("Error sending email:", error);
      }
      // Handle success, maybe show a success message or update UI accordingly
    } catch (error) {
      console.error("Error placing order:", error);
      // Handle error, show error message or retry logic
    }
  };

  return (
    <div>
      {foodItems ? (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {foodItems.map((food) => (
            <Card key={food._id}>
              <CardHeader>
                <CardTitle>{food.name}</CardTitle>
                <CardDescription>{food.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <img
                  className="aspect-video rounded-md"
                  src={food.imageUrl}
                  alt={food.name}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <p>₹ {food.price}</p>
                <Button onClick={() => handleOrder(food._id)}>Order</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {[...Array(3)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>
                  <Skeleton className="w-32 h-5"></Skeleton>
                </CardTitle>
                <CardDescription>
                  <Skeleton className="w-60 h-3"></Skeleton>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Skeleton className="aspect-video w-80 h-full" />
              </CardContent>
              <CardFooter>
                <div className="flex items-center gap-2 w-full">
                  $ <Skeleton className="w-20 h-5"></Skeleton>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Food;
