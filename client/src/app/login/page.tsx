"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import axios from "axios";
import { SyntheticEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";

export default function Login() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setCookies] = useCookies(["access_token", "username", "user_role"]);

  const onSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setCookies("username", username);
    console.log("API request sent!");
    try {
      const response = await axios.post(`http://localhost:3001/auth/login`, {
        username,
        password,
      });

      setCookies("access_token", response.data.token);
      setCookies("user_role", response.data.role); // Store the user's role in cookies
      window.localStorage.setItem("userID", response.data.userID);
      window.localStorage.setItem("username", username);
      toast({
        title: "Login Successful",
        variant: "success",
      });
      setUsername("");
      setPassword("");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (err) {
      console.error(err);
      toast({
        title: "Login Failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center items-center min-h-[100vh]"
    >
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid w-96 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              required
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <div className="grid gap-3 w-full">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <div className="space-x-2 text-sm">
              <span>Don&apos;t have an account?</span>
              <Link href="/register" className="hover:underline">
                Register
              </Link>
            </div>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
