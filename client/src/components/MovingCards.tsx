"use client";

import React from "react";
import {
  Beef,
  Beer,
  CakeSlice,
  Coffee,
  Cookie,
  CupSoda,
  Drumstick,
  EggFried,
  Ham,
  IceCream,
  Pizza,
  Popcorn,
  Salad,
  Sandwich,
  Soup,
  Wine,
} from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function MovingCards() {
  return <InfiniteMovingCards items={food} direction="right" speed="slow" />;
}

const food = [
  {
    icon: <Beef className="w-20 h-20" />,
  },
  {
    icon: <Cookie className="w-20 h-20" />,
  },
  {
    icon: <Drumstick className="w-20 h-20" />,
  },
  {
    icon: <EggFried className="w-20 h-20" />,
  },
  {
    icon: <Ham className="w-20 h-20" />,
  },
  {
    icon: <IceCream className="w-20 h-20" />,
  },
  {
    icon: <Pizza className="w-20 h-20" />,
  },
  {
    icon: <Salad className="w-20 h-20" />,
  },
  {
    icon: <Sandwich className="w-20 h-20" />,
  },
  {
    icon: <Soup className="w-20 h-20" />,
  },
  {
    icon: <Beer className="w-20 h-20" />,
  },
  {
    icon: <CakeSlice className="w-20 h-20" />,
  },
  {
    icon: <Coffee className="w-20 h-20" />,
  },
  {
    icon: <CupSoda className="w-20 h-20" />,
  },
  {
    icon: <Popcorn className="w-20 h-20" />,
  },
  {
    icon: <Wine className="w-20 h-20" />,
  },
];
