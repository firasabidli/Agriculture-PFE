import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
function Update({ onUpdate, betailId }) {
  const [show, setShow] = useState(false);
  const [betail, setBetail] = useState([]);
 
  const [categories, setCategories] = useState([]);
  
  const [selectedCategorie, setSelectedCategorie] = useState('');
  
  const [image_betail, setImageBetail] = useState(null);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchBetail = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Betail/${betailId}`);
      const data = response.data.data;
      setBetail(data);
     
      setSelectedCategorie(data.categorie_betail._id);
     
    } catch (error) {
      console.error('Error fetching betail:', error);
    }
  };



  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/CategorieBetail");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

 


 
  useEffect(() => {
    
      fetchBetail();
      fetchCategories();
      
  }, []);


  
  
 
  



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      
      formData.append('categorie_betail', selectedCategorie);
     
     
      formData.append('image_betail', image_betail);
      const result = await axios.put(`http://localhost:3001/Betail/${betailId}`,
       formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      handleClose();
      alert(result.data.message);
      onUpdate();
      
    } catch (error) {
      console.error('Error updating betail:', error);
    }
  };

  const handleImageChange = (e) => {
    setImageBetail(e.target.files[0]);
  };


  return (
    <>
      <FaRegEdit type='button' className='icon-edit' onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Betail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {betail && (
            <Form onSubmit={handleSubmit} id="updateForm">
             <Form.Group className="mb-3" controlId="nom_betail">
                <FloatingLabel controlId="floatingTextarea2" label="Nom Betail:">
                  <Form.Control
                    type="text"
                    placeholder=""
                    defaultValue={betail.nom_betail}
                    name="nom_betail"
                  />
                </FloatingLabel>
              </Form.Group>


              

              <Form.Group className="mb-3" controlId="date_naissance">
                <FloatingLabel controlId="floatingTextarea2" label="Date de Naissance">
                  <Form.Control
                    type='date'
                    placeholder="Date de Naissance"
                    defaultValue={betail.date_naissance}
                    name="date_naissance"
                  />
                </FloatingLabel>
              </Form.Group>

              

              <Form.Group className="mb-3" controlId="IdantifiantsAnimal">
                <FloatingLabel controlId="floatingTextarea2" label="Idantifiants Animale">
                  <Form.Control
                    type='text'
                    placeholder="Methode Irrigation"
                    defaultValue={betail.IdantifiantsAnimal}
                    name="IdantifiantsAnimal"
                  />
                </FloatingLabel>
              </Form.Group>




              <Form.Group className="mb-3" controlId="image_betail">
                <Form.Label>Image Betail:</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>

             

              <Form.Group className="mb-3" controlId="saison">
                <Form.Label>Sexe:</Form.Label>
                <Form.Control as="select" value={betail.sexe} name='sexe' id='sexe'>
                  <option value="">Sélectionnez une saison</option>
                  <option value="masculin"> masculin </option>
                  <option value="féminin"> féminin </option>
                 
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="categorie">
                <Form.Label>Catégorie:</Form.Label>
                <Form.Control as="select" value={selectedCategorie} onChange={(e) => setSelectedCategorie(e.target.value)}>
                  <option value="">Sélectionnez une catégorie</option>
                  {categories && categories.map(categorie => (
                    <option key={categorie._id} value={categorie._id}>{categorie.nom_categorieBetail}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              
              

            


           

              
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-secondary" onClick={handleClose}>Close</Button>
          <Button className="btn" type="submit" form="updateForm"> Submit </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Update;
