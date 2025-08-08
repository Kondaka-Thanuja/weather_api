import React, { useEffect, useState } from 'react'

import './Weather.css'
import { IoIosSearch } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import { MdSunny } from "react-icons/md";
import { CiCloud } from "react-icons/ci";
import { BsCloudDrizzleFill } from "react-icons/bs";
import { FaCloudRain } from "react-icons/fa6";
import { FaRegSnowflake } from "react-icons/fa";
import { MdOutlineWindPower } from "react-icons/md";
import { WiHumidity } from "react-icons/wi";


const Weather = () => {

  const [city, setCity] = useState('London');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = '32c1a5992f1f4c25980120037250708';

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );

      if (!res.ok) {
        throw new Error('City not found');
      }

      const data = await res.json();
      console.log('Weather Data:', data);
      setWeather(data);

      setWeatherData({
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        temperature: data.current.temp_c,
        location: data.location.name,
        country: data.location.country,
        condition: data.current.condition.text,
        icon: `https:${data.current.condition.icon}`,
      });
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = () => {
    if (city.trim() !== '') {
      fetchWeather(city);
    }
  }

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='search'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <IoIosSearch className='logo' onClick={handleSearch} />
      </div>

      {weatherData && (
        <>
          <img src={weatherData.icon} alt="weather icon" className='weather-icon' />
          <p className='temparature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather_data'>
            <div className='col'>
              <WiHumidity className='img' />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col' id='one'>
              <MdOutlineWindPower className='img' />
              <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Weather


