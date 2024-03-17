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
import Image from "next/image";
import { Button } from "./ui/button";

interface FoodItem {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

const Food = () => {
  const [foodItems, setFoodItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/food")
      .then((response) => response.json())
      .then((data: FoodItem[]) => setFoodItems(data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

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
                <Button>Order</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {[...Array(5)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>sadfasf</CardTitle>
                <CardDescription>sdfasf</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full bg-green-400 h-full" />
              </CardContent>
              <CardFooter>
                <p>$ 20</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Food;
