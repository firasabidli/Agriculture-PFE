import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const UpdateAgriculture = ({ cultureId, onClose }) => {
  const [formData, setFormData] = useState({
    titre: '',
    surface: '',
    description: '',
    localisation: '',
    quantiteSemences: '',
    datePlantation: '',
    prixSemence: '',
    prixTerrain: ''
  });

  useEffect(() => {
    console.log(cultureId)
    const fetchAgriculture = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/ListeAgriculture/${cultureId}`);
        const agricultureData = response.data.cultures;
        console.log(agricultureData)

        setFormData({
          titre: agricultureData.titre,
          surface: agricultureData.surface,
          description: agricultureData.description,
          localisation: agricultureData.localisation,
          quantiteSemences: agricultureData.quantiteSemences,
          datePlantation: formatDate(agricultureData.datePlantation),
          prixSemence: agricultureData.prixSemence,
          prixTerrain: agricultureData.prixTerrain
        });
      } catch (error) {
        console.error('Error fetching agriculture:', error);
      }
    };

    if (cultureId) {
      fetchAgriculture();
    }
  }, [cultureId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3001/ListeAgriculture/${cultureId}`, formData);
      console.log('Update successful:', response.data);
      alert('modifier avec succés')
      onClose();
    } catch (error) {
      console.error('Error updating agriculture:', error);
    }
  };

  return (
    <Modal show={!!cultureId} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Agriculture</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="titre" style={{width:"116%"}} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Titre" style={{fontWeight:"bold"}}>
              <Form.Control
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleInputChange}
                defaultValue={formData.titre}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="surface" style={{width:"116%"}} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Surface" style={{fontWeight:"bold"}}>
              <Form.Control
                type="number"
                name="surface"
                value={formData.surface}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="description" style={{width:"116%"}} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Description" style={{fontWeight:"bold"}}>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="localisation" style={{width:"116%"}} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Localisation" style={{fontWeight:"bold"}}>
              <Form.Control
                type="text"
                name="localisation"
                value={formData.localisation}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="quantiteSemences" style={{width:"116%"}} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Quantité de semences" style={{fontWeight:"bold"}}>
              <Form.Control
                type="number"
                name="quantiteSemences"
                value={formData.quantiteSemences}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="datePlantation" style={{width:"116%"}} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Date de plantation" style={{fontWeight:"bold"}}>
              <Form.Control
                type="date"
                name="datePlantation"
                value={formData.datePlantation}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="prixSemence" style={{width:"116%"}} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Prix de la semence" style={{fontWeight:"bold"}}>
              <Form.Control
                type="number"
                name="prixSemence"
                value={formData.prixSemence}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="prixTerrain" style={{width:"116%"}} className="mb-3">
            <FloatingLabel controlId="floatingInput" label="Prix du terrain" style={{fontWeight:"bold"}}>
              <Form.Control
                type="number"
                name="prixTerrain"
                value={formData.prixTerrain}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateAgriculture;
