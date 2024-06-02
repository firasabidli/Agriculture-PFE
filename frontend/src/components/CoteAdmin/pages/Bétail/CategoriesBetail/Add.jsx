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
  const [races, setRaces] = useState(['']); 
  const [errors, setErrors] = useState({});
  const handleClose = () => {
    setShow(false);
    setNomCategorie('');
    setDescription('');
    setRaces(['']); 
  };

  const handleShow = () => setShow(true);
// validation du champ
  const validateForm = () => {
    const newErrors = {};

    if (!nom_categorieBetail.trim()) {
      newErrors.nom_categorieBetail = "Le nom de catégorie Bétail est requis";
    } else if (nom_categorieBetail.length < 4) {
      newErrors.nom_categorieBetail = "La taille de nom de catégorie Bétail doit être supérieure ou égale à 4";
    } else if (/\d/.test(nom_categorieBetail)) {
      newErrors.nom_categorieBetail = "Le nom de catégorie Bétail ne doit pas contenir de chiffres";
    }

    if (!description.trim()) {
      newErrors.description = 'La description est requise';
    } else if (description.length < 6) {
      newErrors.description = 'La description doit être supérieure ou égale à 6';
    } else if (/\d/.test(description)) {
      newErrors.description = 'La description ne doit pas contenir de chiffres';
    }

    races.forEach((race, index) => {
      if (!race.trim()) {
        newErrors[`race_${index}`] = `La race ${index + 1} est requise`;
      } else if (race.length < 3) {
        newErrors[`race_${index}`] = `La race ${index + 1} doit être supérieure ou égale à 3 caractères`;
      } else if (/\d/.test(race)) {
        newErrors[`race_${index}`] = `La race ${index + 1} ne doit pas contenir de chiffres`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // envoyer les données a backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
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

      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Catégorie</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} id="form">
        <Modal.Body className='w-100'>
          
            <Form.Group className="mb-3" controlId="nom_categorie">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Catégorie">
                <Form.Control
                  type="text"
                  placeholder="Nom Catégorie"
                  value={nom_categorieBetail}
                  onChange={(e) => setNomCategorie(e.target.value)}
                />
              </FloatingLabel>
              {errors.nom_categorieBetail && <div className="text-danger">{errors.nom_categorieBetail}</div>}
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
              {errors.description && <div className="text-danger">{errors.description}</div>}
            </Form.Group>

            <Form.Group controlId="races">
              {races.map((race, index) => (
                <>
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
                {errors[`race_${index}`] && <div className="text-danger">{errors[`race_${index}`]}</div>}
                </>
              ))}
              {races.length < 5 && (
                <Btn variant="secondary" onClick={handleAddRace}>Ajouter une autre Race</Btn>
              )}
            </Form.Group>
         
        </Modal.Body>
        <Modal.Footer>
          <Btn className="bg-secondary" onClick={handleClose}>Fermer</Btn>
          <Btn className="btn" type="submit" form="form">Ajouter</Btn>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Add;