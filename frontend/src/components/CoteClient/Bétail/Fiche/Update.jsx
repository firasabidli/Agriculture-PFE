import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const Update = ({ animalId, onClose }) => {
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/FicheAnimal/${animalId}`);
        setAnimal(response.data.animal);
      } catch (error) {
        console.error('Error fetching animal:', error);
      }
    };

    if (animalId) {
      fetchAnimal();
    }
  }, [animalId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      console.log(formData.get('IdantifiantsAnimal'));
      await axios.put(`http://localhost:3001/FicheAnimal/${animalId}`, formData);
      onClose();
    } catch (error) {
      console.error('Error updating animal:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimal({ ...animal, [name]: value });
  };

  return (
    <Modal show={!!animalId} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {animal && (
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="IdantifiantsAnimal">
              <FloatingLabel controlId="floatingInput" label="Identifiant Animal">
                <Form.Control
                  type="text"
                  defaultValue={animal.IdantifiantsAnimal}
                  name="IdantifiantsAnimal"
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="Race">
              <FloatingLabel controlId="floatingInput" label="Race">
                <Form.Control
                  type="text"
                  defaultValue={animal.Race}
                  name="Race"
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="date_naissance">
              <FloatingLabel controlId="floatingInput" label="Date de Naissance">
                <Form.Control
                  type="date"
                  defaultValue={animal.date_naissance}
                  name="date_naissance"
                  onChange={handleInputChange}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="categorie">
              <FloatingLabel controlId="floatingSelect" label="Catégorie">
                <Form.Select
                  name="categorie"
                  defaultValue={animal.categorie}
                  onChange={handleInputChange}
                >
                  <option value="bovin">Bovin</option>
                  <option value="ovin">Ovin</option>
                  <option value="volailles">Volailles</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="subCategorieBetail">
              <FloatingLabel controlId="floatingSelect" label="Sous-catégorie">
                <Form.Select
                  name="subCategorieBetail"
                  defaultValue={animal.subCategorieBetail}
                  onChange={handleInputChange}
                >
                  <option value="Vache">Vache</option>
                  <option value="Mouton">Mouton</option>
                  <option value="Chevre">Chèvre</option>
                  <option value="Volaille">Volaille</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="sexe">
              <Form.Label>Sélectionnez le sexe :</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="masculin"
                  name="sexe"
                  value="masculin"
                  defaultChecked={animal.sexe === 'masculin'}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  label="féminin"
                  name="sexe"
                  value="féminin"
                  defaultChecked={animal.sexe === 'féminin'}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Group>
            <Button className="btn" type="submit">Modifier</Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Update;
