import React, { useState } from 'react';
import Btn from 'react-bootstrap/Button';
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FcPlus } from "react-icons/fc";

function Add({ onCreate }) {
  const [show, setShow] = useState(false);
  const [nom_categorieBetail, setNomCategorie] = useState('');
  const [description, setDescription] = useState('');
  const [races, setRaces] = useState(['']); // Au moins un champ de race au début

  const handleClose = () => {
    setShow(false);
    setNomCategorie('');
    setDescription('');
    setRaces(['']); // Réinitialiser avec au moins un champ de race
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/CategorieBetail', {
        nom_categorieBetail,
        description,
        races: races.filter((race) => race.trim() !== '') // Filtrer les races vides
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

  const handleAddRace = () => {
    if (races.length < 5) {
      setRaces([...races, '']); // Ajouter un nouveau champ de race vide
    }
  };

  const handleRemoveRace = (index) => {
    const updatedRaces = [...races];
    updatedRaces.splice(index, 1); // Supprimer le champ de race à l'index spécifié
    setRaces(updatedRaces);
  };

  const handleRaceChange = (index, value) => {
    const updatedRaces = [...races];
    updatedRaces[index] = value;
    setRaces(updatedRaces);
  };

  return (
    <>
      <Button className='btn-plus' onClick={handleShow}>
        <FcPlus className='icon-plus'/>
        <span className='btn-title'>Ajouter</span>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="form">
            <Form.Group className="mb-3" controlId="nom_categorie">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Catégorie">
                <Form.Control
                  type="text"
                  placeholder="Nom Catégorie"
                  value={nom_categorieBetail}
                  onChange={(e) => setNomCategorie(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  style={{ height: '100px' }}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group controlId="races">
              {races.map((race, index) => (
                <div key={index} className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    placeholder={`Race ${index + 1}`}
                    value={race}
                    onChange={(e) => handleRaceChange(index, e.target.value)}
                  />
                  {index > 0 && ( // Afficher le bouton Supprimer seulement à partir du deuxième champ
                    <Btn variant="danger" onClick={() => handleRemoveRace(index)} className="ms-2">
                      Supprimer
                    </Btn>
                  )}
                </div>
              ))}
              {races.length < 5 && (
                <Btn variant="secondary" onClick={handleAddRace}>Ajouter une autre Race</Btn>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn className="bg-secondary" onClick={handleClose}>Fermer</Btn>
          <Btn className="btn" type="submit" form="form">Ajouter</Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;