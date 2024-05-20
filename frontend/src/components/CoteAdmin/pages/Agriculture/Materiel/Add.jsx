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
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setName('');
    setDescription('');
    setImageMateriel(null);
  };

  const handleShow = () => setShow(true);
  const validateForm = () => {
    const newErrors = {};

    if (!nom.trim()) {
      newErrors.nom_equipement = "Le nom de l'équipement est requis";
    }
    if (nom.length<4) {
      newErrors.nom_equipement = "La taille du nom de l'équipement doit etre superieur ou égale à 4";
    }
    if (/\d/.test(nom))  {
      newErrors.nom_equipement = "Le nom de l'équipement ne doit pas contenir de chiffres";
    }
    if (!description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (description.length<6) {
      newErrors.description = 'La taille du la description doit etre superieur ou égale à 6';
    }
    if (/\d/.test(description))  {
      newErrors.description = 'La description ne doit pas contenir de chiffres';
    }
    if (image_materiel===null)  {
      newErrors.image_materiel = "L'image est requise";
    } 
   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
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
        alert("Equipement ajouter avec succé");
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
      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter Equipement</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submit} id="form">
        <Modal.Body className='w-100'>
       
          
            <Form.Group className="mb-3" controlId="name">
              <FloatingLabel controlId="floatingTextarea2" label="Nom du Equipement:">
                <Form.Control
                  type="text"
                  placeholder="Nom du Equipement:"
                  value={nom}
                  onChange={(e) => setName(e.target.value)}
                />
              </FloatingLabel>
              {errors.nom_equipement && <div className="text-danger">{errors.nom_equipement}</div>}
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
      {errors.description && <div className="text-danger">{errors.description}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="image">
              <FloatingLabel controlId="floatingTextarea2" label="Image Equipement:">
                <Form.Control
                  type="file"
                  onChange={onInputChange}
                  accept="image/*"
                />
              </FloatingLabel>
              {errors.image_materiel && <div className="text-danger">{errors.image_materiel}</div>}
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