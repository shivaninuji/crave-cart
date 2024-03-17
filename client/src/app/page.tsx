import { MovingCards } from "@/components/MovingCards";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-[100dvh]">
      <div className="flex flex-col gap-2 pb-10">
        <h1 className="text-4xl font-semibold">Crave Cart</h1>
        <p className="text-primary/75">
          Your gateway to gourmet cravings delivered with a click.
        </p>
      </div>
      <MovingCards />
    </div>
  );
}
