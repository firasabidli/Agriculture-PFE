import React, { useState } from "react";
import axios from 'axios';
import Btn from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

const AjouterAliment = ({ onCreate, AnimalId }) => {
    
    const [dateAchat, setDateAchat] = useState('');
    const [quantite, setQuantite] = useState(0);
    const [prix, setPrix] = useState(0);
    const [total, setTotal] = useState(0);
    const [unite, setUnite] = useState('');
    const [aliments, setAliments] = useState('');
    const user = localStorage.getItem("user");
    const idAgriculteur = user ? JSON.parse(user)._id : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:3001/AlimentsAnimal', {
                idAgriculteur, 
                AnimalId:AnimalId,  // Ensure AnimalId is being sent in the request
                aliments,
                dateAchat,
                quantite,
                unite,
                prix,
                total: quantite * prix
            });
            if (response.data.success) {
                alert(response.data.message);
                setDateAchat('');
                setAliments('');
                setQuantite(0);
                setPrix(0);
                setTotal(0);
                onCreate();
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'aliment', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);  // Show the error message from the backend
            }
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <h5 style={{ textAlign: "center" }}>Ajouter un aliment</h5>
                <Form onSubmit={handleSubmit} id="form" style={{ marginTop: "5%" }}>
                    <Form.Group className="mb-3 w-100" controlId="dateAchat">
                        <FloatingLabel controlId="floatingTextarea2" label="Date d'achat">
                            <Form.Control
                                type="date"
                                placeholder="Date d'achat"
                                value={dateAchat}
                                onChange={(e) => setDateAchat(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3 w-100" controlId="aliments">
                        <Form.Label>Aliments</Form.Label>
                        <Form.Control as="select" value={aliments} onChange={(e) => { setAliments(e.target.value); if (e.target.value === 'Balles de foins') { setUnite('Balles'); } }}>
                            <option value="">Sélectionnez un aliment</option>
                            <option value="Balles de foins">Balles de foins</option>
                            <option value="Fourrage">Fourrage</option>
                            <option value="Grain">Grain</option>
                        </Form.Control>
                    </Form.Group>
                    {(aliments === "Fourrage" || aliments === "Grain" || aliments === "") && (
                        <Form.Group className="mb-3 w-100" controlId="aliments">
                            <Form.Label>{aliments === "" ? "Il faut choisir un aliment" : aliments === "Balles de foins" ? "Quantité de balles" : "Quantité par nombre de sac ou par KG"}</Form.Label>
                            <Form.Control as="select" value={unite} onChange={(e) => setUnite(e.target.value)}>
                                <option value="0">Choisir</option>
                                <option value="Sac" disabled={aliments === "Balles de foins" || aliments === ""}>Sac</option>
                                <option value="Kg" disabled={aliments === "Balles de foins" || aliments === ""}>Kg</option>
                            </Form.Control>
                        </Form.Group>
                    )}
                    {unite === "Sac" && (
                        <Form.Group className="mb-3 w-100" controlId="quantite">
                            <FloatingLabel controlId="floatingTextarea2" label="Nombre de sac">
                                <Form.Control
                                    type="number"
                                    placeholder="Nombre de sac"
                                    value={quantite}
                                    onChange={(e) => setQuantite(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    )}
                    {(unite === "Kg" || aliments === "Balles de foins") && (
                        <Form.Group className="mb-3 w-100" controlId="quantite">
                            <FloatingLabel controlId="floatingTextarea2" label="Quantité">
                                <Form.Control
                                    type="number"
                                    placeholder="Quantité"
                                    value={quantite}
                                    onChange={(e) => setQuantite(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    )}
                    <Form.Group className="mb-3 w-100" controlId="prix">
                        <FloatingLabel controlId="floatingTextarea2" label="Prix">
                            <Form.Control
                                type="number"
                                placeholder="Prix"
                                value={prix}
                                onChange={(e) => setPrix(e.target.value)}
                            />
                        </FloatingLabel>
                    </Form.Group>
                    <div>
                        Total: {quantite * prix}
                    </div>
                    <Btn className="btn" type="submit" form="form">Ajouter</Btn>
                </Form>
            </div>
        </div>
    );
};

export default AjouterAliment;
