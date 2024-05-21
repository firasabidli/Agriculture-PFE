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
  const [nom_betail, setNomBetail] = useState('');
  const [quantite_aliment_par_jour_kg, setQuant] = useState('');
  const [race, setRace] = useState('');
  const [sexe, setSexe] = useState('');
  const [commentaires_sante, setComment] = useState('');
  const [alimentation, setAlimentation] = useState('');
  const [frequence_suivi_sante, setFrequenceSuivie] = useState('');
  const [etat_betail, setEtat] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [races, setRaces] = useState([]);
  const [image_betail, setImageBetail] = useState(null);
  const [errors, setErrors] = useState({});
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
      setSexe(data.sexe);
      setFrequenceSuivie(data.frequence_suivi_sante);
      setEtat(data.etat_betail);
      setAlimentation(data.alimentation);
      setComment(data.commentaires_sante);
      setQuant(data.quantite_aliment_par_jour_kg);
      setNomBetail(data.nom_betail);
      etat_betail(data.etat_betail);
     
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
  
  const validateForm = () => {
    const newErrors = {};

    if (! nom_betail.trim()) {
      newErrors.nom_betail = "Le nom de Betail est requis";
    }
    if ( nom_betail.length<4) {
      newErrors.nom_betail = "La taille de nom de Betail doit etre superieur ou égale à 4";
    }
    if (/\d/.test( nom_betail))  {
      newErrors.nom_betail = "Le nom de Betail ne doit pas contenir de chiffres";
    }
    if (! commentaires_sante.trim()) {
      newErrors.commentaires_sante = 'Le commentaire de la santé est requise';
    }
    if ( commentaires_sante.length<6) {
      newErrors.commentaires_sante = 'Le commentaire de la santé doit etre superieur ou égale à 6';
    }
    if (/\d/.test( commentaires_sante))  {
      newErrors.commentaires_sante = 'Le commentaire de la santé ne doit pas contenir de chiffres';
    }
  
   
    if (selectedCategory==="")  {
      newErrors.categorie = "Il faut choisir la categorie";
    } 

    if (race==="")  {
      newErrors.race = "Il faut choisir le race";
    } 

    if (sexe==="")  {
      newErrors.sexe = "Il faut choisir le sexe";
    } 
    if ( etat_betail==="")  {
      newErrors.etat_betail = "Il faut choisir l'etat de betail";
    } 
    if (frequence_suivi_sante==="")  {
      newErrors.frequence_suivi_sante = "Il faut choisir la fréquence de suivie de la santé";
    } 
    if ( quantite_aliment_par_jour_kg==="")  {
      newErrors.quantite_aliment_par_jour_kg = "La quantite d'alimentation est requise";
    } 
    if ( alimentation==="")  {
      newErrors.alimentation = "Le besoin d'alimentation est requise";
    } 


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

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
              {errors.categorie && <div className="text-danger">{errors.categorie}</div>}
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
              {errors.race && <div className="text-danger">{errors.race}</div>}
            </Form.Group>

           

            <Form.Group className="mb-3" controlId="etat">
              <Form.Label>État de gestation</Form.Label>
              <Form.Control as="select" id='etat_betail' name="etat_betail" defaultValue={etat_betail} onChange={(e) => setEtat(e.target.value)} >
                <option value="">Sélectionnez l'etat de gestation</option>
                <option selected={"Gestation"===betail.etat_betail} value="Gestation">Gestation</option>
                <option selected={"Non Gestation"===betail.etat_betail} >Non Gestation</option>
              </Form.Control>
              {errors.etat_betail && <div className="text-danger">{errors.etat_betail}</div>}
            </Form.Group>

          <Form.Group className="mb-3" controlId="nom_betail">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Betail:">
                <Form.Control
                  type="text"
                  placeholder="Nom Betail"
                  defaultValue={nom_betail}
                  onChange={(e) => setNomBetail(e.target.value)}
                 name='nom_betail'
                 id='nom_betail'
                />
              </FloatingLabel>
              {errors.nom_betail && <div className="text-danger">{errors.nom_betail}</div>}
            </Form.Group>

           


            
            

            <Form.Group className="mb-3" controlId="sexe">
              <Form.Label>sex</Form.Label>
              <Form.Control as="select" id='sexe' name='sexe' defaultValue={sexe} onChange={(e) => setSexe(e.target.value)} >
                <option value="" disabled={etat_betail==="Gestation"}>Sélectionnez la genre du betail</option>
                <option selected={"masculin"===betail.sexe } disabled={etat_betail==="Gestation"}  value="masculin">masculin</option>
                <option selected={"féminin"===betail.sexe } value="féminin">féminin</option>
              </Form.Control>
              {errors.sexe && <div className="text-danger">{errors.sexe}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="alimentation">
              <Form.Label>Besoin d'alimentation</Form.Label>
              <Form.Control type="text" name="alimentation" defaultValue={alimentation} onChange={(e) => setAlimentation(e.target.value)}
                  />
                  {errors.alimentation && <div className="text-danger">{errors.alimentation}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantite_aliment_par_jour_kg">
              <Form.Label>Quantité d'alimentation par jour en KG</Form.Label>
              <Form.Control type="Number" name="quantite_aliment_par_jour_kg"  defaultValue={quantite_aliment_par_jour_kg} onChange={(e) => setQuant(e.target.value)}
                   />
                    {errors.quantite_aliment_par_jour_kg && <div className="text-danger">{errors.quantite_aliment_par_jour_kg}</div>}
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
              {errors.frequence_suivi_sante && <div className="text-danger">{errors.frequence_suivi_sante}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="commentaires_sante">
              <Form.Label>Commentaire pour la santé</Form.Label>
              <Form.Control as="textarea" style={{ height: '100px' }} name="commentaires_sante" defaultValue={commentaires_sante} onChange={(e) => setComment(e.target.value)}
                 />
                 {errors.commentaires_sante && <div className="text-danger">{errors.commentaires_sante}</div>}
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