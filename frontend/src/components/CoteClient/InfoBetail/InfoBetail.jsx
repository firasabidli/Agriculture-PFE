import React, { useState, useEffect } from 'react';
import './InfoBetail.css';
import Navbar from '../Navbar.js';

import TableBetail from './TableBetail.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const InfoBetail = () => {
  const [betailData, setBetailData] = useState(null);
  const { betailId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Betail/${betailId}`);
        setBetailData(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la betail :', error);
      }
    };
  
    fetchData();
  }, [betailId]);

  return (
    <div>
      <Navbar textColor="black" />
      <div className="background-container">
      {betailData && (
          <div>
            <img className='image-betail' src={betailData.image_betail} alt='imageBackground'/>
            <div className="mt-5 infBet">
              <h1 className='text-white'><span style={{fontSize:'30px'}}>Nom du Bétail: </span>{betailData.nom_betail}</h1>
              <h1 className='text-white'><span style={{fontSize:'30px'}}>Race: </span>{betailData.race}</h1>
              
              
            </div>
          </div>
        )}
      </div>
      
      
        
          
          {betailData && <TableBetail betailData={betailData} />}
          
    </div>
  );
}

export default InfoBetail;
