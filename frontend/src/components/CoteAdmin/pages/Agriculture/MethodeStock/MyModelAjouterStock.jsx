import React, { useState, useEffect } from 'react';
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import './Stock.css';

function MyModelAjouterStock(props) {
    const { editMode } = props;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //const [image_MethodStock, setImage_MethodStock] = useState('');
    const [image_MethodStock, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    const [errors, setErrors] = useState({});
    // Effet pour préremplir les champs lors de la modification
    useEffect(() => {
        // Vérifie si des données de formulaire ont été passées en tant que props
        if (props.formData) {
            // Préremplit les champs avec les données existantes
            setTitle(props.formData.title || '');
            setDescription(props.formData.description || '');
            setImage(props.formData.image_MethodStock || '');
        }
    }, [props.formData]);
    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };
    const validateForm = () => {
        const newErrors = {};
    
        if (!title.trim()) {
          newErrors.title = "Le titre de la méthode de stockage est requis";
        }
        if (title.length<4) {
          newErrors.title = "La taille de titre de la méthode de stockage doit etre superieur ou égale à 4";
        }
        if (/\d/.test(title))  {
          newErrors.title = "Le titre de la méthode de stockage ne doit pas contenir de chiffres";
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
    // Fonction pour soumettre le formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) {
            return;
          }
        try {
            if(editMode === false){
                if (!newImage || !newImage.type.startsWith('image')) {
                    alert("Veuillez sélectionner une image valide.");
                    return;
                }
            }
            
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            
            formData.append('image_MethodStock', newImage || image_MethodStock);
            if (props.formData) {
                // Modifier
                await axios.put(`http://localhost:3001/MethodeStock/UpdateStock/${props.formData._id}`,formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });
                alert("Stock Modifier avec succès");
            } else {
                // Ajouter
                await axios.post('http://localhost:3001/MethodeStock/AjouterStock', formData);
                alert('Stock ajouté avec succès');
            }
            // Réinitialiser les champs après la soumission
            setTitle('');
            setDescription('');
            //setImage_MethodStock('');
            setImage(null);
            setNewImage(null);
            props.onHide();
            props.fetchData();
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            alert(error.response.data.error);
        }
    };
    

    return (
        <Modal
            {...props}
            className='modal-lg'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.editMode ? 'Modifier données' : 'Ajouter données'}
                </Modal.Title>
            </Modal.Header>
            <Form  id="form">
            <Modal.Body className='w-100'>
                
            <Form.Group className="mb-3" controlId="name">
              <FloatingLabel controlId="floatingTextarea2" label="Titre :">
                <Form.Control
                  type="text"
                  placeholder="Nom d'Engrais"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-input"
                  required
                />
              </FloatingLabel>
              {errors.title && <div className="text-danger">{errors.title}</div>}
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

            {image_MethodStock && <img src={image_MethodStock} alt="Image MéthodeStockage" className="current-image mb-3" />} 

            <Form.Group className="mb-3" controlId="image">
              <FloatingLabel controlId="floatingTextarea2" label="Image :">
                <Form.Control
                  type="file"
                  id="image" accept="image/*" onChange={handleImageChange} 
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

export default MyModelAjouterStock;
