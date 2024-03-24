import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";


function Update({ materielId, onUpdate }) {
  const [show, setShow] = useState(false);
  const [materiel, setMateriel] = useState([]);
  const [image, setImage] = useState(null);
 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (show) {
      fetchMateriel();
    }
  }, [show]);

  const fetchMateriel = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Materiel/${materielId}`);
      const data = response.data.data;
      setMateriel(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching materiel:', error);
    }
  };

  

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      
      formData.append('image_materiel', image);
      const result = await axios.put(`http://localhost:3001/Materiel/${materielId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      handleClose();
      alert(result.data.message);
      onUpdate();
    } catch (error) {
      console.error('Error updating materiel:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  return (
    <>
      
      <FaRegEdit type='button' className='icon-edit' onClick={handleShow} />
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Culture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {materiel && (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="name">
                <FloatingLabel controlId="floatingTextarea2" label="Nom du materiel:">
                  <Form.Control
                    type="text"
                    placeholder="Nom du materiel"
                    defaultValue={materiel.name}
                    name="name"
                  />
                </FloatingLabel>
              </Form.Group>
              

              <Form.Group className="mb-3" controlId="image_culture">
                <Form.Label>Image Culture:</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>

             

              <Form.Group className="mb-3" controlId="description">
            <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
            as="textarea"
            placeholder="Description"
            defaultValue={materiel.description}
            name="description"
          style={{ height: '100px' }}
        />
      </FloatingLabel>
            </Form.Group>

              




              <Button variant="primary" type="submit">
                Enregistrer
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Update;
