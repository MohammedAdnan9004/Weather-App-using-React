import React from "react";

function WeatherCard({ data }) {
  const {
    name,
    temp,
    condition,
    description,
    humidity,
    wind,
    feels_like,
    icon,
  } = data;
  const tempC = Math.round(temp);
  const feelsC = Math.round(feels_like);
  // OpenWeatherMap icon URL
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{name}</h2>
        <img src={iconUrl} alt={description} />
      </div>
      <div className="weather-main">
        <p className="temp">{tempC}°C</p>
        <p className="condition">{description}</p>
      </div>
      <div className="weather-details">
        <p>Feels like: {feelsC}°C</p>
        <p>Humidity: {humidity}%</p>
        <p>Wind: {wind} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;
