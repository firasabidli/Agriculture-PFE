import React, { useEffect, useState } from 'react';
import './ListAnimal.css';
import { Dropdown, Button } from 'react-bootstrap';
import Navbar from '../../Navbar.js';
import Carousel from './Carousel.jsx';
import Add from './Add.jsx';
import axios from 'axios';
import UpdateAgriculture from './Update.jsx';
import Details from './Details.jsx';
import { Link } from 'react-router-dom';
import AgricultureStats from '../AgricultureStats.js';
import {useUser} from '../../../UserContext.js';
const ListAgriculture = () => {
  const [culture, setCulture] = useState([]);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const [selectedCultureId, setSelectedCultureId] = useState(null);
  const [selecteddetailsId, setSelecteddetailsId] = useState(null);
  const [hasHarvestData, setHasHarvestData] = useState(false); // Ajout d'un état pour vérifier les données de récolte
  const { user } = useUser();
  const userId=user?._id;
  const handleDetailsClick = (Id) => {
    console.log("cultur", Id);
    setSelecteddetailsId(Id);
  };

  const handleCloseDetailsModal = () => {
    setSelecteddetailsId(null);
    fetchAgricultureByAgriculteur();
  };

  const handleUpdateClick = (cultureId) => {
    setSelectedCultureId(cultureId);
  };

  const handleCloseModal = () => {
    setSelectedCultureId(null);
    fetchAgricultureByAgriculteur();
  };

  useEffect(() => {
    fetchAgricultureByAgriculteur();
    checkHarvestData(); // Vérification des données de récolte
  }, );

  const fetchAgricultureByAgriculteur = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3001/ListeAgriculture/cultre', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setCulture(response.data);
      
    } catch (error) {
      console.error('Erreur lors de la récupération des agricultures de l\'agriculteur:', error);
    }
  };

  const checkHarvestData = async () => {
    try {
      
      const response = await axios.get(`http://localhost:3001/HistoriqueRecolte/recoltAgriculteur/${userId}`);
      setHasHarvestData(response.data.length > 0); // Mettez à jour l'état selon les données de récolte
    } catch (error) {
      console.error('Erreur lors de la vérification des données de récolte:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
      if (!confirmDelete) {
        return;
      }

      const updatedData = culture.filter(item => item._id !== id);
      setCulture(updatedData);
      
      await axios.delete(`http://localhost:3001/ListeAgriculture/${id}`);
      fetchAgricultureByAgriculteur();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'élément :', error);
    }
  };

  const handleLinkClick = (animalId) => {
    return `/agriculteur/historique/Engrais/${animalId}`;
  };
  const handleLinkEqClick = (animalId) => {
    return `/agriculteur/historique/Equipement/${animalId}`;
  };
  const handleLinkMClick = (animalId) => {
    return `/agriculteur/historique/MainOeuvre/${animalId}`;
  };
  const handleLinkIClick = (animalId) => {
    return `/agriculteur/historique/Irrigation/${animalId}`;
  };
  const handleLinkRClick = (animalId) => {
    return `/agriculteur/historique/Recolte/${animalId}`;
  };

  return (
    <div>
      <Navbar textColor="black" />
      <Carousel />
      <div className="containerList" style={{ marginTop: "3%" }}>
        <div className="row">
          <div className="col-lg-8 mb-3">
            <div className="page-content page-container" id="page-content">
              <div className="padding">
                <div className="row" style={{ marginLeft: "-15%" }}>
                  <div className="col-sm-8">
                    <div className="animal-list">
                      {culture.length > 0 ? (
                        culture.map((element) => (
                          <div className="container-fluid d-flex justify-content-center" key={element._id}>
                            <div className="list list-row card" style={{ width: "75%" }} >
                              <div className="list-item" data-id="">
                                <div><a href="x"><span className="w-40 avatar gd-primary">A</span></a></div>
                                <div className="flex">
                                  <a href="x" className="item-author text-color">Titre: {element.titre}</a>
                                  <br />
                                  <div className="item-except text-muted text-sm h-1x">Date de plantation: {new Date(element.datePlantation).toLocaleDateString('fr-FR', options)}</div>
                                </div>
                                <div className="no-wrap">
                                  <div className="item-date text-muted text-sm d-none d-md-block"></div>
                                </div>
                                <div>
                                  <Dropdown align="end">
                                    <Dropdown.Toggle className='eviteHover' style={{ background: "white", color: "black", border: "none" }}>
                                      <Dropdown.Menu>
                                        <Link className="dropdown-item" to={handleLinkClick(element._id)} >Suivi Engrais</Link>
                                        <Link className="dropdown-item" to={handleLinkEqClick(element._id)} >Suivi Equipement</Link>
                                        <Link className="dropdown-item" to={handleLinkMClick(element._id)} >Suivi Main d'Oeuvre</Link>
                                        <Link className="dropdown-item" to={handleLinkIClick(element._id)} >Suivi d'Irrigation</Link>
                                        <Link className="dropdown-item" to={handleLinkRClick(element._id)} >Suivi Recolte</Link>
                                        <p className="dropdown-item" onClick={() => handleDetailsClick(element._id)} style={{ fontFamily: "Arial" }}>Détails</p>
                                        <p className="dropdown-item text-success" onClick={() => handleUpdateClick(element._id)} style={{ fontFamily: "Arial" }}>Modifier</p>
                                        <Dropdown.Divider />
                                        <Dropdown.Item className="text-danger" onClick={() => handleDelete(element._id)}>
                                          Supprimer
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown.Toggle>
                                  </Dropdown>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p style={{ fontFamily: "arial", fontSize: "x-large", marginLeft: "15%" }}>Aucun élément d'agriculture trouvé.</p>
                      )}
                      <UpdateAgriculture cultureId={selectedCultureId} onClose={handleCloseModal} />
                      <Details Id={selecteddetailsId} onClose={handleCloseDetailsModal} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 mb-4 mb-lg-0 px-lg-0 mt-lg-0" style={{ marginLeft: "-3%", width: "29%" }}>
            <div data-settings="{&quot;parent&quot;:&quot;#content&quot;,&quot;mind&quot;:&quot;#header&quot;,&quot;top&quot;:10,&quot;breakpoint&quot;:992}" data-toggle="sticky" className="sticky" style={{ top: "85px" }}>
              <div className="sticky-inner">
                <Add onCreate={fetchAgricultureByAgriculteur} />
                {hasHarvestData &&<AgricultureStats />}
                {hasHarvestData && (
                    <Link to="/prevision">
                        <Button variant="primary">Visualiser Prévision</Button>
                    </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListAgriculture;
