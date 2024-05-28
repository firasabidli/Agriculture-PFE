import React, { useEffect, useState } from 'react';
//import { Navbar as BootstrapNavbar } from 'react-bootstrap';
import { GiCow } from 'react-icons/gi';
import { SiHappycow } from "react-icons/si";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Nav, Modal } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaSearch, FaShoppingBag, FaHome, FaLeaf, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../../assets/CoteClient/lib/animate/animate.min.css';
import '../../assets/CoteClient/lib/owlcarousel/assets/owl.carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CoteClient/css/style.css';
import logo from "../../assets/images/logo1.png";
import axios from 'axios';
import { useUser } from '../UserContext';
const MyNavbar = ({ textColor }) => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayedData, setDisplayedData] = useState([]);
  const [displayedDataCategorieBetail, setDisplayedDataCategorieBetail] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [betails, setBetails] = useState([]);
  const [SaisonData, setSaisonData] = useState([]);
  const [culturesSaison, setCulturesSaison] = useState([]);
  const [showList, setShowList] = useState(false);
  const [showListPro, setShowListPro] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [categorieList,setCategorieList]=useState(false);
  const [categorieBetailList,setCategorieBetailList]=useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [hoveredCategoryBetail, setHoveredCategoryBetail] = useState(null);
  const [saisonList,setSaisonList]=useState(false);
  const [hoveredSaison, setHoveredSaison] = useState(null);

  const { user } = useUser();
  const userName = user?.nom;
  const userImage = user?.image;
  //const { user } = useUser();
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
    fetchSaison();
    fetchCategoriesBetail();
  }, []);
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Categorie');
      setDisplayedData(response.data.data);
     
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
  const fetchBetailByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3001/Betail/categorieBetail/${categoryId}`);
      setBetails(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cultures :', error);
    }
  };
  const fetchCategoriesBetail = async () => {
    try {
      const response = await axios.get('http://localhost:3001/CategorieBetail');
      setDisplayedDataCategorieBetail(response.data);
     
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories du betail:', error);
    }
  };
  const handleTitleClick = () => {
    setShowList(!showList);
    if (!showList) {
      fetchCategories();
    }
  };
  const handleProClick = () => {
    setShowListPro(!showListPro);
  };
const handleCategorieClick =()=>{
  setCategorieList(!categorieList);
}
const handleCategorieBetailClick =()=>{
  setCategorieBetailList(!categorieList);
}
  const handleCategoryChange = async (categoryId) => {
    try {
      await fetchCulturesByCategory(categoryId);
      setHoveredCategory(categoryId);
  
    } catch (error) {
      console.error('Erreur lors de la récupération des cultures :', error);
    }
  };
  const handleCategorybetailChange = async (categoryId) => {
    try {
      await fetchBetailByCategory(categoryId);
      setHoveredCategoryBetail(categoryId);
  
    } catch (error) {
      console.error('Erreur lors de la récupération des cultures :', error);
    }
  };
  //saison
  const handleSaisonClick =()=>{
    setSaisonList(!saisonList);
  }
  const fetchSaison = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Saison');
      setSaisonData(response.data.data);
    
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  };
  const fetchCulturesBySaison = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3001/Agriculture/saisonAgriculture/${categoryId}`);
      setCulturesSaison(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des cultures :', error);
    }
  };
  const handleSaisonChange = async (SaisonId) => {
    try {
      await fetchCulturesBySaison(SaisonId);
      setHoveredSaison(SaisonId);
  
    } catch (error) {
      console.error('Erreur lors de la récupération des cultures :', error);
    }
  };
  //User
  const handleProfileClick = () => {
    setShowUser(!showUser);
   
  };
  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    window.location.href = '/';
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
        <nav className={`navbar navbar-expand-lg navbar-light py-lg-0 px-lg-5  wow fadeIn ${isScrolled ? 'scrolled' : ''} `}>
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
                  <div className={`nav-link ms-3 ${isScrolled ? 'text-black' : ''}`} onClick={handleTitleClick} style={{ color: textColor,cursor:"pointer" }}>
                    <FaLeaf /><span>Agriculture</span>
                  </div>
                {/* <div style={{position:'relative'}}> */}
                  {showList && (
                    <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top: isScrolled ? '70px' : '120px',zIndex:1 }}>
                      <li>
                      <span className="dropdown-item-title" style={{fontWeight:"bold",cursor:"pointer"}}>Filtrer par</span>
                    </li>
                  <li>
                    <span className="dropdown-item-title" style={{fontWeight:"bold",cursor:"pointer"}} onClick={handleCategorieClick}>Catégorie</span>
                  </li>
                  {categorieList && (
                  <ul  style={{ top: isScrolled ? '70px' : '120px',zIndex: 1 }}>
                    {displayedData && displayedData.map((item) => (
                      <li key={item._id}>
                        <button value={item._id} onClick={() => handleCategoryChange(item._id)} className="dropdown-item rounded-2">
                          {item.nom_categorie}
                        </button>
                        {/* onMouseEnter={() => handleHoverCategory(item._id)} */}
                      </li>
                    ))}
                  </ul>
                  )}
                       <li>
                        <span className="dropdown-item-title" onClick={handleSaisonClick} style={{fontWeight:"bold",cursor:"pointer"}}>Saison</span>
                      </li>
                      {saisonList && (
                  <ul  style={{ top: isScrolled ? '70px' : '120px',zIndex: 1 }}>
                    {SaisonData && SaisonData.map((item) => (
                      <li key={item._id}>
                        <button value={item._id} onClick={() => handleSaisonChange(item._id)}  className="dropdown-item rounded-2">
                          {item.nom_saison}
                        </button>
                        {/* onMouseEnter={() => handleHoverCategory(item._id)} */}
                      </li>
                    ))}
                  </ul>
                  )}
                    </ul>
                  )}
                  {/* CultureCategorie */}
                  {hoveredSaison && (
                    <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top: isScrolled ? '70px' : '140px', zIndex: 2, right:'41%' }}>
                      {culturesSaison && culturesSaison.map((culture) => (
                       <Link to={`/culture/${culture._id}`}> <li key={culture._id} className="dropdown-item rounded-2">{culture.nom_agriculture}</li>
                       </Link>
                      ))}
                    </ul>
                  )}
                  {/* Culturesaison */}
                  {hoveredCategory && (
                    <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top: isScrolled ? '70px' : '140px', zIndex: 2, right:'36%' }}>
                      {cultures && cultures.map((culture) => (
                       <Link to={`/culture/${culture._id}`}> <li key={culture._id} className="dropdown-item rounded-2">{culture.nom_agriculture}</li>
                       </Link>
                      ))}
                    </ul>
                  )}
                  {/* </div> */}
                </li>
                <li className="nav-item">
                  <div className={`nav-link ms-3 ${isScrolled ? 'text-black' : ''}`} onClick={handleTitleClick} style={{ color: textColor ,cursor:"pointer"}}>
                  <SiHappycow />Bétail
                  </div>
                {/* <div style={{position:'relative'}}> */}
                  {showList && (
                    <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top: isScrolled ? '70px' : '120px',zIndex:1 }}>
                     
                  <li>
                    <span className="dropdown-item-title" style={{fontWeight:"bold",cursor:"pointer"}} onClick={handleCategorieBetailClick}>Catégorie</span>
                  </li>
                  {categorieBetailList && (
                  <ul  style={{ top: isScrolled ? '70px' : '120px',zIndex: 1 }}>
                    {displayedDataCategorieBetail && displayedDataCategorieBetail.map((item) => (
                      <li key={item._id}>
                        <button value={item._id} onClick={() => handleCategorybetailChange(item._id)} className="dropdown-item rounded-2">
                          {item.nom_categorieBetail}
                        </button>
                        {/* onMouseEnter={() => handleHoverCategory(item._id)} */}
                      </li>
                    ))}
                  </ul>
                  )}
                       
                   
                    </ul>
                  )}
                  {/* CultureCategorie */}
                 
                  {/* Culturesaison */}
                  {hoveredCategoryBetail && (
                    <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top: isScrolled ? '70px' : '140px', zIndex: 2, right:'36%' }}>
                      {betails && betails.map((betail) => (
                       <Link to={`/betail/${betail._id}`}> <li key={betail._id} className="dropdown-item rounded-2">{betail.nom_betail}</li>
                       </Link>
                      ))}
                    </ul>
                  )}
                  {/* </div> */}
                </li>

                
                  <li>
                  <div className={`nav-link ms-3  ${isScrolled ? 'text-black' : ''}`} onClick={handleProClick} style={{ color: textColor,cursor:"pointer" }}>
                  <span>Production</span>
                </div>
                  {showListPro && (
                  <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top: isScrolled ? '70px' : '120px',zIndex:1 }}>
                    <li>
                    <Nav.Link as={Link} to="/agriculteur/FicheAnimal" className={`nav-item nav-link ms-3 ${isScrolled ? 'text-black' : ''}`} style={{ color: textColor,cursor:"pointer" }}>
                    <span className="dropdown-item rounded-2" style={{fontWeight:"bold",cursor:"pointer"}}>FicheAnimal</span> 
                    </Nav.Link>
                    </li>
                    <li>
                    <Nav.Link as={Link} to="/agriculteur/FicheAgriculture" className={`nav-item nav-link ms-3 ${isScrolled ? 'text-black' : ''}`} style={{ color: textColor,cursor:"pointer" }}>
                     <span className='dropdown-item rounded-2'style={{fontWeight:"bold",cursor:"pointer"}}>Production Agriculture </span>
                    </Nav.Link>
                    </li>
                    <li>
                    <Nav.Link as={Link} to="/agriculture/gestionStock" className={`nav-item nav-link ms-3 ${isScrolled ? 'text-black' : ''}`} style={{ color: textColor,cursor:"pointer" }}>
                     <span className='dropdown-item rounded-2'style={{fontWeight:"bold",cursor:"pointer"}}>Gestion Stock Agriculture </span>
                    </Nav.Link>
                    </li>
                  </ul>
                  )}
                  </li>
                  <div className=" pt-4 d-sm-flex ms-2 mx-5">
                
                <Link to="/meteo" className='rounded-circle btn-sm-square bg-white ms-3 text-dark pt-1 fs-4'>
                 <TiWeatherPartlySunny />
                </Link>
                
              <div>
            <div className='rounded-circle btn-sm-square bg-white ms-3' onClick={handleProfileClick}>
            <img
                    src={userImage && userImage.startsWith('http') ? userImage : `http://localhost:3001/images/Utilisateur/Agriculteur/${userImage}`}
                    alt={userName}
                    width="32"
                    height="32"
                    className="rounded-circle"
                    onClick={handleProfileClick}
                  />
      
            </div>
            {showUser && (
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow position-fixed d-grid gap-1 p-2 rounded-3 mx-0  w-220px" style={{ top: isScrolled ? '70px' : '120px',zIndex:1 }}>
          <li><a className="dropdown-item" href="/">{userName ||'Utilisateur'}</a></li>
          <li><Link to="/profileAgriculteur" className="dropdown-item" >Profil</Link></li>
          <li><hr className="dropdown-divider"/></li>
          <li><a className="dropdown-item" href="/" onClick={handleLogout}>Se déconnecter</a></li>
        </ul>
      )}
            </div>
                
              </div>
              </ul>
             
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
    </div>
  );
};

export default MyNavbar;
