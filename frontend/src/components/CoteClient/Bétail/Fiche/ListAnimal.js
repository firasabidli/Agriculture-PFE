import React, { useEffect, useState } from 'react';
import './ListAnimal.css'
import {  Dropdown,Button } from 'react-bootstrap';
import Navbar from '../../Navbar';
import CarouselBetail from './CarouselBetail.jsx';
import Filtre from './Filtre.jsx';
import Activity from './Activity.jsx';
import axios from 'axios';
import Add from './Add';
import Update from './Update.jsx';
import { Link } from 'react-router-dom';

const ListAnimal = () => {

  const [animaux, setAnimaux] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const [selectedAnimalId, setSelectedAnimalId] = useState(null);
  const handleUpdateClick = (animalId) => {
    setSelectedAnimalId(animalId);
  };
  const handleCloseModal = () => {
    setSelectedAnimalId(null);
    fetchAnimauxByAgriculteur(); // Recharger la liste des animaux après la modification
  }
  useEffect(() => {
    fetchAnimauxByAgriculteur(); // Appel initial pour charger les animaux
  }, []);

  // Fonction pour charger les animaux depuis l'API
  const fetchAnimauxByAgriculteur = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:3001/FicheAnimal/', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setAnimaux(response.data);
      setFilteredAnimals(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des animaux de l\'agriculteur:', error);
    }
  };

  // Fonction pour mettre à jour les animaux filtrés en fonction de la catégorie sélectionnée
  const handleCategoryFilter = (category, subcategory) => {
    
  
    if (category !== '') {
      let filtered = animaux.filter((animal) => animal.categorieBetail === category);
  
      if (subcategory !== '') {
        filtered = filtered.filter((animal) => animal.subCategorieBetail === subcategory);
      }
  
      setFilteredAnimals(filtered);
    } else {
      setFilteredAnimals(animaux);
    }
  };
  
	//   delete
	const handleDelete = async (id) => {
		try {
			// Afficher une alerte pour demander confirmation
			const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
			if (!confirmDelete) {
				return;
			}
	
			const updatedData = animaux.filter(item => item._id !== id);
            setAnimaux(updatedData);
            setFilteredAnimals(updatedData);
			await axios.delete(`http://localhost:3001/FicheAnimal/${id}`);
				fetchAnimauxByAgriculteur();
				
		} catch (error) {
			console.error('Erreur lors de la suppression de l\'élément :', error);
		}
	};
  const handleAnimalLinkClick = (animalId) => {
    return `/agriculteur/PageSante/${animalId}`;
  };
  const handleMouvementLinkClick = (animalId) => {
    return `/agriculteur/PageMouvement/${animalId}`;
  };
  const handleAlimentationLinkClick = (animalId) => {
    return `/agriculteur/PageAlimentation/${animalId}`;
  };
  const handleProductionLinkClick = (animalId) => {
    return `/agriculteur/PageProductionLaitiere/${animalId}`;
  };
  const handleHistoriqueProductionLinkClick = (animalId) => {
    return `/agriculteur/HistoriqueProduction/${animalId}`;
  };
  return (
    <div>
<Navbar textColor="black" />
<CarouselBetail></CarouselBetail>
    <div class="containerList" style={{marginTop:"3%"}}>
      <div class="row">
      
    {/* <!-- Main content --> */}
        <div class="col-md-7 mb-3">
          <Filtre onFilterChange={handleCategoryFilter}/>
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row" style={{marginLeft:"-15%"}}>
              <div className="col-sm-8">
              <div className="animal-list">
            {filteredAnimals.length > 0 ? (
              filteredAnimals.map((animal) => (
              
                <div className="container-fluid d-flex justify-content-center" key={animal._id}>
                
                  <div className="list list-row card" style={{width:"75%"}} >
                      <div className="list-item"  data-id="">
                        <div><a href="x"><span className="w-40 avatar gd-primary">A</span></a></div>
                        <div className="flex">
                          <a href="x" className="item-author text-color">Identifiant: {animal.IdantifiantsAnimal}</a>
                          <br/>
                          <a href="x" className="item-author text-color">Race: {animal.Race}</a>
                          <div className="item-except text-muted text-sm h-1x">Date de Naissance: {new Date(animal.date_naissance).toLocaleDateString('fr-FR', options)}</div>
                        </div>
                        <div className="no-wrap">
                          <div className="item-date text-muted text-sm d-none d-md-block"></div>
                          </div>
                          <div>
            <Dropdown align="end">
              <Dropdown.Toggle className='eviteHover' style={{background:"white", color:"black", border:"none"}}>         
              <Dropdown.Menu>
              <Link className="dropdown-item" to={handleAnimalLinkClick(animal._id)} >Suivi Santé</Link>
              <Link className="dropdown-item" to={handleMouvementLinkClick(animal._id)} >Suivi Mouvement</Link>
              <Link className="dropdown-item" to={handleAlimentationLinkClick(animal._id)} >Suivi Alimentation</Link>
             {animal.subCategorieBetail==="Vache"  && (
              <Link className="dropdown-item" to={handleProductionLinkClick(animal._id)} >Suivi Production Laitière</Link>
             )}
             {animal.subCategorieBetail==="Vache" && (
              <Link className="dropdown-item" to={handleHistoriqueProductionLinkClick(animal._id)} >Historique Production Laitière</Link>
             )}
             
              
                <Dropdown.Item>
                <Button onClick={() => handleUpdateClick(animal._id)}>Modifier</Button>
                  {/* <Update  onUpdate={fetchAnimauxByAgriculteur} animauxId={animal._id} /> */}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item  className="text-danger"  onClick={() => handleDelete(animal._id)}>
                  Supprimer 
                </Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown.Toggle>
            </Dropdown>
          </div>
                        
                      </div>
                  
                  </div>
                
             
                </div>
              ))): (
                <p style={{fontFamily:" arial",fontSize: "x-large",marginLeft: "15%"}}>Aucun animal trouvé pour la catégorie sélectionnée.</p>
                  )}
                   <Update animalId={selectedAnimalId} onClose={handleCloseModal} />
                  </div>
              </div>
            </div>
          </div>
        </div>
       
       </div>
    {/*  */}
    {/* <!-- Sidebar content --> */}
        <div class="col-md-5 mb-4 " >
        <div style={{ visibility: 'hidden', display: 'none', width: '285px', height: '801px', margin: '0px', float: 'none', position: 'static', inset: '85px auto auto' }}></div>
          <div data-settings="{&quot;parent&quot;:&quot;#content&quot;,&quot;mind&quot;:&quot;#header&quot;,&quot;top&quot;:10,&quot;breakpoint&quot;:992}" data-toggle="sticky" class="sticky" style={{top: "85px"}}>
            <div class="sticky-inner">
            <Add onCreate={fetchAnimauxByAgriculteur}/>
             <Activity animaux={animaux}/>
          </div>
          </div>
    </div>
    {/*  */}
    </div>
    </div>
    </div>
    
  );
};

export default ListAnimal;
