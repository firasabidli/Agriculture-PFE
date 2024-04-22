import React, { useState } from 'react';
import { Button } from '@mui/material';
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FcPlus } from "react-icons/fc";
function Add({onCreate}) {
  const [show, setShow] = useState(false);
  const [nom, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image_materiel, setImageMateriel] = useState(null);

  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
    setImageMateriel(null);
  };

  const handleShow = () => setShow(true);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    
    formData.append("image_materiel", image_materiel);
    try {
      const result = await axios.post(
        "http://localhost:3001/materiel/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      
      console.log(result);
      // Refresh Equipement after successful upload
      if (result.data.success) {
       
        handleClose(); 
        alert(result.data.message);
        onCreate();
      }
    } catch (error) {
      console.error("Error uploading Equipement:", error);
    }
  };
  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImageMateriel(e.target.files[0]);
  };


  return (
    <>
      
      <Button className='btn-plus'onClick={handleShow}>
		<FcPlus className='icon-plus'/>
		<span className='btn-title'>Ajouter</span>
	    </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Equipement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
          <Form onSubmit={submit} id="form">
            <Form.Group className="mb-3" controlId="name">
              <FloatingLabel controlId="floatingTextarea2" label="Nom du Equipement:">
                <Form.Control
                  type="text"
                  placeholder="Nom du Equipement:"
                  value={nom}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
           
            <Form.Group className="mb-3" controlId="description">

            <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
            as="textarea"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          style={{ height: '100px' }}
        />
      </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <FloatingLabel controlId="floatingTextarea2" label="Image Equipement:">
                <Form.Control
                  type="file"
                  onChange={onInputChange}
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