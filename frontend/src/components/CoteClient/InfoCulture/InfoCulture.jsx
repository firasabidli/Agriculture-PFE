import React from 'react';
import {  Button } from 'react-bootstrap';
import './InfoCulture.css';
import Navbar from '../Navbar.js';
//import { Card, Container, Row, Col } from 'react-bootstrap';
import pommeTerre from '../../../assets/CoteClient/images/pommes-de-terre.png';
import Stockage from './Stockage.jsx';
import Materiel from './Materiel.jsx';
import Medicament from './Medicament.jsx';
const InfoCulture = () => {
    return (
        <div>
          <Navbar/>
        <div className="background-container">
          <img className='image-culture' src={ pommeTerre } alt='imageBackground'/>
          <div className="mt-5 jumbotron">
            <h1>Pomme de Terre</h1>
            <p className="lead">
              Nous exportons de Chypre vers l'Europe des produits frais de qualité:{' '}
              <strong>pamplemousse blanc et rouge</strong>, oranges de Valence,
              grenade, mandoras et mandarines Nova.
            </p>
            <p>
              <Button variant="primary" href="mailto:contact@fruitsfarm.com">
                NOUS CONTACTER
              </Button>
            </p>
          </div>
        </div>
{/* <div>
<Container className="my-5">
      <h2>Methode Stock</h2>
      <Row className="align-items-center">
        <Col md={6}>
          <h1>01</h1>
        </Col>
        <Col md={6}>
          <Card.Body>
            <Card.Title className="mb-3">Nourriture saine</Card.Title>
            <Card.Text>La planification stratégique est le processus d\'une organisation pour définir sa stratégie afin qu\'elle puisse atteindre des buts et objectifs spécifiques. Nous proposons une conception de site Web personnalisée et abordable réalisée par des professionnels.</Card.Text>
          </Card.Body>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <h1>02</h1>
        </Col>
        <Col md={6}>
          <Card.Body>
            <Card.Title className="mb-3">TTTT</Card.Title>
            <Card.Text>La planification stratégique est le processus d\'une organisation pour définir sa stratégie afin qu\'elle puisse atteindre des buts et objectifs spécifiques. Nous proposons une conception de site Web personnalisée et abordable réalisée par des professionnels.</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Container>
 </div> */}
 <Stockage></Stockage>
 <Materiel></Materiel>
 <Medicament></Medicament>
 </div>

      );
}
export default InfoCulture;