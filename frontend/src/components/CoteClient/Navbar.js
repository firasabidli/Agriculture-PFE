import React, { useEffect, useState } from 'react';
import {  Nav, Modal } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaSearch, FaUser, FaShoppingBag, FaHome, FaLeaf, FaCat, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
//import { Spinner } from 'react-bootstrap';
import '../../assets/CoteClient/lib/animate/animate.min.css';
import '../../assets/CoteClient/lib/owlcarousel/assets/owl.carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../assets/CoteClient/css/style.css';
import logo from "../../assets/images/logo.png"
const MyNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Mettez à jour l'état en fonction de la position de défilement
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };

    // Ajoutez un écouteur d'événements de défilement
    window.addEventListener('scroll', handleScroll);

    // Nettoyez l'écouteur d'événements lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div>
    {/* spinner */}
    {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
    <div className="spinner-border text-primary" role="status"></div>
    </div> */}
    {/* fin spinner */}
      <div className={`container-fluid fixed-top px-0 wow fadeIn ${isScrolled ? 'scrolled' : ''}`} data-wow-delay="0.1s">
        <div className={`top-bar row gx-0 align-items-center d-none d-lg-flex ${isScrolled ? 'invisible' : ''}`}>
          <div className="col-lg-6 px-5 text-start">
            <small><FaMapMarkerAlt className="me-2" />123 Street, Jendouba, Tunis</small>
            <small className="ms-4"><FaEnvelope className="me-2" />info@example.com</small>
          </div>
          <div className="col-lg-6 px-5 text-end">
            <small>Follow us:</small>
            <FaFacebookF className="text-body ms-3"/>
            <FaTwitter className="text-body ms-3" />
            <FaLinkedinIn className="text-body ms-3" />
            <FaInstagram className="text-body ms-3"  />
          </div>
        </div>
        <nav className={`navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5 wow fadeIn ${isScrolled ? 'scrolled' : ''} `}>
          <div class="container-fluid">
             <img className='logo' src={ logo} alt=""/>
            {/* <h1 className="fw-bold text-primary m-0">F<span className="text-secondary">oo</span>dy</h1> */}
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto p-4 p-lg-0">
                  <li class="nav-item">
                    <Nav.Link as={Link} to="/accueil" className={`nav-item nav-link ms-3 ${isScrolled ? 'text-black' : ''}`}>
                      <FaHome /> Accueil
                    </Nav.Link>
                  </li>
                  <li class="nav-item">
                    <Nav.Link as={Link} to="/culture" className={`nav-item nav-link ms-3 ${isScrolled ? 'text-black' : ''}`}>
                      <FaLeaf /> Culture
                    </Nav.Link>
                  </li>
                  <li>
                    <Nav.Link as={Link} to="/betail" className={`nav-item nav-link ms-3 ${isScrolled ? 'text-black' : ''}`}>
                      <FaCat /> Bétail
                    </Nav.Link>
                  </li>
                  <li className="nav-item dropdown">
            <a className={`nav-link dropdown-toggle ${isScrolled ? 'text-black' : ''}`} href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Dropdown
            </a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="/">Action</a></li>
              <li><a className="dropdown-item" href="/">Another action</a></li>
              <li><hr className="dropdown-divider"/></li>
              <li><a className="dropdown-item" href="/">Something else here</a></li>
            </ul>
          </li>
              </ul>
              <div className="d-none d-lg-flex ms-2">
                <button className='rounded-circle btn-sm-square bg-white ms-3'>
                  <FaSearch className="text-body"  onClick={handleModalShow} />
                </button>
                <button className='rounded-circle btn-sm-square bg-white ms-3'>
                  <FaUser className="text-body" />
                </button>
                <button className='rounded-circle btn-sm-square bg-white ms-3'>
                  <FaShoppingBag className="text-body  " />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Search Modal */}
        <Modal show={showModal} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Add your search form or content here */}
          </Modal.Body>
        </Modal>
      </div>
      {/* <HeaderCarousel></HeaderCarousel>
      <TypeSol/> */}
    </div>
  );
  };

export default MyNavbar;
