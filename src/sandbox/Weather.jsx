import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Weather({ city }) {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeatherData = () => {
    if (!token || !city) return;

    setLoading(true);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/weather/${city}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  if (!token) return <p>Please log in to view weather data.</p>;

  return (
    <div>
      <button onClick={fetchWeatherData}>Get Weather</button>

      {loading ? (
        <p>Loading weather...</p>
      ) : data ? (
        <div style={{ marginTop: '1rem' }}>
          <h2>{data.city}</h2>
          <p>{data.description}</p>
          <p>{data.temperature} °C</p>
          <small>Last updated: {new Date(data.updated_at).toLocaleString()}</small>
        </div>
      ) : (
        <p>Click the button to fetch weather data.</p>
      )}
    </div>
  );
}

export default Weather;
