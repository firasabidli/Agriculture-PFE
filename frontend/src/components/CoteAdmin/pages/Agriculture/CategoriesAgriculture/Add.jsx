import React, { useState, useEffect } from 'react';
import Btn from 'react-bootstrap/Button';
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FcPlus } from "react-icons/fc";

function Add({ onCreate }) {
  const [show, setShow] = useState(false);
  const [nom_categorie, setNomCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState({});
  const [selectedStocks, setSelectedStocks] = useState({});
  const [selectedMedicaments, setSelectedMedicaments] = useState({});
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setNomCategorie('');
    setDescription('');
    setSelectedMaterials({});
    setSelectedStocks({});
    setSelectedMedicaments({});
    setErrors({});
  };

  const handleShow = () => setShow(true);
//validation
  const validateForm = () => {
    const newErrors = {};

    if (!nom_categorie.trim()) {
      newErrors.nom_categorie = 'Le nom de la catégorie est requis';
    }
    if (nom_categorie.length<4) {
      newErrors.nom_categorie = 'La taille du nom de la catégorie doit etre superieur ou égale à 4';
    }
    if (/\d/.test(nom_categorie))  {
      newErrors.nom_categorie = 'Le nom de la catégorie ne doit pas contenir de chiffres';
    }
    if (!description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (description.length<6) {
      newErrors.description = 'La taille du la description doit etre superieur ou égale à 6';
    }
    if (/\d/.test(description))  {
      newErrors.description = 'La description ne doit pas contenir de chiffres';
    }
    if (Object.keys(selectedMaterials).length === 0) {
      newErrors.materials = 'Au moins un équipement doit être sélectionné';
    }
    if (Object.keys(selectedStocks).length === 0) {
      newErrors.stocks = 'Au moins une méthode de stockage doit être sélectionnée';
    }
    if (Object.keys(selectedMedicaments).length === 0) {
      newErrors.medicaments = 'Au moins un engrais doit être sélectionné';
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
      const response = await axios.post('http://localhost:3001/Categorie', {
        nom_categorie,
        description,
        Equipements: Object.keys(selectedMaterials),
        MethodeStockage: Object.keys(selectedStocks),
        Engrais: Object.keys(selectedMedicaments),
      });

      if (response.data.success) {
        handleClose(); 
        alert(response.data.message);
        onCreate(); 
      }
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie', error);
    }
  };

  useEffect(() => {
    fetchMaterials();
    fetchStocks();
    fetchMedicaments();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Materiel");
      setMaterials(response.data.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/MethodeStock/ListStock");
      setStocks(response.data);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const fetchMedicaments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/MedicamentCulture/ListMedicament");
      setMedicaments(response.data);
    } catch (error) {
      console.error("Error fetching medicaments:", error);
    }
  };

  const handleMaterialChange = (e) => {
    const { id, checked } = e.target;
    setSelectedMaterials({ ...selectedMaterials, [id]: checked });
  };

  const handleStockChange = (e) => {
    const { id, checked } = e.target;
    setSelectedStocks({ ...selectedStocks, [id]: checked });
  };

  const handleMedicamentChange = (e) => {
    const { id, checked } = e.target;
    setSelectedMedicaments({ ...selectedMedicaments, [id]: checked });
  };

  return (
    <>
      <Button className='btn-plus' onClick={handleShow}>
        <FcPlus className='icon-plus'/>
        <span className='btn-title'>Ajouter</span>
      </Button>

      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Categorie</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} id="form">
          <Modal.Body className='w-100'>
            <Form.Group className="mb-3" controlId="nom_categorie">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Categorie">
                <Form.Control
                  type="text"
                  placeholder="Nom Categorie"
                  value={nom_categorie}
                  onChange={(e) => setNomCategorie(e.target.value)}
                />
              </FloatingLabel>
              {errors.nom_categorie && <div className="text-danger">{errors.nom_categorie}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Laissez une description ici"
                  style={{ height: '100px' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
              {errors.description && <div className="text-danger">{errors.description}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="materials">
              <Form.Label>Equipements</Form.Label>
              {materials && materials.map(material => (
                <Form.Check
                  key={material._id}
                  type="checkbox"
                  id={material._id}
                  label={material.nom}
                  checked={selectedMaterials[material._id]}
                  onChange={handleMaterialChange}
                />
              ))}
              {errors.materials && <div className="text-danger">{errors.materials}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="stocks">
              <Form.Label>Methode du Stockage</Form.Label>
              {stocks && stocks.map(stock => (
                <Form.Check
                  key={stock._id}
                  type="checkbox"
                  id={stock._id}
                  label={stock.title}
                  checked={selectedStocks[stock._id]}
                  onChange={handleStockChange}
                />
              ))}
              {errors.stocks && <div className="text-danger">{errors.stocks}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="engrais">
              <Form.Label>Engrais Agricole</Form.Label>
              {medicaments && medicaments.map(medicament => (
                <Form.Check
                  key={medicament._id}
                  type="checkbox"
                  id={medicament._id}
                  label={medicament.nomMedicament}
                  checked={selectedMedicaments[medicament._id]}
                  onChange={handleMedicamentChange}
                />
              ))}
              {errors.medicaments && <div className="text-danger">{errors.medicaments}</div>}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Btn className="bg-secondary" onClick={handleClose}>Fermer</Btn>
            <Btn className="btn" type="submit"> Ajouter </Btn>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Add;
