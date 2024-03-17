"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Food from "@/components/Food";

interface UserData {
  displayName: string;
  image: string;
}

const Dashboard = () => {
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
  useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="py-20">
      {userData ? (
        <div className="flex flex-col gap-2 py-20">
          <h1 className="text-4xl font-semibold">
            Hello, {userData.displayName}
          </h1>
          <p className="text-primary/75">What's on your menu today?</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2 py-20">
          <h1 className="text-4xl font-semibold">Hello</h1>
          <p className="text-primary/75">What's on your menu today?</p>
        </div>
      )}
      <Food />
    </div>
  );
};

export default Dashboard;
