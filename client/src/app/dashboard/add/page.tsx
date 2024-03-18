"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, FileDownIcon, SortAscIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UserData {
  displayName: string;
  image: string;
  _id: any;
}

const AddRecipe = () => {
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

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: [],
    imageUrl: "",
    diet: "",
    description: "",
    price: "",
    userOwner: userData?._id || "user1",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/food", recipe);
      setRecipe({
        name: "",
        ingredients: [],
        instructions: [],
        imageUrl: "",
        diet: "",
        description: "",
        price: "",
        userOwner: "",
      });
      toast({
        title: "Food added!",
        variant: "success",
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 2000);
    } catch (error) {
      toast({
        title: "Error ddding food!",
        description: "Please try again",
        variant: "destructive",
      });
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="px-5 min-h-[100dvh] py-32">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="w-full max-w-6xl mb-10 text-2xl font-semibold">
          Add Food
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
        <div className="flex flex-col gap-5">
          <div className="sm:w-[35rem]">
            <Label>Food Name</Label>
            <div className="mt-2.5">
              <Input
                type="text"
                name="name"
                id="name"
                value={recipe.name}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:w-[35rem]">
            <Label>Description</Label>
            <div className="mt-2.5">
              <Textarea
                name="description"
                id="description"
                rows={4}
                value={recipe.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:w-[35rem]">
            <Label>Diet</Label>
            <div className="relative w-40 mt-2.5">
              <select
                name="diet"
                className="flex h-10 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 appearance-none"
                value={recipe.diet}
                onChange={handleChange}
              >
                <option className="bg-background" value="">
                  Select Diet
                </option>
                <option className="bg-background" value="veg">
                  Veg
                </option>
                <option className="bg-background" value="non-veg">
                  Non-Veg
                </option>
                <option className="bg-background" value="dessert">
                  Dessert
                </option>{" "}
              </select>
              <ChevronDown className="h-4 w-4 absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none" />
            </div>
            {/* <div className="mt-2.5">
              <select name="diet" value={recipe.diet} onChange={handleChange}>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
                <option value="dessert">Dessert</option>
              </select>
            </div> */}
          </div>
          <div className="sm:w-[35rem]">
            <Label>Ingredients</Label>
            <div className="mt-2.5">
              <Textarea
                name="ingredients"
                id="ingredients"
                rows={4}
                value={recipe.ingredients}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:w-[35rem]">
            <Label>Instructions</Label>
            <div className="mt-2.5">
              <Textarea
                name="instructions"
                id="instructions"
                rows={4}
                value={recipe.instructions}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:w-[35rem]">
            <Label>Price</Label>
            <div className="mt-2.5">
              <Input
                type="number"
                name="price"
                id="price"
                value={recipe.price}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:w-[35rem]">
            <Label>Image URL</Label>
            <div className="mt-2.5">
              <Input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={recipe.imageUrl}
                onChange={handleChange}
              />
              {recipe.imageUrl && (
                <div className="mt-10">
                  <img
                    width={500}
                    height={500}
                    src={recipe.imageUrl}
                    alt="Food Preview"
                    className="max-w-96 aspect-video object-cover mx-auto"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <Button type="submit" className="w-full">
            Add Food
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;
