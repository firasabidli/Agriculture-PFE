import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const RemarqueCulture = ({ show, onHide, cultureName }) => {
    const [optionRemarque, setOptionRemarque] = useState('');
    const [remarque, setRemarque] = useState('');

    const enregistrerRemarque = async () => {
        try {
            const formData = {
                nom_culture: cultureName,
                option_Remarque: optionRemarque,
                Remarque: remarque
            };
            await axios.post('http://localhost:3001/RemarqueAgriculture/', formData);
            alert('Remarque Envoyer');
            setOptionRemarque('');
            setRemarque('');
            onHide();
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            alert(error.response.data.error);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{cultureName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.SelectCustom">
                        <Form.Label>Sélectionnez une option</Form.Label>
                        <Form.Control as="select" custom value={optionRemarque} onChange={(e) => {
                            if (e.target.value !== "Sélectionnez une option") {
                                setOptionRemarque(e.target.value);
                            }
                        }}>
                            <option>Sélectionnez une option</option>
                            <option>Planification et suivi</option>
                            <option>Techniques de gestion des stocks agriculture</option>
                            <option>Articles de soins pour les végétaux et substances nourrissantes</option>
                            <option>Équipements pour l'agriculture</option>
                            <option>Tous</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Nous Commentaire</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Saisissez votre remarque ici..." value={remarque} onChange={(e) => setRemarque(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={enregistrerRemarque} style={{ marginTop: "1%" }}>
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemarqueCulture;
