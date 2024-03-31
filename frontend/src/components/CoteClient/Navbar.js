import React, { useEffect, useState } from 'react';
import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Nav, Modal } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaSearch, FaUser, FaShoppingBag, FaHome, FaLeaf, FaCat, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../assets/CoteClient/lib/animate/animate.min.css';
import '../../assets/CoteClient/lib/owlcarousel/assets/owl.carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CoteClient/css/style.css';
import logo from "../../assets/images/logo.jpg";
import axios from 'axios';
const MyNavbar = ({ textColor }) => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [showList, setShowList] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 0;
      setIsScrolled(scrolled);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Categorie');
      setDisplayedData(response.data.categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  };

  const fetchCulturesByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3001/Agriculture/categorieAgriculture/${categoryId}`);
      setCultures(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cultures :', error);
    }
  };

  const handleTitleClick = () => {
    setShowList(!showList);
  };

  const handleCategoryChange = async (categoryId) => {
    try {
      await fetchCulturesByCategory(categoryId);
      setHoveredCategory(categoryId);
    } catch (error) {
      console.error('Erreur lors de la récupération des cultures :', error);
    }
  };
  return (
    <div>
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
        <BootstrapNavbar className={`navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5  wow fadeIn ${isScrolled ? 'scrolled' : ''} `}>
          <div class="container-fluid">
             <img className='logo' src={ logo} alt=""/>
            <button class={`navbar-toggler ${isScrolled ? 'text-white' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-auto p-4 p-lg-0">
                  <li class="nav-item">
                    <Nav.Link as={Link} to="/accueil" className={`nav-item nav-link ms-3 ${isScrolled ? 'text-black' : ''}`} style={{ color: textColor }}>
                      <FaHome /> Accueil
                    </Nav.Link>
                  </li>
                  <li className="nav-item">
                  <div className={`nav-link ms-3 ${isScrolled ? 'text-black' : ''}`} onClick={handleTitleClick} style={{ color: textColor }}>
                    <FaLeaf /><span>Agriculture</span>
                  </div>
                {/* <div style={{position:'relative'}}> */}
                  {showList && (
                    <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top: isScrolled ? '70px' : '120px',zIndex:1 }}>
                      {displayedData.map((item) => (
                        <li key={item._id}>
                          <button value={item._id} onClick={() => handleCategoryChange(item._id)} className="dropdown-item rounded-2">
                            {item.nom_categorie}
                          </button>
                          {/* onMouseEnter={() => handleHoverCategory(item._id)} */}
                        </li>
                      ))}
                    </ul>
                  )}
                  {hoveredCategory && (
                    <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top: isScrolled ? '70px' : '140px', zIndex: 2,right:'39%' }}>
                      {cultures.map((culture) => (
                       <Link to={`/culture/${culture._id}`}> <li key={culture._id} className="dropdown-item rounded-2">{culture.nom_agriculture}</li>
                       </Link>
                      ))}
                    </ul>
                  )}
                  {/* </div> */}
                </li>
                  <li>
                    <Nav.Link as={Link} to="/betail" className={`nav-item nav-link ms-3 ${isScrolled ? 'text-black' : ''}`} style={{ color: textColor }}>
                      <FaCat /> Bétail
                    </Nav.Link>
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
        </BootstrapNavbar>

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
    </div>
  );
};

export default MyNavbar;
