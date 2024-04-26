import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';

function Add({ onCreate }) {
  const [show, setShow] = useState(false);
  const [titre, setTitre] = useState('');
  const [surface, setSurface] = useState('');
  const [description, setDescription] = useState('');
  const [localisation, setLocalisation] = useState('');
  const [quantiteSemences, setQuantiteSemences] = useState('');
  const [datePlantation, setDatePlantation] = useState('');
  const [prixSemence, setPrixSemence] = useState('');
  const [prixTerrain, setPrixTerrain] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3001/Categorie'); // Assurez-vous de remplacer l'URL par celle de votre endpoint pour récupérer les catégories
      setCategories(response.data.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem('authToken');
    const isValidnom = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(titre);
    const isValiddescription= /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(description);

  if (!isValidnom || !isValiddescription) {
    alert('Le champ text ne doit contenir que des lettres, des chiffres et des espaces.');
    return;
  }
    const formData = {
      titre,
      surface,
      categorie: selectedCategory,
      description,
      localisation,
      quantiteSemences,
      datePlantation,
      prixSemence,
      prixTerrain
    };

    try {
      const response = await axios.post('http://localhost:3001/ListeAgriculture/', formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setTitre('');
        setSurface('');
        setDescription('');
        setLocalisation('');
        setQuantiteSemences('');
        setDatePlantation('');
        setPrixSemence('');
        setPrixTerrain('');
        handleClose();
        alert('Agriculture ajoutée avec succès !');
        onCreate();
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <>
      <p className="btn btn-lg btn-block btn-success rounded-0 py-4 mb-3 bg-op-6 roboto-bold" onClick={handleShow}>
        Ajouter Agriculture
      </p>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une agriculture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="form">
            <Form.Group className="mb-3" controlId="titre" style={{width: "144%"}} >
              <FloatingLabel label="Titre">
                <Form.Control
                  type="text"
                  placeholder="Titre"
                  value={titre}
                  onChange={(e) => setTitre(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="surface" style={{width: "144%"}}>
              <FloatingLabel label="Surface">
                <Form.Control
                  type="number"
                  placeholder="Surface"
                  value={surface}
                  onChange={(e) => setSurface(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="description" style={{width: "144%"}}>
              <FloatingLabel label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="localisation" style={{width: "144%"}}>
              <FloatingLabel label="Localisation">
                <Form.Control
                  type="text"
                  placeholder="Localisation"
                  value={localisation}
                  onChange={(e) => setLocalisation(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="quantiteSemences" style={{width: "144%"}}>
              <FloatingLabel label="Quantité de semences">
                <Form.Control
                  type="number"
                  placeholder="Quantité de semences"
                  value={quantiteSemences}
                  onChange={(e) => setQuantiteSemences(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="datePlantation" style={{width: "144%"}}>
              <FloatingLabel label="Date de plantation">
                <Form.Control
                  type="date"
                  placeholder="Date de plantation"
                  value={datePlantation}
                  onChange={(e) => setDatePlantation(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="categorie" style={{width: "144%"}}>
              <FloatingLabel label="Catégorie">
                <Form.Control as="select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                  <option value="">Choisir une catégorie...</option>
                  {Array.isArray(categories) && categories.map((category) => (
                    <option key={category._id} value={category._id}>{category.nom_categorie}</option>
                  ))}
                </Form.Control>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="prixSemence" style={{width: "144%"}}>
              <FloatingLabel label="Prix de la semence">
                <Form.Control
                  type="number"
                  placeholder="Prix de la semence"
                  value={prixSemence}
                  onChange={(e) => setPrixSemence(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="prixTerrain" style={{width: "144%"}}>
              <FloatingLabel label="Prix du terrain">
                <Form.Control
                  type="number"
                  placeholder="Prix du terrain"
                  value={prixTerrain}
                  onChange={(e) => setPrixTerrain(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-secondary" onClick={handleClose}>Fermer</Button>
          <Button className="btn" type="submit" form="form"> Ajouter </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;
