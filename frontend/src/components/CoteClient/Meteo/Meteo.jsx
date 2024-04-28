import React, { useState, useEffect } from 'react';
// import CurrentTime from './components/CurrentTime';
import CurrentWeather from './CurrentWeather';
import './Meteo.css'
import Navbar from '../Navbar.js';
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

function Meteo() {
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState(null);

  useEffect(() => {
    getWeatherData();
  }, []);

  const getWeatherData = () => {
    navigator.geolocation.getCurrentPosition((success) => {
      let { latitude, longitude } = success.coords;

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(res => res.json())
        .then(data => {
          setWeatherData(data);
          getCityName(latitude, longitude); // Appel à la fonction pour récupérer le nom de la ville
          console.log(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
    });
  }

  const getCityName = (latitude, longitude) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setCityName(data.name); // Définition du nom de la ville dans le state
      })
      .catch(error => console.error('Error fetching city name:', error));
  }

  return (
    <div  >
      <Navbar textColor="black" />
      {weatherData && 
        
          <CurrentWeather weatherData={weatherData} city={cityName}  />
          
        
      }
    </div>
  );
}

export default Meteo;
