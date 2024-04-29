import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";

const Update = ({ onUpdate, equipementId }) => {
    const [show, setShow] = useState(false);
    const [nom, setNom] = useState("");
    const [prixParHeure, setPrixParHeure] = useState("");
    const [nombreHeures, setNombreHeures] = useState("");
    const [date, setDateAcquisition] = useState("");
    const [prixTotalEq,setprixTotalEq]=useState("");
    useEffect(() => {
        const fetchEquipement = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/HistoriqueEquipement/equipement/${equipementId}`);
                const equipementData = response.data.Equipements;
                setNom(equipementData.nom);
                setPrixParHeure(equipementData.prixParHeure);
                setNombreHeures(equipementData.nombreHeures);
                const formattedDate = new Date(equipementData.date).toISOString().split('T')[0];
               setDateAcquisition(formattedDate);
               setprixTotalEq(equipementData.prixTotalEq);
                //console.log(equipementData.date)
            } catch (error) {
                console.error('Error fetching equipement:', error);
            }
        };

        if (equipementId) {
            fetchEquipement();
        }
    }, [equipementId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "nom") {
            setNom(value);
        } else if (name === "prixParHeure") {
            setPrixParHeure(value);
        } else if (name === "nombreHeures") {
            setNombreHeures(value);
        } else if (name === "date") {
            setDateAcquisition(value);
        }
    };

    const handleSubmit = async () => {
        const formData = {
            nom: nom,
            prixParHeure: prixParHeure,
            nombreHeures: nombreHeures,
            date: date,
            prixTotalEq: prixParHeure * nombreHeures
        };
        try {
            await axios.put(`http://localhost:3001/HistoriqueEquipement/${equipementId}`, formData);
            onUpdate(equipementId, formData);
            handleClose();
        } catch (error) {
            console.error('Error updating equipement:', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <CiEdit style={{ fontSize: "234%" }} onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier les informations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            name="nom"
                            defaultValue={nom}
                            //value={nom}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="prixParHeure" className="form-label">Prix par heure :</label>
                        <input
                            type="number"
                            className="form-control"
                            id="prixParHeure"
                            name="prixParHeure"
                            value={prixParHeure}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nombreHeures" className="form-label">Nombre d'heures :</label>
                        <input
                            type="number"
                            className="form-control"
                            id="nombreHeures"
                            name="nombreHeures"
                            value={nombreHeures}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date d'acquisition :</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            defaultValue={date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button className="btn" type="submit" onClick={handleSubmit}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Update;
