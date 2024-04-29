import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";

const UpdateIrrigation = ({ onUpdate, irrigationId }) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState("");
    const [duree, setDuree] = useState("");
    const [typeIrrigation, setTypeIrrigation] = useState("");
    const [prixParHeure, setPrixParHeure] = useState("");
    const [coutTotal, setCoutTotal] = useState("");

    useEffect(() => {
        const fetchIrrigation = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/HistoriqueIrrigation/irrigation/${irrigationId}`);
                const irrigationData = response.data.Irrigations;
                const formattedDate = new Date(irrigationData.date).toISOString().split('T')[0];
                setDate(formattedDate);
                setDuree(irrigationData.duree);
                setTypeIrrigation(irrigationData.type);
                setPrixParHeure(irrigationData.prixParHeure);
                setCoutTotal(irrigationData.coutTotal);
            } catch (error) {
                console.error('Error fetching irrigation:', error);
            }
        };

        if (irrigationId) {
            fetchIrrigation();
        }
    }, [irrigationId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "date") {
            setDate(value);
        } else if (name === "duree") {
            setDuree(value);
        } else if (name === "typeIrrigation") {
            setTypeIrrigation(value);
        } else if (name === "prixParHeure") {
            setPrixParHeure(value);
        } else if (name === "coutTotal") {
            setCoutTotal(value);
        }
    };

    const handleSubmit = async () => {
        const formData = {
            date: date,
            duree: duree,
            type: typeIrrigation,
            prixParHeure: prixParHeure,
            coutTotal: prixParHeure* duree
        };
        try {
            await axios.put(`http://localhost:3001/HistoriqueIrrigation/${irrigationId}`, formData);
            onUpdate(irrigationId, formData);
            handleClose();
        } catch (error) {
            console.error('Error updating irrigation:', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <CiEdit style={{ fontSize: "234%" }} onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier les informations d'irrigation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date :</label>
                        <input
                            type="date"
                            className="form-control"
                            id="date"
                            name="date"
                            value={date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="duree" className="form-label">Durée (en heures) :</label>
                        <input
                            type="number"
                            className="form-control"
                            id="duree"
                            name="duree"
                            value={duree}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="typeIrrigation" className="form-label">Type d'irrigation :</label>
                        <select
                            className="form-select"
                            id="typeIrrigation"
                            name="typeIrrigation"
                            value={typeIrrigation}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Sélectionner le type d'irrigation</option>
                            <option value="goutte-à-goutte">Goutte-à-goutte</option>
                            <option value="asperseur">Asperseur</option>
                            <option value="canal">Canal</option>
                            <option value="autre">Autre</option>
                        </select>
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

export default UpdateIrrigation;
