"use client";

import { useEffect, useState } from "react";
import OrdersByUserId from "@/components/Order";
import React from "react";
import axios from "axios";
interface UserData {
  displayName: string;
  image: string;
  _id: any;
}

const Orders = () => {
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
    <div>
      <OrdersByUserId userId={userData?._id} />
    </div>
  );
};

export default Orders;
