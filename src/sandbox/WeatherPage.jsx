import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Weather from './Weather';

function WeatherPage() {
  const { token } = useAuth();
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleFetchWeather = () => {
    if (!token || !city.trim()) return;
    
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/weather/${city}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <h1>Retrack Sample</h1>
      <div>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
      </div>
      <Weather 
        city={city}
        weatherData={weatherData}
        isLoading={isLoading}
      />
    </div>
  );
}

export default WeatherPage;