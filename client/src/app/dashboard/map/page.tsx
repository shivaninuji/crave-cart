"use client";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";

const MapRoute = dynamic(() => import("./MapRoute"), {
  ssr: false,
});

export default function RouteMap() {
  return (
    <div className="flex flex-col min-h-[100dvh] justify-center items-center">
      <div className="flex justify-center items-center text-xl gap-5 pb-5">
        <span>Sahyadri, Adyar</span>
        <ArrowRight />
        <span>Ocean Pearl</span>
      </div>

      <MapRoute
        fromLatitude={12.8666}
        fromLongitude={74.9254}
        toLatitude={12.8752}
        toLongitude={74.8405}
      />
    </div>
  );
}
