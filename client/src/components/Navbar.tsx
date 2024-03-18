"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Cloud, Croissant, MapPinned, PlusCircle } from "lucide-react";

interface UserData {
  displayName: string;
  image: string;
}

const Navbar: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

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

  const logout = () => {
    window.open("http://localhost:3001/logout", "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  const loginwithgoogle = () => {
    window.open("http://localhost:3001/auth/google/callback", "_self");
  };

  return (
    <div className="fixed backdrop-blur-md top-0 p-5 w-full flex justify-center left-0 z-50 bg-background/50">
      <div className="flex max-w-6xl w-full justify-between items-center">
        <div>
          <Link
            className="flex justify-center items-center gap-2 font-semibold tracking-wide"
            href={userData ? "/dashboard" : "/"}
          >
            <Croissant />
            {userData ? <span className="md:flex hidden">Crave Cart</span> : ""}
          </Link>
        </div>
        {userData ? (
          <div className="flex gap-5 items-center">
            <Link href="/dashboard/weather">
              <Button variant={"ghost"}>
                <Cloud />
              </Button>
            </Link>
            <Link href="/dashboard/add">
              <Button variant={"ghost"}>
                <PlusCircle />
              </Button>
            </Link>
            <Link href="/dashboard/map">
              <Button variant={"ghost"}>
                <MapPinned />
              </Button>
            </Link>
            Hello, {userData.displayName}
            <Avatar>
              <AvatarImage src={userData.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* <Button variant={"destructive"} onClick={logout}>
              Logout
            </Button> */}
            <Button variant={"destructive"} onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Button className="flex gap-2" onClick={loginwithgoogle}>
              <div>Login</div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 128 128"
              >
                <path
                  fill="#fff"
                  d="M44.59 4.21a63.28 63.28 0 0 0 4.33 120.9a67.6 67.6 0 0 0 32.36.35a57.13 57.13 0 0 0 25.9-13.46a57.44 57.44 0 0 0 16-26.26a74.33 74.33 0 0 0 1.61-33.58H65.27v24.69h34.47a29.72 29.72 0 0 1-12.66 19.52a36.16 36.16 0 0 1-13.93 5.5a41.29 41.29 0 0 1-15.1 0A37.16 37.16 0 0 1 44 95.74a39.3 39.3 0 0 1-14.5-19.42a38.31 38.31 0 0 1 0-24.63a39.25 39.25 0 0 1 9.18-14.91A37.17 37.17 0 0 1 76.13 27a34.28 34.28 0 0 1 13.64 8q5.83-5.8 11.64-11.63c2-2.09 4.18-4.08 6.15-6.22A61.22 61.22 0 0 0 87.2 4.59a64 64 0 0 0-42.61-.38"
                />
                <path
                  fill="#e33629"
                  d="M44.59 4.21a64 64 0 0 1 42.61.37a61.22 61.22 0 0 1 20.35 12.62c-2 2.14-4.11 4.14-6.15 6.22Q95.58 29.23 89.77 35a34.28 34.28 0 0 0-13.64-8a37.17 37.17 0 0 0-37.46 9.74a39.25 39.25 0 0 0-9.18 14.91L8.76 35.6A63.53 63.53 0 0 1 44.59 4.21"
                />
                <path
                  fill="#f8bd00"
                  d="M3.26 51.5a62.93 62.93 0 0 1 5.5-15.9l20.73 16.09a38.31 38.31 0 0 0 0 24.63q-10.36 8-20.73 16.08a63.33 63.33 0 0 1-5.5-40.9"
                />
                <path
                  fill="#587dbd"
                  d="M65.27 52.15h59.52a74.33 74.33 0 0 1-1.61 33.58a57.44 57.44 0 0 1-16 26.26c-6.69-5.22-13.41-10.4-20.1-15.62a29.72 29.72 0 0 0 12.66-19.54H65.27c-.01-8.22 0-16.45 0-24.68"
                />
                <path
                  fill="#319f43"
                  d="M8.75 92.4q10.37-8 20.73-16.08A39.3 39.3 0 0 0 44 95.74a37.16 37.16 0 0 0 14.08 6.08a41.29 41.29 0 0 0 15.1 0a36.16 36.16 0 0 0 13.93-5.5c6.69 5.22 13.41 10.4 20.1 15.62a57.13 57.13 0 0 1-25.9 13.47a67.6 67.6 0 0 1-32.36-.35a63 63 0 0 1-23-11.59A63.73 63.73 0 0 1 8.75 92.4"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
