import React, { useState, useEffect } from 'react';
import './CurrentWeather.css';

import { WiHumidity } from "react-icons/wi";
import { WiSunrise } from "react-icons/wi";
import { TbSunset2 } from "react-icons/tb";
import { WiStrongWind } from "react-icons/wi";

import { IoIosCloud } from "react-icons/io";
import { MdTimeline } from "react-icons/md";
import { MdVisibility } from "react-icons/md";
import { GiMultiDirections } from "react-icons/gi";

import ClearSkyDay from '../../../assets/CoteClient/images/meteo/01d.png';
import ClearSkyNight from '../../../assets/CoteClient/images/meteo/01n.png';
import FewCloudsDay from '../../../assets/CoteClient/images/meteo/02d.png';
import FewCloudsNight from '../../../assets/CoteClient/images/meteo/02n.png';
import scatteredcloudsDay from '../../../assets/CoteClient/images/meteo/03d.png';
import scatteredcloudsNight from '../../../assets/CoteClient/images/meteo/03n.png';
import brokencloudsDay from '../../../assets/CoteClient/images/meteo/04d.png';
import brokencloudsNight from '../../../assets/CoteClient/images/meteo/04n.png';

import overcastcloudsDay from '../../../assets/CoteClient/images/meteo/04d.png';
import overcastcloudsNight from '../../../assets/CoteClient/images/meteo/04n.png';

import showerrainDay from '../../../assets/CoteClient/images/meteo/09d.png';
import showerrainNight from '../../../assets/CoteClient/images/meteo/09n.png';
import rainDay from '../../../assets/CoteClient/images/meteo/10d.png';
import rainNight from '../../../assets/CoteClient/images/meteo/10n.png';

import LightrainDay from '../../../assets/CoteClient/images/meteo/10d.png';
import LightrainNight from '../../../assets/CoteClient/images/meteo/10n.png';

import thunderstormDay from '../../../assets/CoteClient/images/meteo/11d.png';
import thunderstormNight from '../../../assets/CoteClient/images/meteo/11n.png';

import snowDay from '../../../assets/CoteClient/images/meteo/13d.png';
import snowNight from '../../../assets/CoteClient/images/meteo/13n.png';

import mistDay from '../../../assets/CoteClient/images/meteo/50d.png';
import mistNight from '../../../assets/CoteClient/images/meteo/50n.png';


