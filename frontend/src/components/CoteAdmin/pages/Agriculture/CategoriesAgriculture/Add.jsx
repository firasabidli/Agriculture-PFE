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
  const [nom_categorie, setNomCategorie] = useState('');
  const [description, setDescription] = useState('');


  const handleClose = () => {
    setShow(false);
    setNomCategorie('');
    setDescription('');
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValidnom = /^[a-zA-Z\s]+$/.test(nom_categorie);
      const isValiddescription= /^[a-zA-Z\s]+$/.test(description);

    if (!isValidnom || !isValiddescription) {
      alert('Le champ text ne doit contenir que des lettres, des chiffres et des espaces.');
      return;
    }
      const response = await axios.post('http://localhost:3001/Categorie', {
        nom_categorie,
        description
      });
      if (response.data.success) {
        
        handleClose(); 
        alert(response.data.message);
        
        onCreate(); 
      }
    } catch (error) {
      console.error('Erreur lors de la création du Categorie', error);
    }
  };

  return (
    <>
      <Button className='btn-plus'onClick={handleShow}>
		<FcPlus className='icon-plus'/>
		<span className='btn-title'>Ajouter</span>
	    </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une Categorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="form">
            <Form.Group className="mb-3" controlId="nom_categorie">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Categorie">
                <Form.Control
                  type="text"
                  placeholder="Nom Categorie"
                  value={nom_categorie}
                  onChange={(e) => setNomCategorie(e.target.value)}
                />
              </FloatingLabel>
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
            </Form.Group>
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn className="bg-secondary" onClick={handleClose}>Fermer</Btn>
          <Btn className="btn" type="submit" form="form"> Ajouter </Btn>
        </Modal.Footer>
      </Modal>
   
    </>
  );
}

export default Add;