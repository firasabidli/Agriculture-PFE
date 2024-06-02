// Details.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const Details = ({ Id, onClose }) => {
    const [formData, setFormData] = useState(null);

    const fetchAgriculture = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/ListeAgriculture/${Id}`);
            const agricultureData = response.data.cultures;
            console.log("ag",agricultureData)
            setFormData(agricultureData);
        } catch (error) {
            console.error('Error fetching agriculture:', error);
        }
    };

    useEffect(() => {
        if (Id) { 
            fetchAgriculture();
        }
    }, );

    return (
        <Modal show={!!Id} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Détails de la culture</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {formData ? (
                    <div>
                        <p><span style={{fontWeight:"bold"}}>Titre: </span> {formData.titre}</p>
                        <p><span style={{fontWeight:"bold"}}>Description: </span> {formData.description}</p>
                        <p> <span style={{fontWeight:"bold"}}>Surface: </span> {formData.surface}</p>
                        <p> <span style={{fontWeight:"bold"}}>Date de plantation: </span>{new Date(formData.datePlantation).toLocaleDateString('fr-FR')}</p>
                        <p><span style={{fontWeight:"bold"}}>Localisation: </span> {formData.localisation}</p>
                        <p><span style={{fontWeight:"bold"}}>Quantité de Semences: </span> {formData.quantiteSemences}</p>
                        <p><span style={{fontWeight:"bold"}}>prixSemence: </span> {formData.prixSemence}</p>
                        <p><span style={{fontWeight:"bold"}}>prixTerrain: </span> {formData.prixTerrain}</p>
                    </div>
                ) : (
                    <p>Les détails de la culture ne sont pas disponibles.</p>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default Details;
