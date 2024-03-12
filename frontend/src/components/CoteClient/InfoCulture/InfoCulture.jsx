import React from 'react';
import {  Button } from 'react-bootstrap';
import './InfoCulture.css';
import Navbar from '../Navbar.js';
//import { Card, Container, Row, Col } from 'react-bootstrap';
import pommeTerre from '../../../assets/CoteClient/images/pommes-de-terre.png';
const InfoCulture = () => {
    return (
        <div>
          <Navbar/>
        <div className="background-container">
          <img className='image' src={pommeTerre} alt='imageBackground'/>
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
 <div class="u-align-center u-clearfix u-grey-10 u-section-1" id="carousel_9db2">
      <div class="u-clearfix u-sheet u-sheet-1">
        <h2 class="u-align-center u-text u-text-default u-text-font u-text-1" data-animation-name="customAnimationIn" data-animation-duration="1500">Methode Du Stock</h2>
        <div class="u-expanded-width-sm u-expanded-width-xs u-list u-list-1">
          <div class="u-repeater u-repeater-1">
            <div class="u-align-left u-container-style u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-1" data-animation-direction="Up" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
              <div class="u-container-layout u-similar-container u-container-layout-1">
                <div class="custom-expanded u-container-align-center-lg u-container-align-center-xl u-container-align-left-md u-container-align-left-sm u-container-align-left-xs u-container-style u-group u-shape-rectangle u-group-1">
                  <div class="u-container-layout u-valign-top">
                    <h3 class="u-align-center-lg u-align-center-xl u-align-left-md u-align-left-sm u-align-left-xs u-custom-font u-text u-text-default u-text-font u-text-palette-2-base u-text-2">1</h3>
                  </div>
                </div>
                <h4 class="u-text u-text-palette-2-base u-text-3"> Destination</h4>
                <p class="u-text u-text-4"> We want to know where and why – because understanding your expectations is how we make sure the journey is right for you.&nbsp;<br/>
                </p>
              </div>
            </div>
            {/* vvvvvv */}
            <div class="u-align-left u-container-style u-list-item u-radius-50 u-repeater-item u-shape-round u-white u-list-item-1" data-animation-direction="Up" data-animation-name="customAnimationIn" data-animation-duration="1500" data-animation-delay="500">
              <div class="u-container-layout u-similar-container u-container-layout-1">
                <div class="custom-expanded u-container-align-center-lg u-container-align-center-xl u-container-align-left-md u-container-align-left-sm u-container-align-left-xs u-container-style u-group u-shape-rectangle u-group-1">
                  <div class="u-container-layout u-valign-top">
                    <h3 class="u-align-center-lg u-align-center-xl u-align-left-md u-align-left-sm u-align-left-xs u-custom-font u-text u-text-default u-text-font u-text-palette-2-base u-text-2">2</h3>
                  </div>
                </div>
                <h4 class="u-text u-text-palette-2-base u-text-3"> VIP Transfers</h4>
                <p class="u-text u-text-4"> Enjoy the comfort of our luxury vehicles &amp; helicopters with personalized amenities for a unique experience<br/>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 </div>

      );
}
export default InfoCulture;