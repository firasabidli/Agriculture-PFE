import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const UpdateAnimal = ({ animalId, onClose }) => {
  const [formData, setFormData] = useState({
    IdantifiantsAnimal: '',
    Race: '',
    date_naissance: '',
    sexe: '',
    categorieBetail: '',
    subCategorieBetail: ''
  });

  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  useEffect(() => {
    const fetchAnimal = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/FicheAnimal/${animalId}`);
        const animalData = response.data.animal;

        setFormData({
          IdantifiantsAnimal: animalData.IdantifiantsAnimal,
          Race: animalData.Race,
          date_naissance: formatDate(animalData.date_naissance),
          sexe: animalData.sexe,
          categorieBetail: animalData.categorieBetail,
          subCategorieBetail: animalData.subCategorieBetail 
        });

        setSelectedCategory(animalData.categorieBetail);
        //handleCategoryChange({ target: { value: animalData.categorieBetail } });
        setSelectedSubcategory(animalData.subCategorieBetail);
      } catch (error) {
        console.error('Error fetching animal:', error);
      }
    };

    if (animalId) {
      fetchAnimal();
    }
  }, [animalId]);

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

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setFormData({ ...formData, categorieBetail: categoryId });
    if (categoryId === 'bovin') {
      setSubcategories(['Vache', 'Taureau']);
    } else if (categoryId === 'ovin') {
      setSubcategories(['Mouton', 'Chèvre']);
    } else if (categoryId === 'volailles') {
      setSubcategories(['Poulet', 'Dinde']);
    } else {
      setSubcategories([]);
    }

    setSelectedSubcategory('');
    //setFormData({ ...formData, subCategorieBetail: ''});
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3001/FicheAnimal/${animalId}`, formData);
      console.log('Update successful:', response.data);
      onClose();
    } catch (error) {
      console.error('Error updating animal:', error);
    }
  };

  return (
    <Modal show={!!animalId} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Animal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="IdantifiantsAnimal">
            <FloatingLabel controlId="floatingInput" label="Identifiant Animal">
              <Form.Control
                type="text"
                name="IdantifiantsAnimal"
                value={formData.IdantifiantsAnimal}
                onChange={handleInputChange}
                defaultValue={formData.IdantifiantsAnimal}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="Race">
            <FloatingLabel controlId="floatingInput" label="Race">
              <Form.Control
                type="text"
                name="Race"
                value={formData.Race}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="date_naissance">
            <FloatingLabel controlId="floatingInput" label="Date de Naissance">
              <Form.Control
                type="date"
                name="date_naissance"
                value={formData.date_naissance}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group controlId="sexe">
            <Form.Label>Sélectionnez le sexe :</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="Masculin"
                name="sexe"
                value="masculin"
                checked={formData.sexe === 'masculin'}
                onChange={handleInputChange}
              />
              <Form.Check
                type="radio"
                label="Féminin"
                name="sexe"
                value="féminin"
                checked={formData.sexe === 'féminin'}
                onChange={handleInputChange}
              />
            </div>
          </Form.Group>

          <Form.Group controlId="categorieBetail">
            <FloatingLabel controlId="floatingSelect" label="Catégorie Bétail">
              <Form.Select
                name="categorieBetail"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="bovin">Bovin</option>
                <option value="ovin">Ovin</option>
                <option value="volailles">Volailles</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>

          {subcategories.length > 0 && (
            <Form.Group controlId="subCategorieBetail">
              <Form.Label>Sous-catégorie Bétail :</Form.Label>
              <div>
                {subcategories.map((subcategory) => (
                  <Form.Check
                    key={subcategory}
                    type="radio"
                    label={subcategory}
                    name="subCategorieBetail"
                    value={subcategory}
                    checked={selectedSubcategory === subcategory}
                    onChange={(e) => setFormData({ ...formData, subCategorieBetail: e.target.value })}
                  />
                ))}
              </div>
            </Form.Group>
          )}

          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateAnimal;
