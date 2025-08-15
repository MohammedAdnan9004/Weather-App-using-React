import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import "./global.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const API_KEY = "30965d3c741931fe1052752e42e68884";
  const fetchWeatherByCity = async (cityName) => {
    const url = `https://api.openweathermap.org/2.5/weather=${encodeURIComponent(
      cityName
    )}&units=metric&appid=${API_KEY}`;

    try {
      const response = await axios.get(url);
      const data = response.data;
      setWeather({
        name: data.name,
        temp: data.main.temp,
        condition: data.weather[0].main,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        feels_like: data.main.feels_like,
        icon: data.weather[0].icon,
      });
      setErrorMsg("");
    } catch (error) {
      console.error("City fetch error:", error);
      setErrorMsg("City not found. Please try again.");
      setWeather(null);
    }
  };

  const fetchWeatherByLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/weather=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

        try {
          const response = await axios.get(url);
          const data = response.data;
          setWeather({
            name: data.name,
            temp: data.main.temp,
            condition: data.weather[0].main,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            wind: data.wind.speed,
            feels_like: data.main.feels_like,
            icon: data.weather[0].icon,
          });
          setErrorMsg("");
        } catch (error) {
          console.error("Geolocation fetch error:", error);
          setErrorMsg("Failed to fetch weather for your location.");
        }
      },
      (error) => {
        console.error("Geolocation permission error:", error);
        setErrorMsg("Location access denied.");
      }
    );
  };

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    fetchWeatherByCity(city);
    setCity("");
  };

  const conditionClass = weather ? weather.condition.toLowerCase() : "";

  return (
    <div className={`App ${conditionClass}`}>
      <h1>EcoWeather Forecast</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {errorMsg && <p className="error">{errorMsg}</p>}

      {weather && <WeatherCard data={weather} />}
    </div>
  );
}

export default App;
