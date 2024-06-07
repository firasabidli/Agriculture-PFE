import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";

function Update({ materielId, onUpdate, imageM }) {
  const [show, setShow] = useState(false);
  const [materiel, setMateriel] = useState({});
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setMateriel({});
    setImage(null);
    setErrors({});
  };
  
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      fetchMateriel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const fetchMateriel = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Materiel/${materielId}`);
      const data = response.data.data;
      setMateriel(data);
    } catch (error) {
      console.error('Error fetching materiel:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!materiel.nom?.trim()) {
      newErrors.nom_equipement = "Le nom de l'équipement est requis";
    } else if (materiel.nom.length < 4) {
      newErrors.nom_equipement = "La taille du nom de l'équipement doit être supérieure ou égale à 4";
    } else if (/\d/.test(materiel.nom)) {
      newErrors.nom_equipement = "Le nom de l'équipement ne doit pas contenir de chiffres";
    }

    if (!materiel.description?.trim()) {
      newErrors.description = 'La description est requise';
    } else if (materiel.description.length < 6) {
      newErrors.description = 'La taille de la description doit être supérieure ou égale à 6';
    } else if (/\d/.test(materiel.description)) {
      newErrors.description = 'La description ne doit pas contenir de chiffres';
    }

   

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('nom', materiel.nom);
    formData.append('description', materiel.description);
    if (image) {
      formData.append('image_materiel', image);
    }

    try {
      const result = await axios.put(`http://localhost:3001/Materiel/${materielId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (result.data.success) {
        handleClose();
        alert(result.data.message);
        onUpdate();
      }
    } catch (error) {
      console.error('Error updating materiel:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMateriel({ ...materiel, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <>
      <FaRegEdit type='button' className='icon-edit' style={{color:"#495057"}} onClick={handleShow} />
      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Equipement</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body className='w-100'>
            {materiel && (
              <div>
                <Form.Group className="mb-3" controlId="name">
                  <FloatingLabel controlId="floatingTextarea2" label="Nom du Equipement:">
                    <Form.Control
                      type="text"
                      placeholder="Nom du Equipement"
                      name="nom"
                      value={materiel.nom || ''}
                      onChange={handleInputChange}
                    />
                  </FloatingLabel>
                  {errors.nom_equipement && <div className="text-danger">{errors.nom_equipement}</div>}
                </Form.Group>

               

                <Form.Group className="mb-3" controlId="description">
                  <FloatingLabel controlId="floatingTextarea2" label="Description">
                    <Form.Control
                      as="textarea"
                      placeholder="Description"
                      name="description"
                      value={materiel.description || ''}
                      onChange={handleInputChange}
                      style={{ height: '100px' }}
                    />
                  </FloatingLabel>
                  {errors.description && <div className="text-danger">{errors.description}</div>}
                </Form.Group>
               
                 <img src={imageM}  style={{width:'120px',textAlign:'left'}} className="mb-3" alt='Materiel'/>
                                                                   
                <Form.Group className="mb-3" controlId="image_Equipement">
                  <Form.Label>Image Equipement:</Form.Label>
                  <Form.Control type="file"  accept="image/*" onChange={handleImageChange} />
                 
                </Form.Group>
                <Button variant="primary" type="submit">
                  Enregistrer
                </Button>
              </div>
            )}
          </Modal.Body>
        </Form>
      </Modal>
    </>
  );
}

export default Update;
