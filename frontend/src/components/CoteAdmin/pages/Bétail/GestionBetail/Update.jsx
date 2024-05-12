import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
function Update({ onUpdate, betailId }) {
  const [show, setShow] = useState(false);
  const [betail, setBetail] = useState([]);

  const [race, setRace] = useState('');
  const [sexe, setSexe] = useState('');
  const [frequence_suivi_sante, setFrequenceSuivie] = useState('');
 
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [races, setRaces] = useState([]);
  const [image_betail, setImageBetail] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
    
    if (selectedCategory) {
      fetchRacesByCategory(selectedCategory);
    }
  };
  const fetchBetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Betail/${betailId}`);
      const data = response.data.data;
      setBetail(data);
     setRace(data.race);
      setSelectedCategory(data.id_categorie._id);
     
    } catch (error) {
      console.error('Error fetching betail:', error);
    }
  };


  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/CategorieBetail');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  
  const fetchRacesByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:3001/CategorieBetail/categories/races/${categoryId}`);
      setRaces(response.data.data); // Assuming response.data.data contains the array of races
    } catch (error) {
      console.error('Error fetching races:', error);
    }
  };
 


 
  useEffect(() => {
    
      fetchBetail();
      fetchCategories();
      
  }, []);


  
  
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (categoryId) {
      fetchRacesByCategory(categoryId);
    } else {
      setRaces([]); // Reset races when no category is selected
    }
  };
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      
      
      formData.append("image_betail", image_betail);
      
      const result = await axios.put(`http://localhost:3001/Betail/${betailId}`,
       formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      handleClose();
      alert(result.data.message);
      onUpdate();
      window.location.reload()
      
    } catch (error) {
      console.error('Error updating betail:', error);
    }
  };

  const handleImageChange = (e) => {
    setImageBetail(e.target.files[0]);
  };


  return (
    <>
      <FaRegEdit type='button' className='icon-edit' onClick={handleShow} />

      <Modal show={show} onHide={handleClose}className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Betail</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} id="updateForm">
        <Modal.Body className='w-100'>
        {betail && (
            <div>
            <Form.Group controlId="categorie">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" name="id_categorie" defaultValue={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Sélectionnez la catégorie</option>
                {categories.map((categorie) => (
                  <option key={categorie._id} value={categorie._id}>
                    {categorie.nom_categorieBetail}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="race">
              <Form.Label>Race</Form.Label>
              <Form.Control as="select" name="race" defaultValue={race} onChange={(e) => setRace(e.target.value)} disabled={!selectedCategory}>
                <option value="">Sélectionnez la race</option>
                {races.map((race) => (
                  <option selected={race===betail.race}key={race} value={race}>
                    {race}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

           

            <Form.Group className="mb-3" controlId="etat">
              <Form.Label>État de gestation</Form.Label>
              <Form.Control as="select" id='etat_betail' name="etat_betail" defaultValue={betail.etat_betail}  >
                <option value="">Sélectionnez l'etat de gestation</option>
                <option selected={"Gestation"===betail.etat_betail} value="Gestation">Gestation</option>
                <option selected={"Non Gestation"===betail.etat_betail} value="Non Gestation">Non Gestation</option>
              </Form.Control>
            </Form.Group>

          <Form.Group className="mb-3" controlId="nom_betail">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Betail:">
                <Form.Control
                  type="text"
                  placeholder="Nom Betail"
                  defaultValue={betail.nom_betail}
                 name='nom_betail'
                 id='nom_betail'
                />
              </FloatingLabel>
            </Form.Group>

           


            
            

            <Form.Group className="mb-3" controlId="sexe">
              <Form.Label>sex</Form.Label>
              <Form.Control as="select" id='sexe' name='sexe' defaultValue={sexe} onChange={(e) => setSexe(e.target.value)} >
                <option value="">Sélectionnez la genre du betail</option>
                <option selected={"masculin"===betail.sexe} value="masculin">masculin</option>
                <option selected={"féminin"===betail.sexe} value="féminin">féminin</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="alimentation">
              <Form.Label>Besoin d'alimentation</Form.Label>
              <Form.Control type="text" name="alimentation" defaultValue={betail.alimentation}
                  />
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantite_aliment_par_jour_kg">
              <Form.Label>Quantité d'alimentation par jour en KG</Form.Label>
              <Form.Control type="text" name="quantite_aliment_par_jour_kg"  defaultValue={betail.quantite_aliment_par_jour_kg}
                   />
            </Form.Group>

            <Form.Group className="mb-3" controlId="frequence_suivi_sante">
              <Form.Label>Fréquence de suivi de la santé</Form.Label>
              <Form.Control as="select" id='frequence_suivi_sante' name='frequence_suivi_sante' defaultValue={frequence_suivi_sante} onChange={(e) => setFrequenceSuivie(e.target.value)} >
                <option value="">Sélectionnez la fréquence de suivi de la santé</option>
                <option selected={"Quotidienne"===betail.frequence_suivi_sante} value="Quotidienne">Quotidienne</option>
                <option selected={"Hebdomadaire"===betail.frequence_suivi_sante} value="Hebdomadaire">Hebdomadaire</option>
                <option selected={"Bimensuelle"===betail.frequence_suivi_sante} value="Bimensuelle">Bimensuelle</option>
                <option selected={"Mensuelle"===betail.frequence_suivi_sante} value="Mensuelle">Mensuelle</option>
                <option selected={"Trimestrielle"===betail.frequence_suivi_sante} value="Trimestrielle">Trimestrielle</option>
                <option selected={"Semestrielle"===betail.frequence_suivi_sante} value="Semestrielle">Semestrielle</option>
                <option selected={"Annuelle"===betail.frequence_suivi_sante} value="Annuelle">Annuelle</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="commentaires_sante">
              <Form.Label>Commentaire pour la santé</Form.Label>
              <Form.Control as="textarea" style={{ height: '100px' }} name="commentaires_sante" defaultValue={betail.commentaires_sante}
                 />
            </Form.Group>

            

            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel controlId="floatingTextarea2" label="Image Betail:">
                <Form.Control
                  type="file"
                  onChange={handleImageChange}
                />
              </FloatingLabel>
            </Form.Group>
           

            </div> 
            
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-secondary" onClick={handleClose}>Close</Button>
          <Button className="btn" type="submit" form="updateForm"> Enregistrer </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Update;