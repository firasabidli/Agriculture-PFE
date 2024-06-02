import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";

const UpdateRecolte = ({ onUpdate, recolteId }) => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState("");
    const [balles, setBalles] = useState([]);
    const [quantites, setQuantites] = useState([]);
    

    useEffect(() => {
        const fetchRecolte = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/HistoriqueRecolte/recolte/${recolteId}`);
                const recolteData = response.data.Recoltes;
                const formattedDate = new Date(recolteData.date).toISOString().split('T')[0];
                setDate(formattedDate);
                setBalles(recolteData.balles);
                setQuantites(recolteData.quantites);
               
            } catch (error) {
                console.error('Error fetching recolte:', error);
            }
        };

        if (recolteId) {
            fetchRecolte();
        }
    }, [recolteId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "date") {
            setDate(value);
        } else if (name.startsWith("nombreBalles")) {
            const index = parseInt(name.split("-")[1]);
            const newBalles = [...balles];
            newBalles[index].nombreBalles = value;
            setBalles(newBalles);
        } else if (name.startsWith("prixVenteParBalle")) {
            const index = parseInt(name.split("-")[1]);
            const newBalles = [...balles];
            newBalles[index].prixVenteParBalle = value;
            setBalles(newBalles);
        } else if (name.startsWith("quantite")) {
            const index = parseInt(name.split("-")[1]);
            const newQuantites = [...quantites];
            newQuantites[index].quantite = value;
            setQuantites(newQuantites);
        } else if (name.startsWith("prix")) {
            const index = parseInt(name.split("-")[1]);
            const newQuantites = [...quantites];
            newQuantites[index].prix = value;
            setQuantites(newQuantites);
        } else if (name.startsWith("unite")) {
            const index = parseInt(name.split("-")[1]);
            const newQuantites = [...quantites];
            newQuantites[index].unite = value;
            setQuantites(newQuantites);
        }
    };

    const handleSubmit = async () => {
         // Calculer le prix total des balles
         balles.forEach(balle => {
            balle.prixTotalBalle = balle.nombreBalles * balle.prixVenteParBalle;
        });

        // Calculer le prix total des quantités
        quantites.forEach(quantite => {
            quantite.prixTotalVente = quantite.quantite * quantite.prix;
        });

        // Calculer le revenu total en additionnant les prix totaux des balles et des quantités
        const revenuTotal = balles.reduce((acc, balle) => acc + balle.prixTotalBalle, 0) +
                            quantites.reduce((acc, quantite) => acc + quantite.prixTotalVente, 0);
        const formData = {
            date: date,
            balles: balles,
            quantites: quantites,
            revenuTotal: revenuTotal
        };
        try {
            await axios.put(`http://localhost:3001/HistoriqueRecolte/${recolteId}`, formData);
            onUpdate(recolteId, formData);
            handleClose();
        } catch (error) {
            console.error('Error updating recolte:', error);
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <CiEdit style={{ fontSize: "400%",marginTop:'-10%' }} onClick={handleShow} />
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier les informations de récolte</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label" style={{fontWeight:"bold"}}>Date :</label>
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
                    {/* Input fields for balles */}
                    {balles.map((balle, index) => (
                        <div key={index}>
                            <div className="mb-3">
                                <label htmlFor={`nombreBalles-${index}`} className="form-label" style={{fontWeight:"bold"}}>Nombre de Balles :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`nombreBalles-${index}`}
                                    name={`nombreBalles-${index}`}
                                    value={balle.nombreBalles}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`prixVenteParBalle-${index}`} className="form-label" style={{fontWeight:"bold"}}>Prix de Vente par Balle :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`prixVenteParBalle-${index}`}
                                    name={`prixVenteParBalle-${index}`}
                                    value={balle.prixVenteParBalle}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    {/* Input fields for quantites */}
                    {quantites.map((quantite, index) => (
                        <div key={index}>
                            <div className="mb-3">
                                <label htmlFor={`quantite-${index}`} className="form-label" style={{fontWeight:"bold"}}>Quantité :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`quantite-${index}`}
                                    name={`quantite-${index}`}
                                    value={quantite.quantite}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`unite-${index}`} className="form-label" style={{fontWeight:"bold"}}>Unité :</label>
                                <select
                                    className="form-select"
                                    id={`unite-${index}`}
                                    name={`unite-${index}`}
                                    value={quantite.unite}
                                    defaultValue={quantite.unite}
                                    onChange={handleInputChange}
                                    required
                                >
                                    <option value="">Sélectionner une unité</option>
                                    <option value="kg">Kilogramme (kg)</option>
                                    <option value="ton">Tonne (ton)</option>
                                    {/* <option value="gramme">Gramme</option>
                                    <option value="kilo">Kilo</option>
                                    <option value="tonne">Tonne</option> */}
                                    {/* Ajoutez d'autres options d'unités ici si nécessaire */}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`prix-${index}`} className="form-label" style={{fontWeight:"bold"}}>Prix :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id={`prix-${index}`}
                                    name={`prix-${index}`}
                                    value={quantite.prix}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="bg-secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button className="btn" onClick={handleSubmit}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UpdateRecolte;
