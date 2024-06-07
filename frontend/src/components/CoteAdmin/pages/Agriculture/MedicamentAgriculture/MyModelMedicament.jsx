import React, { useState, useEffect } from 'react';
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import './Medicament.css';
// import { Alert } from '@mui/material';

function MyModelMedicament(props) {
    const { editMode } = props;
    const [nomMedicament, setNomMedicament] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [errors, setErrors] = useState({});
    useEffect(() => {
        if (props.formData) {
            setNomMedicament(props.formData.nomMedicament || '');
            setDescription(props.formData.description || '');
            setImage(props.formData.image || '');
        }
       
    }, [props.formData]);

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };
    const validateForm = () => {
        const newErrors = {};
    
        if (!nomMedicament.trim()) {
          newErrors.nomMedicament = "Le nom Engrais est requis";
        }
        if (nomMedicament.length<4) {
          newErrors.nomMedicament = "La taille du nom Engrais doit etre superieur ou égale à 4";
        }
        if (/\d/.test(nomMedicament))  {
          newErrors.nomMedicament = "Le nom de Engrais ne doit pas contenir de chiffres";
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
       
       
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
          }
        try {
            const formData = new FormData();
            formData.append('nomMedicament', nomMedicament);
            formData.append('description', description);
         
            formData.append('image', newImage || image);
            if (props.formData) {
                // Modifier
                console.log(formData)
                // await axios.put(`http://localhost:3001/MedicamentCulture/UpdateMedicament/${props.formData._id}`, { nomMedicament, description, image });
                     await axios.put(`http://localhost:3001/MedicamentCulture/UpdateMedicament/${props.formData._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });
            } else {
                // Ajouter
                await axios.post('http://localhost:3001/MedicamentCulture/AjouterMedicament', formData);
                alert('Engrais ajouté avec succès');
            }

            setNomMedicament('');
            setDescription('');
            setImage(null);
            setNewImage(null);
            props.onHide();
            props.fetchData();
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            console.log(error.response.data.error);
            alert(error.response.data.error);
        }
    };

    return (
        <Modal {...props} className='modal-lg' aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {props.editMode ? 'Modifier données' : 'Ajouter données'}
            </Modal.Title>

            </Modal.Header>
            <Form  id="form">
            <Modal.Body className='w-100'>
            <Form.Group className="mb-3" controlId="name">
              <FloatingLabel controlId="floatingTextarea2" label="Nom d'Engrais :">
                <Form.Control
                  type="text"
                  placeholder="Nom d'Engrais"
                  id="nomMedicament" value={nomMedicament} onChange={(e) => setNomMedicament(e.target.value)}  required
                />
              </FloatingLabel>
              {errors.nomMedicament && <div className="text-danger">{errors.nomMedicament}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
            <FloatingLabel controlId="floatingTextarea2" label="Description">
            <Form.Control
            as="textarea"
            placeholder="Description"
            value={description} style={{ height: '100px' }} onChange={(e) => setDescription(e.target.value)} className="form-textarea" required
        />
      </FloatingLabel>
      {errors.description && <div className="text-danger">{errors.description}</div>}
            </Form.Group>
            {image && <img src={image} alt="" className="current-image mb-3" />} 

            <Form.Group className="mb-3" controlId="image">
              <FloatingLabel controlId="floatingTextarea2" label="Image :">
                <Form.Control
                  type="file"
                 
                  accept="image/*"
                  id="image"
                  onChange={handleImageChange}
                />
              </FloatingLabel>
            </Form.Group>
                    
               
            </Modal.Body>
            <Modal.Footer>
                <Btn className="bg-secondary" onClick={props.onHide}>Fermer</Btn>
                <Btn className="btn" type="submit" form="form" onClick={handleSubmit}>{editMode ? 'Modifier' : 'Ajouter'} </Btn>
            </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default MyModelMedicament;
