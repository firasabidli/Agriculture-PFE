import React, { useState } from 'react';
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';

function Add({ onCreate }) {
  const [show, setShow] = useState(false);
  const [IdantifiantsAnimal, setIdantifiantsAnimal] = useState('');
  const [Race, setRace] = useState('');
  const [date_naissance, setDateNaissance] = useState('');
  const [sexe, setSexe] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    // Définir les sous-catégories en fonction de la catégorie sélectionnée
    if (categoryId === 'bovin') {
      setSubcategories(['Vache', 'Taureau']);
    } else if (categoryId === 'ovin') {
      setSubcategories(['Mouton', 'Chévre']);
    } else if (categoryId === 'volailles') {
      setSubcategories(['Poulet', 'Dinde']);
    } else {
      setSubcategories([]);
    }

    // Réinitialiser la sous-catégorie sélectionnée lors du changement de catégorie
    setSelectedSubcategory('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authToken = localStorage.getItem('authToken');
  

    const formData = {
      IdantifiantsAnimal,
      Race,
      date_naissance,
      sexe,
      categorieBetail: selectedCategory,
      subCategorieBetail: selectedSubcategory,
    };

    try {
      const response = await axios.post('http://localhost:3001/FicheAnimal/', formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setIdantifiantsAnimal('');
        setRace('');
        setDateNaissance('');
        setSexe('');
        setSelectedCategory('');
        setSelectedSubcategory('');
        handleClose();
        alert('Animal ajouté avec succès !');
        onCreate();
      }
      else{
        alert("Animal est deja existe")
      }
     
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  return (
    <>
      <p className="btn btn-lg btn-block btn-success rounded-0 py-4 mb-3 bg-op-6 roboto-bold eviteHover"  style={{background:"darkgreen", color:"white", border:"1px darkgreen"}}  onClick={handleShow}>
        Ajouter Animal
      </p>
      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un animal</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} id="form">
        <Modal.Body className='w-100'>
          
            <Form.Group className="mb-3" controlId="IdantifiantsAnimal"   >
              <FloatingLabel label="Numéro Identifiant">
                <Form.Control
                  type="text"
                  placeholder="Numéro Identifiant"
                  value={IdantifiantsAnimal}
                onChange={(e) => setIdantifiantsAnimal(e.target.value)}
                
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Race"  >
              <FloatingLabel label="Race">
                <Form.Control
                  type="text"
                  placeholder="Race"
                  value={Race}
                  onChange={(e) => setRace(e.target.value)}
                  ></Form.Control>
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="date_naissance"  >
              <FloatingLabel label="Date naissance">
                <Form.Control
                  type="date"
                  placeholder="Date naissance"
                  value={date_naissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="sexe"  >
              <Form.Label>Sexe</Form.Label>
              <div>
                <Form.Check
                  type="radio"
                  label="Féminin"
                  name="sexe"
                  value="féminin"
                  checked={sexe === 'féminin'}
                  onChange={() => setSexe('féminin')}
                />
                <Form.Check
                  type="radio"
                  label="Masculin"
                  name="sexe"
                  value="masculin"
                  checked={sexe === 'masculin'}
                  onChange={() => setSexe('masculin')}
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-3" controlId="categorie"  >
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" value={selectedCategory}
                onChange={handleCategoryChange}>
                <option value="">Choisissez une catégorie...</option>
                <option value="bovin">Bovin</option>
                <option value="ovin">Ovin</option>
                <option value="volailles">volailles</option>
              </Form.Control>
              {selectedCategory && (
                <div>
                  <h3>Sous-catégories :</h3>
                  {subcategories.map((sub) => (
                    <Form.Check
                    key={sub}
                    type="radio"
                    label={sub}
                    name="subcategory"
                    value={sub}
                    checked={selectedSubcategory === sub}
                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                    />
                  ))}
                  </div>
              )}
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Btn className="bg-secondary" onClick={handleClose}>Fermer</Btn>
          <Btn className="btn" type="submit" form="form"> Ajouter </Btn>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Add;
