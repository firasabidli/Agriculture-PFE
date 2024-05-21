import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";

function Update({ categorieId, nomCategorie, Description, onUpdate }) {
  const [show, setShow] = useState(false);
  const [nom_categorie, setNomCategorie] = useState(nomCategorie);
  const [description, setDescription] = useState(Description);
  const [materials, setMaterials] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [selectedMedicaments, setSelectedMedicaments] = useState([]);
  const [errors, setErrors] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Categorie/${categorieId}`);
      const data = response.data.data;
     
    
      setSelectedMaterials(data.Equipements.map(material => material._id));
      setSelectedStocks(data.MethodeStockage.map(stock => stock._id));
      setSelectedMedicaments(data.Engrais.map(medicament => medicament._id));
    } catch (error) {
      console.error('Error fetching culture:', error);
    }
  };
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
      console.error("Error fetching stocks:", error);
    }
  };
  useEffect(() => {
    
    
    fetchCategories();
    fetchMaterials();
    fetchStocks();
    fetchMedicaments();
 
}, []);

  const handleMaterialChange = (e, materialId) => {
    const isChecked = e.target.checked;
    setSelectedMaterials(prevSelectedMaterials => {
      if (isChecked) {
        return [...prevSelectedMaterials, materialId];
      } else {
        return prevSelectedMaterials.filter(id => id !== materialId);
      }
    });
  };
  
  const handleStockChange = (e, stockId) => {
    const isChecked = e.target.checked;
    setSelectedStocks(prevSelectedStocks => {
      if (isChecked) {
        return [...prevSelectedStocks, stockId];
      } else {
        return prevSelectedStocks.filter(id => id !== stockId);
      }
    });
  };

  const handleMedicamentChange = (e, medicamentId) => {
    const isChecked = e.target.checked;
    setSelectedMedicaments(prevSelectedMedicaments => {
      if (isChecked) {
        return [...prevSelectedMedicaments, medicamentId];
      } else {
        return prevSelectedMedicaments.filter(id => id !== medicamentId);
      }
    });
  };
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
      const response = await axios.put(`http://localhost:3001/Categorie/${categorieId}`, {
        nom_categorie,
        description,
        Equipements: selectedMaterials,
        MethodeStockage: selectedStocks,
        Engrais: selectedMedicaments,
      });
  
      if (response.data.success) {
        handleClose();
        alert(response.data.message);
        onUpdate();
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du Categorie', error);
    }
  };
  
  

  return (
    <>
      
      <FaRegEdit type='button' className='icon-edit' onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Categorie</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} id="updateForm">
        <Modal.Body className='w-100'>
          
            <Form.Group className="mb-3" controlId="nom_categorie">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Categorie">
                <Form.Control
                name='nom_categorie'
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
                  name='description'
                  placeholder="Description"
                  style={{ height: '100px' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
              {errors.description && <div className="text-danger">{errors.description}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="materiels">
              <Form.Label>Equipements</Form.Label>
              {materials && materials.map(material => (
                <Form.Check
                  key={material._id}
                  type="checkbox"
                  id={material._id}
                  label={material.nom}
                  checked={selectedMaterials.includes(material._id)}
                  onChange={(e) => handleMaterialChange(e, material._id)}
                />
              ))}
               {errors.materials && <div className="text-danger">{errors.materials}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="stocks">
              <Form.Label>Metode de stockage</Form.Label>
              {stocks && stocks.map(stock => (
                <Form.Check
                  key={stock._id}
                  type="checkbox"
                  id={stock._id}
                  label={stock.title}
                  checked={selectedStocks.includes(stock._id)}
                  onChange={(e) => handleStockChange(e, stock._id)}
                />
              ))}
               {errors.stocks && <div className="text-danger">{errors.stocks}</div>}
            </Form.Group>


            <Form.Group className="mb-3" controlId="stocks">
              <Form.Label>Engrais agricole</Form.Label>
              {medicaments && medicaments.map(medicament => (
                <Form.Check
                  key={medicament._id}
                  type="checkbox"
                  id={medicament._id}
                  label={medicament.nomMedicament}
                  checked={selectedMedicaments.includes(medicament._id)}
                  onChange={(e) => handleMedicamentChange(e, medicament._id)}
                />
              ))}
               {errors.medicaments && <div className="text-danger">{errors.medicaments}</div>}
            </Form.Group>

            
          
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-secondary" onClick={handleClose}>Fermer</Button>
          <Button className="btn" type="submit" form="updateForm"> Modifier </Button>
        </Modal.Footer>
        </Form>
      </Modal>
      
    </>
  );
}

export default Update;