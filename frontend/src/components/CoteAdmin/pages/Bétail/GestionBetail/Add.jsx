import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FcPlus } from "react-icons/fc";

function Add({ onCreate }) {
  const [show, setShow] = useState(false);
  const [nom_betail, setNomBetail] = useState('');
  const [race, setRace] = useState('');
  const [sexe, setSexe] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [races, setRaces] = useState([]);
  const [image_betail, setImageBetail] = useState(null);
  const [alimentation, setAlimentation] = useState('');
  const [quantite_aliment_par_jour_kg, setQuantiteAliment] = useState('');
  const [frequence_suivi_sante, setFrequenceSuivi] = useState('');
  const [commentaires_sante, setComment] = useState('');
  const [etat_betail, setEtatBetail] = useState('');

  useEffect(() => {

    fetchCategories();
  }, []);

 

  const handleClose = () => {
    setShow(false);
    resetForm();
    setSelectedCategory('');
    setRaces([]);
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
  const handleShow = () => {
    setShow(true)
    resetForm();
    if (selectedCategory) {
      fetchRacesByCategory(selectedCategory);
    }
  };

  const resetForm = () => {
    setNomBetail('');
    setRace('');
    setSexe('');
    setImageBetail(null);
    setSelectedCategory('');
    setAlimentation('');
    setQuantiteAliment('');
    setFrequenceSuivi('');
    setComment('');
    setEtatBetail('');
  };
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);
    if (categoryId) {
      fetchRacesByCategory(categoryId);
    } else {
      setRaces([]); // Reset races when no category is selected
    }
  };
  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('id_categorie', selectedCategory);
    formData.append("nom_betail", nom_betail);
    formData.append('race', race);
    formData.append("sexe", sexe);
    formData.append("image_betail", image_betail);
    formData.append('alimentation', alimentation);
    formData.append('quantite_aliment_par_jour_kg', quantite_aliment_par_jour_kg);
    formData.append('frequence_suivi_sante', frequence_suivi_sante);
    formData.append('commentaires_sante', commentaires_sante);
    formData.append('etat_betail', etat_betail);
    try {
      const result = await axios.post(
        "http://localhost:3001/Betail",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(result);
      if (result.data.success) {
        handleClose();
        alert(result.data.message);
        window.location.reload()
        onCreate();

      }
    } catch (error) {
      console.error("Error uploading betail:", error);
    }
  };

  const onInputChange = (e) => {
    setImageBetail(e.target.files[0]);
  };

 

 

  

  return (
    <>
      <Button className='btn-plus' onClick={handleShow}>
        <FcPlus className='icon-plus' />
        <span className='btn-title'>Ajouter</span>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une betail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit} id="form">


          <Form.Group controlId="categorie">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" name="categorie" value={selectedCategory} onChange={handleCategoryChange}>
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
              <Form.Control as="select" name="race" value={race} onChange={(e) => setRace(e.target.value)} disabled={!selectedCategory}>
                <option value="">Sélectionnez la race</option>
                {races.map((race) => (
                  <option key={race} value={race}>
                    {race}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="etat_betail">
              <Form.Label>État de gestation</Form.Label>
              <Form.Control type="text" name="etat_betail" value={etat_betail} onChange={(e) => setEtatBetail(e.target.value)}/>
            </Form.Group>

          <Form.Group className="mb-3" controlId="nom_betail">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Betail:">
                <Form.Control
                  type="text"
                  placeholder="Nom Betail"
                  value={nom_betail}
                  onChange={(e) => setNomBetail(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

           


            
            

            <Form.Group className="mb-3" controlId="saison">
              <Form.Label>sex</Form.Label>
              <Form.Control as="select" value={sexe} onChange={(e) => setSexe(e.target.value)}>
                <option value="">Sélectionnez la genre du betail</option>
                <option value="masculin">masculin</option>
                <option value="féminin">féminin</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="alimentation">
              <Form.Label>Besoin d'alimentation</Form.Label>
              <Form.Control type="text" name="alimentation" value={alimentation}
                  onChange={(e) => setAlimentation(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantite_aliment_par_jour_kg">
              <Form.Label>Quantité d'alimentation par jour en KG</Form.Label>
              <Form.Control type="text" name="quantite_aliment_par_jour_kg"  value={quantite_aliment_par_jour_kg}
                  onChange={(e) => setQuantiteAliment(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="frequence_suivi_sante">
              <Form.Label>Fréquence de suivi de la santé</Form.Label>
              <Form.Control as="select" value={frequence_suivi_sante} onChange={(e) => setFrequenceSuivi(e.target.value)}>
                <option value="">Sélectionnez la fréquence de suivi de la santé</option>
                <option value="Quotidienne">Quotidienne</option>
                <option value="Hebdomadaire">Hebdomadaire</option>
                <option value="Bimensuelle">Bimensuelle</option>
                <option value="Mensuelle">Mensuelle</option>
                <option value="Trimestrielle">Trimestrielle</option>
                <option value="Semestrielle">Semestrielle</option>
                <option value="Annuelle">Annuelle</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="commentaires_sante">
              <Form.Label>Commentaire pour la santé</Form.Label>
              <Form.Control as="textarea" style={{ height: '100px' }} name="commentaires_sante" value={commentaires_sante}
                  onChange={(e) => setComment(e.target.value)} />
            </Form.Group>

            

            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel controlId="floatingTextarea2" label="Image Betail:">
                <Form.Control
                  type="file"
                  onChange={onInputChange}
                />
              </FloatingLabel>
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn className="bg-secondary" onClick={handleClose}>
            Fermer
          </Btn>
          <Btn className="btn" type="submit" form="form">
            Ajouter
          </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;