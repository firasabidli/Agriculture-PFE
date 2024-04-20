import React, { useState, useEffect } from 'react';
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';

function Update({ category, onUpdate }) {
  const [show, setShow] = useState(false);
  const [nom_categorieBetail, setNomCategorie] = useState(category.nom_categorieBetail);
  const [description, setDescription] = useState(category.description);
  const [races, setRaces] = useState(category.races);

  const handleClose = () => {
    setShow(false);
    setNomCategorie('');
    setDescription('');
    setRaces([]);
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/CategorieBetail/modifier/${category._id}`, {
        nom_categorieBetail,
        description,
        races: races.filter((race) => race.trim() !== '')
      });
      if (response.data.success) {
        handleClose();
        alert(response.data.message);
        onUpdate(); // Appeler la fonction onUpdate fournie par le parent
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie', error);
    }
  };

  const handleAddRace = () => {
    if (races.length < 5) {
      setRaces([...races, '']); // Ajouter un nouveau champ de course vide
    }
  };

  const handleRemoveRace = (index) => {
    const updatedRaces = [...races];
    updatedRaces.splice(index, 1); // Supprimer le champ de course à l'index spécifié
    setRaces(updatedRaces);
  };

  const handleRaceChange = (index, value) => {
    const updatedRaces = [...races];
    updatedRaces[index] = value;
    setRaces(updatedRaces);
  };

  return (
    <>
      <FaRegEdit type="button" className="icon-edit" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une Catégorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="form">
            <Form.Group className="mb-3" controlId="nom_categorie">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Catégorie">
                <Form.Control
                  type="text"
                  placeholder="Nom Catégorie"
                  defaultValue={nom_categorieBetail}
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
                  defaultValue={description}
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
                  {races.length > 1 && ( // Afficher le bouton "Supprimer" uniquement s'il y a plus d'un champ de course
                    <Btn
                      variant="danger"
                      onClick={() => handleRemoveRace(index)}
                      className="ms-2"
                    >
                      Supprimer
                    </Btn>
                  )}
                </div>
              ))}
              {races.length < 5 && (
                <Btn variant="secondary" onClick={handleAddRace}>
                  Ajouter une Race
                </Btn>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn variant="secondary" onClick={handleClose}>
            Annuler
          </Btn>
          <Btn variant="primary" type="submit" form="form">
            Enregistrer
          </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Update;