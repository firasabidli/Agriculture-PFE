import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './Stock.css';

function MyModelAjouterStock(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    //const [image_MethodStock, setImage_MethodStock] = useState('');
    const [image_MethodStock, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    // Effet pour préremplir les champs lors de la modification
    useEffect(() => {
        // Vérifie si des données de formulaire ont été passées en tant que props
        if (props.formData) {
            // Préremplit les champs avec les données existantes
            setTitle(props.formData.title || '');
            setDescription(props.formData.description || '');
            setImage(props.formData.image || '');
        }
    }, [props.formData]);
    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };
    // Fonction pour soumettre le formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!newImage || !newImage.type.startsWith('image')) {
                alert("Veuillez sélectionner une image valide.");
                return;
            }
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            const isValidnom = /^[a-zA-Z\s]+$/.test(title);
            const isValiddescription= /^[a-zA-Z\s]+$/.test(description);
      
          if (!isValidnom || !isValiddescription) {
            alert('Le champ text ne doit contenir que des lettres, des chiffres et des espaces.');
            return;
          }
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
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.editMode ? 'Modifier données' : 'Ajouter données'}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="form-container">
                    <div>
                        <label htmlFor="title">Titre :</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description :</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-textarea"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="image">Image:</label>
                        {image_MethodStock && <img src={image_MethodStock} alt="" className="current-image" />} 
                        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="submit-button">Close</Button>
                <Button type="submit" className="form-button" onClick={handleSubmit}>{props.editMode ? 'Modifier' : 'Ajouter'}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModelAjouterStock;
