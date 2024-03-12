import React from 'react';
import Navbar from './Navbar.js';
import TypeSol from './TypeSol.js';
import HeaderCarousel from './HeaderCarousel.js';
import '../../assets/CoteClient/css/style.css';
import BNA from '../../assets/CoteClient/images/Entreprise/BNA.png';
import APIA from '../../assets/CoteClient/images/Entreprise/APIA.png';
import INRT from '../../assets/CoteClient/images/Entreprise/INRT.png';
import STAR from '../../assets/CoteClient/images/Entreprise/star-4.png';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram ,FaGithub, FaGoogle} from 'react-icons/fa';
import { Container, Row, Col } from 'react-bootstrap';

const PageAccueil = () => {
  const imageUrls = [BNA, APIA, INRT, STAR];

  return (
    <div>
      <Navbar />
      <HeaderCarousel />

      <Container>
        <div className="red-line Line"></div>
        <div className="green-line Line"></div>

        <Row style={{ alignItems: 'center' }}>
          <h4 className="Entreprise">+100 Entreprises nous font confiance</h4>

          {imageUrls.map((imageUrl, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={2} style={{ marginBottom: '10px', position: 'relative' }}>
              <img src={imageUrl} alt="" className="equal-height-image" />
            </Col>
          ))}
        </Row>
      </Container>

      <TypeSol />
      <footer className="bg-body-tertiary">
        <div className="container container-footer p-4 pb-0 copiryet">
          <section className="mb-3 text-center">
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#3b5998' }} href="#!" role="button">
              <FaFacebookF />
            </a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#55acee' }} href="#!" role="button">
              <FaTwitter />
            </a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#dd4b39' }} href="#!" role="button">
              <FaGoogle/>
            </a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#ac2bac' }} href="#!" role="button">
              <FaInstagram/>
            </a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#0082ca' }} href="#!" role="button">
              <FaLinkedinIn></FaLinkedinIn>
            </a>
            <a data-mdb-ripple-init className="btn text-white btn-floating m-1" style={{ backgroundColor: '#333333' }} href="#!" role="button">
              <FaGithub/>
            </a>
          </section>
        </div>
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © {new Date().getFullYear()} Copyright:Agro Gest PRO
        </div>
      </footer>
    </div>
  );
};

export default PageAccueil;
