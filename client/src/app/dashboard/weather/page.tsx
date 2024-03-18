"use client";
import { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Home = () => {
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [weatherIcons, setWeatherIcons] = useState<JSX.Element[]>([]);
  const [suggestedFood, setSuggestedFood] = useState<string>("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      fetchWeatherData(latitude, longitude);
    }
  }, [latitude, longitude]);

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m`
      );
      const data = await response.json();
      const temperatures = data.hourly.temperature_2m.slice(0, 5);
      setTemperatureData(temperatures);
      suggestFood(temperatures[0]);
      setWeatherIcons(
        data.hourly.weather_2m.map((weather: string) => getWeatherIcon(weather))
      );
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const suggestFood = (temperature: number) => {
    if (temperature < 15) {
      setSuggestedFood("Hot Soup or Stew");
    } else if (temperature >= 15 && temperature < 25) {
      setSuggestedFood("Pasta or Noodles");
    } else if (temperature >= 25 && temperature < 30) {
      setSuggestedFood("Salad or Sandwiches");
    } else {
      setSuggestedFood("Ice Cream or Cold Drinks");
    }
  };

  const getWeatherIcon = (weather: string): JSX.Element => {
    switch (weather) {
      case "clear":
        return <Sun />;
      case "cloudy":
        return <Cloud />;
      case "rain":
        return <CloudRain />;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex min-h-[100dvh] justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Weather Forecast</CardTitle>
          {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Temperature</TableHead>
                <TableHead>In</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {temperatureData.map((temp, index) => (
                <TableRow key={index}>
                  <TableCell>{temp}°C</TableCell>
                  <TableCell>{index + 1} Hour</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>Suggested Food: {suggestedFood}</CardFooter>
      </Card>
    </div>
  );
};

export default Home;
