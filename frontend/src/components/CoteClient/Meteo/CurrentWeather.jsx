import React, { useState, useEffect, useRef } from 'react';
import './CurrentWeather.css';
import { HiLightBulb } from "react-icons/hi";
import { TbSunset2 } from "react-icons/tb";
import { WiSunrise, WiHumidity, WiStrongWind } from "react-icons/wi";
import { IoIosCloud } from "react-icons/io";
import { MdTimeline, MdVisibility } from "react-icons/md";
import { GiMultiDirections } from "react-icons/gi";

import ClearSkyDay from '../../../assets/CoteClient/images/meteo/01d.png';
import ClearSkyNight from '../../../assets/CoteClient/images/meteo/01n.png';
import FewCloudsDay from '../../../assets/CoteClient/images/meteo/02d.png';
import FewCloudsNight from '../../../assets/CoteClient/images/meteo/02n.png';
import scatteredcloudsDay from '../../../assets/CoteClient/images/meteo/03d.png';
import scatteredcloudsNight from '../../../assets/CoteClient/images/meteo/03n.png';
import brokencloudsDay from '../../../assets/CoteClient/images/meteo/04d.png';
import brokencloudsNight from '../../../assets/CoteClient/images/meteo/04n.png';
import showerrainDay from '../../../assets/CoteClient/images/meteo/09d.png';
import showerrainNight from '../../../assets/CoteClient/images/meteo/09n.png';
import rainDay from '../../../assets/CoteClient/images/meteo/10d.png';
import rainNight from '../../../assets/CoteClient/images/meteo/10n.png';
import thunderstormDay from '../../../assets/CoteClient/images/meteo/11d.png';
import thunderstormNight from '../../../assets/CoteClient/images/meteo/11n.png';
import snowDay from '../../../assets/CoteClient/images/meteo/13d.png';
import snowNight from '../../../assets/CoteClient/images/meteo/13n.png';
import mistDay from '../../../assets/CoteClient/images/meteo/50d.png';
import mistNight from '../../../assets/CoteClient/images/meteo/50n.png';

import Alerts from './Alerts.jsx';

const CurrentWeather = ({ weatherData, city }) => {
  const { current } = weatherData;
  const { humidity, pressure, sunrise, sunset, wind_speed, weather, temp } = current;
  const {  icon } = weather[0];
  const [currentDateTime, setCurrentDateTime] = useState('');
  const { daily } = weatherData;
  const [showAdvice, setShowAdvice] = useState(false);

  // Référence à la section Alerts
  const alertsRef = useRef(null);

  const getDescriptionByIcon = (icon) => {
    switch (true) {
      case icon.includes('01'):
        return 'ciel clair';
      case icon.includes('02'):
        return 'quelques nuages';
      case icon.includes('03'):
        return 'nuages ​​dispersés';
      case icon.includes('04'):
        return 'nuages ​​brisés';
      case icon.includes('09'):
        return 'pluie de douche';
      case icon.includes('10'):
        return 'pluie';
      case icon.includes('11'):
        return 'orage';
      case icon.includes('13'):
        return 'neige';
      case icon.includes('50'):
        return 'brume';
      default:
        return '';
    }
  };

  const getWeatherIcon = (icon) => {
    switch (icon) {
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

  const showAlerts = () => {
    setShowAdvice(!showAdvice);
    // Faire défiler jusqu'à la section Alerts lorsque l'icône est cliquée
    alertsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg">
      <div className="row">
        <div className="col main bg-img">
          <div className="row">
            <div className="col-12">
              <div className="weather-panel  ">
                <div className="row">
                  <div className='col-12'>
                  <h2>{city}<br /><small>{currentDateTime}</small></h2>
                  <HiLightBulb className='lamp' onClick={showAlerts} />
                  <p className="h3"><img src={getWeatherIcon(icon)} alt="Icône météo" /> {getDescriptionByIcon(icon)}</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="temperature">
                    <span>{temp} °C</span>
                  </div>
                </div>
                <div className="m-4">
                  <ul className="list-inline row forecast">
                    {daily.slice(1).map((day, index) => (
                      <li className="col-xs-4 col-sm-1  day text-center" key={index}>
                        <h3 className="h5">{new Date(day.dt * 1000).toLocaleDateString('fr', { weekday: 'short' })}</h3>
                        <p><i className="mi mi-fw mi-2x mi-cloud-sun">
                          <img src={getWeatherIcon(day.weather[0].icon)} alt="Icône météo" className="w-icon" style={{ width: '30px' }} /></i><br />
                          <span>Nuit-{day.temp.night}°<br />Jour-{day.temp.day}°</span>
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        <div className="table-responsive tableRotate" style={{ overflowX: "auto" }}>
        <table className='tableRotate text-center colorCurrent' >
    <thead className='fs-5'>
      <tr  >
        <th scope='col' ><span><TbSunset2 /></span> <br />Coucher de soleil </th>
        <th scope='col' ><span><WiSunrise /></span> <br />Lever de soleil </th>
        <th scope='col' ><span><WiHumidity /></span> <br />Humidité </th>
        <th scope='col' ><span><WiStrongWind /></span><br />État du vent </th>
        <th scope='col' ><span><IoIosCloud /></span><br />Couverture nuageuse </th>
        <th scope='col' ><span><MdTimeline /></span><br />Pression </th>
        <th scope='col'><span></span><br />Indice UV </th>
        <th scope='col' ><span><MdVisibility /></span><br />Visibilité </th>
        <th scope='col' ><span><GiMultiDirections /></span><br />Direction du vent </th>
      </tr>
    </thead>
    <tbody className='fs-5'>
      <tr  >
        <td >{new Date(sunset * 1000).toLocaleTimeString()}</td>
        <td  >{new Date(sunrise * 1000).toLocaleTimeString()}</td>
        <td >{humidity}%</td>
        <td >{wind_speed} km/h</td>
        <td >{current.clouds}%</td>
        <td >{pressure} hPa</td>
        <td>{current.uvi}</td>
        <td >{current.visibility} mètres</td>
        <td >{current.wind_deg}°</td>
      </tr>
    </tbody>
  </table>
</div>

        {/* <div className="table-responsive" >
          <table className='table text-black text-center table-hovered border-dark' >
            <thead className='fs-5'>
              <tr style={{backgroundColor:"blue"}}>
                <td scope='col'><span><TbSunset2 /></span> <br />Coucher de soleil </td>
                <td scope='col'><span><WiSunrise /></span> <br />Lever de soleil </td>
                <td scope='col'><span><WiHumidity /></span> <br />Humidité </td>
                <td scope='col'><span><WiStrongWind /></span><br />État du vent </td>
                <td scope='col'><span><IoIosCloud /></span><br />Couverture nuageuse </td>
                <td scope='col'><span><MdTimeline /></span><br />Pression </td>
                <td scope='col'><span></span><br />Indice UV </td>
                <td scope='col'><span><MdVisibility /></span><br />Visibilité </td>
                <td scope='col'><span><GiMultiDirections /></span><br />Direction du vent </td>
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
        </div> */}
        <div ref={alertsRef}></div>
        {showAdvice && (
          <Alerts weatherData={weatherData} />
        )}
      </div>
    </div>
  );
};

export default CurrentWeather;
