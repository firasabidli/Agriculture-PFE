import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './InfoCulture.css';
import Navbar from '../Navbar.js';
import Stockage from './Stockage.jsx';
import Materiel from './Materiel.jsx';
import Medicament from './Medicament.jsx';
import TableCulture from './TableCuture.jsx';
import { useParams } from 'react-router-dom';
import RemarqueCulture from './Remarque.jsx';
import axios from 'axios';

const InfoCulture = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [cultureData, setCultureData] = useState(null);
  const { cultureId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/Agriculture/${cultureId}`);
        setCultureData(response.data.data);
        console.log(response.data.data)
      } catch (error) {
        console.error('Erreur lors de la récupération des données de la culture :', error);
      }
    };
  
    fetchData();
  }, [cultureId]);

  return (
    <div>
      <Navbar textColor="black" />
      <div className="background-container">
      {cultureData && (
          <div>
            <img className='image-culture' src={cultureData.image_agriculture} alt='imageBackground'/>
            <div className="mt-5 jumbotron">
              <h1>{cultureData.nom_agriculture}</h1>
              <p className="lead">
                {cultureData.description}
              </p>
              <p>
              <Button variant="primary" onClick={() => setModalShow(true)}>
                NOUS REMARQUE
              </Button>
              <RemarqueCulture
                show={modalShow}
                onHide={() => setModalShow(false)}
                cultureName={cultureData.nom_agriculture}
                
              />
              </p>
            </div>
          </div>
        )}
      </div>
      {cultureData && <Stockage cultureData={cultureData} />}
      <div class="row g-5">
        <div class="col-md-8">
        
          {cultureData &&<Materiel cultureData={cultureData} />}
          {cultureData && <TableCulture cultureData={cultureData} />}
          </div>
          <div class="col-md-4">
          <div class="position-sticky" style={{top: "2rem"}}>
           {cultureData &&<Medicament cultureData={cultureData} />}
           </div>
          </div>
       </div>
    </div>
  );
}

export default InfoCulture;
