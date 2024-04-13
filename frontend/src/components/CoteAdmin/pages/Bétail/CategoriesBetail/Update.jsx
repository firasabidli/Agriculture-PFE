import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";

function Update({ categorieId, nomCategorie, Description, onUpdate }) {
  const [show, setShow] = useState(false);
  const [nom_categorieBetail, setNomCategorie] = useState(nomCategorie);
  const [description, setDescription] = useState(Description);
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/CategorieBetail/modifier/${categorieId}`, {
        nom_categorieBetail,
        description
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Categorie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="updateForm">
            <Form.Group className="mb-3" controlId="nom_categorieBetail">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Categorie">
                <Form.Control
                  type="text"
                  placeholder="Nom Categorie"
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
            
          </Form>
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