const CurrentWeather = ({ weatherData, city }) => {
  const { current } = weatherData;
  const { humidity, pressure, sunrise, sunset, wind_speed, weather, temp } = current;
  const { description, icon } = weather[0];
  const [currentDateTime, setCurrentDateTime] = useState('');
  const { daily } = weatherData;

  const getWeatherIconUrl = (iconCode) => {
    switch (iconCode) {
      case '01d':
        return ClearSkyDay;
      case '01n':
        return ClearSkyNight;
      case '02d':
        return FewCloudsDay;
      case '02n':
        return FewCloudsNight;
      case '03d':
        return scatteredcloudsDay;
      case '03n':
        return scatteredcloudsNight;
      case '04d':
        return brokencloudsDay;
      case '04n':
        return brokencloudsNight;
      case '09d':
        return showerrainDay;
      case '09n':
        return showerrainNight;
      case '10d':
        return rainDay;
      case '10n':
        return rainNight;
      case '11d':
        return thunderstormDay;
      case '11n':
        return thunderstormNight;
      case '13d':
        return snowDay;
      case '13n':
        return snowNight;
      case '50d':
        return mistDay;
      case '50n':
        return mistNight;
      default:
        return ''; 
    }
  };

  
  const getWeatherIcon = (description) => {
    switch(description) {
      case 'clear sky':
        return icon.includes('d') ? ClearSkyDay : ClearSkyNight;
      case 'few clouds':
        return icon.includes('d') ? FewCloudsDay : FewCloudsNight;
      case 'scattered clouds':
        return icon.includes('d') ? scatteredcloudsDay : scatteredcloudsNight;
      case 'overcast clouds':
        return icon.includes('d') ? overcastcloudsDay : overcastcloudsNight;
      case 'shower rain':
        return icon.includes('d') ? showerrainDay : showerrainNight;
      case 'light rain':
        return icon.includes('d') ? LightrainDay : LightrainNight;
      case 'thunderstorm':
        return icon.includes('d') ? thunderstormDay : thunderstormNight;
      case 'snow':
        return icon.includes('d') ? snowDay : snowNight;
      case 'mist':
        return icon.includes('d') ? mistDay : mistNight;
      default:
        return ''; 
    }
  };
  
  useEffect(() => {
    const updateTime = () => {
      const time = new Date();
      const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
      const dayName = days[time.getDay()];
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const formattedHours = hours < 10 ? '0' + hours : hours;
      const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      setCurrentDateTime(`${dayName} ${formattedHours}:${formattedMinutes}`);
    };

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    
    
  
    <div class=" bg ">
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 ">
        <div class="col main bg-img">
            <div class="row">
              <div class="col-xl-12">
                <div class="col-xl-12 col-xs-6  weather-panel">
                  <div class="col-xs-6 m-4">
                    <h2>{city}<br/><small>{currentDateTime}</small></h2>
                    <p class="h3"><img src={getWeatherIcon(description)} alt="Icône météo"/> Pluvieux</p>
                  </div>
                  <div class="col-xs-6 text-center">
                    <div class="h1 temperature">
                      <span>{temp} °C</span>
                     
                      
                    </div>
                  </div>
                  <div class="col-xs-12 m-4 ">
                    <ul class="list-inline row forecast ">
                    {daily.slice(1).map((day, index) => (
                      <li class="col-xs-4  col-sm-1   day text-center">
                        <h3 class="h5">{new Date(day.dt * 1000).toLocaleDateString('fr', { weekday: 'short' })}</h3>
                        <p ><i class="mi mi-fw mi-2x mi-cloud-sun"><img src={getWeatherIconUrl(day.weather[0].icon)} alt="Icône météo" className="w-icon" style={{ width:'30px'}} /></i><br/><span>Nuit-{day.temp.night}°<br/>Jour-{day.temp.day}°</span></p>
                      </li>
                    ))}
                      
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
</div>
<div class=" table-responsive table-responsive-sm table-responsive-xxl table-responsive-xl table-responsive-lg table-responsive-md ">
            <table className='  table text-black text-center table-hovred border-dark'>
  <thead className='fs-5  '>
    <tr>
       <td scope='col'> <span><TbSunset2 /></span> <br />Coucher de soleil </td>
       <td scope='col'> <span><WiSunrise /></span> <br />Lever de soleil </td>
       <td scope='col'> <span><WiHumidity /></span> <br />Humidité </td>
       <td scope='col'> <span><WiStrongWind /></span><br />État du vent </td>
       <td scope='col'> <span><IoIosCloud /></span><br />Couverture nuageuse </td>
       <td scope='col'> <span><MdTimeline/></span><br />Pression </td>
       <td scope='col'> <span></span><br />Indice UV </td>
       <td scope='col'> <span><MdVisibility /></span><br />Visibilité </td>
       <td scope='col'> <span><GiMultiDirections /></span><br />Direction du vent </td>
    </tr>
  </thead>
  <tbody className='fs-5'>
    <tr>
      <td>{new Date(sunset * 1000).toLocaleTimeString()}</td>
      <td>{new Date(sunrise * 1000).toLocaleTimeString()}</td>
      <td>{humidity}%</td>
      <td>{wind_speed} km/h</td>
      <td>{current.clouds}%</td>
      <td>{pressure} hPa</td>
      <td>{current.uvi}</td>
      <td>{current.visibility} mètres</td>
      <td>{current.wind_deg}°</td>
      
    </tr>
    
  </tbody>
</table>
          </div>
      
</div>
          </div>
    
  
  );
};

export default CurrentWeather;

