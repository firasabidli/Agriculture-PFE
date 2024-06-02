import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";

const UpdateMainOeuvre = ({ onUpdate, mainOeuvreId }) => {
    const [show, setShow] = useState(false);
    const [nom, setNom] = useState("");
    const [prixParHeure, setPrixParHeure] = useState("");
    const [nombreHeures, setNombreHeures] = useState("");
    const [dateTravail, setDateTravail] = useState("");
    const [typeTravail, setTypeTravail] = useState("");
    
    useEffect(() => {
        const fetchMainOeuvre = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/HistoriqueMainOeuvre/mainoeuvre/${mainOeuvreId}`);
                const mainOeuvreData = response.data.MainOeuvres;
                setNom(mainOeuvreData.nom);
                setPrixParHeure(mainOeuvreData.prixParHeure);
                setNombreHeures(mainOeuvreData.nombreHeures);
                const formattedDate = new Date(mainOeuvreData.dateTravail).toISOString().split('T')[0];
                setDateTravail(formattedDate);
                setTypeTravail(mainOeuvreData.typeTravail);
                
                console.log(mainOeuvreData.typeTravail)
            } catch (error) {
                console.error('Error fetching main d\'oeuvre:', error);
            }
        };

        if (mainOeuvreId) {
            fetchMainOeuvre();
        }
    }, [mainOeuvreId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "nom") {
            setNom(value);
        } else if (name === "prixParHeure") {
            setPrixParHeure(value);
        } else if (name === "nombreHeures") {
            setNombreHeures(value);
        } else if (name === "dateTravail") {
            setDateTravail(value);
        } else if (name === "typeTravail") {
            setTypeTravail(value);
        }
    };

    const handleSubmit = async () => {

        const formData = {
            nom: nom,
            prixParHeure: prixParHeure,
            nombreHeures: nombreHeures,
            dateTravail: dateTravail,
            typeTravail: typeTravail,
            prixTotal:nombreHeures * prixParHeure
        };
        try {
            await axios.put(`http://localhost:3001/HistoriqueMainOeuvre/${mainOeuvreId}`, formData);
            onUpdate(mainOeuvreId, formData);
            handleClose();
        } catch (error) {
            console.error('Error updating main d\'oeuvre:', error);
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
                        <label htmlFor="nom" className="form-label"style={{fontWeight:"bold"}}>Nom :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            name="nom"
                            defaultValue={nom}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="prixParHeure" className="form-label" style={{fontWeight:"bold"}}>Prix par heure :</label>
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
                        <label htmlFor="nombreHeures" className="form-label"style={{fontWeight:"bold"}}>Nombre d'heures :</label>
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
                        <label htmlFor="dateTravail" className="form-label" style={{fontWeight:"bold"}}>Date de travail :</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateTravail"
                            name="dateTravail"
                            defaultValue={dateTravail}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="typeTravail" className="form-label"style={{fontWeight:"bold"}}>Type de travail :</label>
                        <select
                            className="form-select"
                            id="typeTravail"
                            name="typeTravail"
                            value={typeTravail}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Sélectionner le type de travail</option>
                            <option value="Plantation">Plantation</option>
                            <option value="Cueillette">Cueillette</option>
                            <option value="Désherbage">Désherbage</option>
                            <option value="Élagage">Élagage</option>
                            <option value="Irrigation">Irrigation</option>
                            <option value="Tri et conditionnement">Tri et conditionnement</option>
                            <option value="Entretien général">Entretien général</option>
                        </select>
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

export default UpdateMainOeuvre;
