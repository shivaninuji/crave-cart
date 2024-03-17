"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Croissant } from "lucide-react";

interface UserData {
  displayName: string;
  image: string;
}

const Navbar: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUser = async () => {
    try {
      const response = await axios.get<{ user: UserData }>(
        "http://localhost:3001/login/sucess",
        { withCredentials: true }
      );
      setUserData(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    window.open("http://localhost:3001/logout", "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="fixed backdrop-blur-md top-0 p-5 w-full flex justify-center left-0 z-50 bg-background/50">
      <div className="flex max-w-6xl w-full justify-between items-center">
        <div>
          <Link
            className="flex justify-center items-center gap-2 font-semibold tracking-wide"
            href={userData ? "/dashboard" : "/"}
          >
            <Croissant /> Crave Cart
          </Link>
        </div>
        {userData ? (
          <div className="flex gap-5">
            <Button variant={"outline"}>Hello, {userData.displayName}</Button>
            <Avatar>
              <AvatarImage src={userData.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button variant={"destructive"} onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
