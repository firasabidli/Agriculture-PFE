import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './Stock.css';

function MyModelAjouterStock(props) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image_MethodStock, setImage_MethodStock] = useState('');

    // Effet pour préremplir les champs lors de la modification
    useEffect(() => {
        // Vérifie si des données de formulaire ont été passées en tant que props
        if (props.formData) {
            // Préremplit les champs avec les données existantes
            setTitle(props.formData.title || '');
            setDescription(props.formData.description || '');
            setImage_MethodStock(props.formData.image_MethodStock || '');
        }
    }, [props.formData]);

    // Fonction pour soumettre le formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (props.formData) {
                // Modifier
                await axios.put(`http://localhost:3001/MethodeStock/UpdateStock/${props.formData._id}`, { title, description, image_MethodStock });
            } else {
                // Ajouter
                await axios.post('http://localhost:3001/MethodeStock/AjouterStock', { title, description, image_MethodStock });
            }
            // Réinitialiser les champs après la soumission
            setTitle('');
            setDescription('');
            setImage_MethodStock('');
            // Appeler la fonction onHide pour fermer la modal
            props.onHide();
            // Mettre à jour les données après la modification ou l'ajout
            props.fetchData();
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
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
                <form className="form-container" onSubmit={handleSubmit}>
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
                        <label htmlFor="image">Image (URL) :</label>
                        <input
                            type="text"
                            id="image"
                            value={image_MethodStock}
                            onChange={(e) => setImage_MethodStock(e.target.value)}
                            className="form-input"
                            required
                        />
                    </div>
                    <Button type="submit" className="form-button">
                        {props.editMode ? 'Modifier' : 'Ajouter'}
                    </Button>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="submit-button">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModelAjouterStock;
