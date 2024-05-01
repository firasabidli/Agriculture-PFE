import React, { useState} from 'react';
import CurrentWeather from './CurrentWeather';
import './Meteo.css'
import Navbar from '../Navbar.js';
import { useUser } from '../../UserContext.js';
const API_KEY ='3756b9777f12d44d18ccec6aa71e7dd5';
// const API_KEY ='46b7585ba81f3eca5e7a9dd7e76b0b99';


function Meteo() {
  const [weatherData, setWeatherData] = useState(null);
  const { user } = useUser();
  const City = user?.gouvernorat.nom;
  const latitude = user?.gouvernorat.latitude;
  const longitude = user?.gouvernorat.longitude;
  


  const getWeatherData = () => {
    if (latitude && longitude) {
    fetch(` https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setWeatherData(data);
      })
      .catch(error => console.error('Error fetching weather data:', error));
    }
  };

  if (!weatherData) {
    getWeatherData();
  }

  return (
    <div>
        <Navbar/>
      {/* Afficher les données météorologiques */}
      {weatherData && (
        
        
          <CurrentWeather weatherData={weatherData} city={City} />
        
      )}
    </div>
  );
}

export default Meteo;