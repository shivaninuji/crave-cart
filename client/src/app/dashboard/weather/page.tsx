"use client";
import { useEffect, useState } from "react";
import { Sun, Cloud, CloudRain } from "lucide-react";

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
      setSuggestedFood("Hot soup or stew");
    } else if (temperature >= 15 && temperature < 25) {
      setSuggestedFood("Pasta or noodles");
    } else if (temperature >= 25 && temperature < 30) {
      setSuggestedFood("Salad or sandwiches");
    } else {
      setSuggestedFood("Ice cream or cold drinks");
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
      <div>
        <h1>Weather Forecast</h1>
        <ul>
          {temperatureData.map((temp, index) => (
            <li key={index}>
              {weatherIcons[index]} Temperature at {index + 1} hour: {temp}°C
            </li>
          ))}
        </ul>
        <h2>Suggested Food: {suggestedFood}</h2>
      </div>
    </div>
  );
};

export default Home;
