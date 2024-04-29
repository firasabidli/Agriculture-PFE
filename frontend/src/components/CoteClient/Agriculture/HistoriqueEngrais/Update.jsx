import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // Importez Axios pour effectuer des appels HTTP
import { CiEdit } from "react-icons/ci";

const Update = ({ onUpdate, engraisId }) => {
    const [show, setShow] = useState(false);
    const [typeEngrais, setTypeEngrais] = useState('');
    const [nomEngrais, setNomEngrais] = useState('');
    const [engraisData, setEngraisData] = useState({
        quantite: '',
        unite: 'kg', // Valeur par défaut pour l'unité
    });
    const [dateApplication, setDateApplication] = useState('');
    const [prix, setPrix] = useState('');
    const [prixTotalPro, setPrixTotalPro] = useState('');

    useEffect(() => {
        const fetchEngrais = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/HistoriqueEngrais/engrais/${engraisId}`);
                const engraisData = response.data.engrais;

                setTypeEngrais(engraisData.type);
                setNomEngrais(engraisData.nom);
                setEngraisData({
                    quantite: engraisData.quantite,
                    unite: engraisData.unite,
                });
                const formattedDate = new Date(engraisData.dateApplication).toISOString().split('T')[0];
        setDateApplication(formattedDate);
                console.log(engraisData.dateApplication)
                setPrix(engraisData.prix);
                setPrixTotalPro(engraisData.prixTotalPro);
            } catch (error) {
                console.error('Error fetching engrais:', error);
            }
        };

        if (engraisId) {
            fetchEngrais();
        }
    }, [engraisId]);

    const handleTypeChange = (e) => {
        setTypeEngrais(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEngraisData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handlePrixChange = (e) => {
        setPrix(e.target.value);
        // Calculer le prix total lorsqu'il y a un changement de prix
        const newPrixTotalPro = parseFloat(e.target.value) * parseFloat(engraisData.quantite);
        setPrixTotalPro(newPrixTotalPro.toFixed(2));
    };

    const handleSubmit = async () => {
        const formData = {
            type:typeEngrais,
            nom: nomEngrais,
            quantite: engraisData.quantite,
            dateApplication:dateApplication,
            prix:prix,
            prixTotalPro: engraisData.quantite *prix,
            unite: engraisData.unite,
        };
        try {
            await axios.put(`http://localhost:3001/HistoriqueEngrais/${engraisId}`, formData);
            onUpdate(engraisId, formData);
            handleClose();
        } catch (error) {
            console.error('Error updating engrais:', error);
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
                        <label htmlFor="typeEngrais" className="form-label">Type d'engrais :</label>
                        <select
                            className="form-control"
                            id="typeEngrais"
                            value={typeEngrais}
                            onChange={handleTypeChange}
                        >
                            <option value="">Sélectionner le type d'engrais</option>
                            <option value="Pesticide">Pesticide</option>
                            <option value="Engrais">Engrais</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nomEngrais" className="form-label">Nom de l'engrais :</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nomEngrais"
                            defaultValue={nomEngrais}
                            onChange={(e) => setNomEngrais(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dateApplication" className="form-label">Date d'application :</label>
                        <input
                            type="date"
                            className="form-control"
                            id="dateApplication"
                            defaultValue={dateApplication}
                            onChange={(e) => setDateApplication(e.target.value)}
                        />
                    </div>

                    <div className="mb-3" style={{ display: "flex" }}>
                        <div style={{ width: "50%", marginRight: "5%" }}>
                            <label style={{ fontWeight: "bold" }}>Quantité :</label>
                            <input
                                type="number"
                                className="form-control"
                                name="quantite"
                                defaultValue={engraisData.quantite}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div style={{ width: "50%" }}>
                            <label style={{ fontWeight: "bold" }}>Unité :</label>
                            <select
                                className="form-control"
                                name="unite"
                                defaultValue={engraisData.unite}
                                onChange={handleInputChange}
                            >
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="L">L</option>
                                <option value="ml">ml</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="prix" className="form-label">Prix :</label>
                        <input
                            type="number"
                            className="form-control"
                            id="prix"
                            defaultValue={prix}
                            onChange={handlePrixChange}
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
