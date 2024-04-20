import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './InfoBetail.css';
import Navbar from '../Navbar.js';

import TableBetail from './TableBetail.jsx';
import { useParams } from 'react-router-dom';
import RemarqueBetail from './Remarque.jsx';
import axios from 'axios';

const InfoBetail = () => {
  const [modalShow, setModalShow] = React.useState(false);
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
            <div className="mt-5 jumbotron">
              <h1>{betailData.nom_betail}</h1>
              <p className="lead">
                {betailData.race}
              </p>
              <p>
              <Button variant="primary" onClick={() => setModalShow(true)}>
                NOUS REMARQUE
              </Button>
              <RemarqueBetail
                show={modalShow}
                onHide={() => setModalShow(false)}
                BetailName={betailData.nom_betail}
                
              />
              </p>
            </div>
          </div>
        )}
      </div>
      
      
        
          
          {betailData && <TableBetail betailData={betailData} />}
          
    </div>
  );
}

export default InfoBetail;
