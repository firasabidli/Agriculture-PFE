import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

const RemarqueBetail = ({ show, onHide, betailName }) => {
    const [optionRemarque, setOptionRemarque] = useState('');
    const [remarque, setRemarque] = useState('');

    const enregistrerRemarque = async () => {
        try {
            const formData = {
                nom_betail: betailName,
                option_Remarque: optionRemarque,
                Remarque: remarque
            };
            await axios.post('http://localhost:3001/RemarqueBetail/', formData);
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
                <Modal.Title>{betailName}</Modal.Title>
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
                            <option> suivie de la Santé</option>
                            <option>Besoin d'alimentation</option>
                            <option>Quantité d'alimentation par jour</option>
                            <option>Tous</option>
                            <option>Autre</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Nous Remarque</Form.Label>
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

export default RemarqueBetail;
