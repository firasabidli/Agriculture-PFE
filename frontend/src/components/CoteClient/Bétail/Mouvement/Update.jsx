import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Btn from 'react-bootstrap/Button';
const Update = ({ onUpdate, mouvementId }) => {
    const [show, setShow] = useState(false);
    const [typeMouvement, setTypeMouvement] = useState('');
    const [origine, setOrigine] = useState('');
    const [destination, setDestination] = useState('');
    const [prixAchat, setPrixAchat] = useState(0);
    const [prixVente, setPrixVente] = useState(0);
    const [displayPriceAchat, setDisplayPriceAchat] = useState(false);
    const [displayPriceVente, setDisplayPriceVente] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log("nn",mouvementId)
        const fetchMouvement = async () => {
            try {
                
                const response = await axios.get(`http://localhost:3001/MouvementsBetail/mouvement/${mouvementId}`);
                const mouvementData = response.data.mouvement;
                console.log("nn",mouvementData)
                            setTypeMouvement(mouvementData.movementType);
                setOrigine(mouvementData.origin);
                setDestination(mouvementData.destination);
                setPrixAchat(mouvementData.priceAchat);
                setPrixVente(mouvementData.priceVente);
                setDisplayPriceAchat(mouvementData.movementType=="achat");
                setDisplayPriceVente(mouvementData.movementType=="vente");
            } catch (error) {
                console.error('Error fetching mouvement:', error);
            }
        };

        if (mouvementId) {
            fetchMouvement();
        }
    }, [mouvementId]);

    const handleSubmit = async () => {
        const formData = {
            movementType: typeMouvement,
            origin: origin,
            destination: destination,
            priceAchat: prixAchat,
            priceVente: prixVente
        };

        try {
            const response = await axios.put(`http://localhost:3001/MouvementsBetail/${mouvementId}`, formData);
            console.log('Update successful:', response.data);
            onUpdate(); // Appeler la fonction de rafraîchissement après la mise à jour
            handleClose();
        } catch (error) {
            console.error('Error updating mouvement:', error);
        }
    };

    const handleInputTypeAchatChange = () => {
        setTypeMouvement("achat")
        setDisplayPriceAchat(true);
        setDisplayPriceVente(false);
      };

      const handleInputTypeVenteChange = () => {
        setTypeMouvement("vente")
        setDisplayPriceAchat(false);
        setDisplayPriceVente(true);
      };

    return (
        <>
            <button className="f-n-hover btn btn-success btn-raised px-4 py-2 w-75 text-600" style={{ marginRight: "30%", color: "white" }} onClick={handleShow}>
                Modifier
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier le mouvement</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3" style={{width: "116%"}}>
                        <label style={{fontWeight:"bold"}}>Type de mouvement :</label>
                        <div>
                            <input
                                type="radio"
                                id="achat"
                                name="typeMouvement"
                                value="achat"
                                checked={typeMouvement === "achat"}
                                onChange={handleInputTypeAchatChange}
                            />
                            <label htmlFor="achat" style={{ marginLeft: "5px", marginRight: "15px" ,fontSize:"110%"}}>Achat</label>
                            <input
                                type="radio"
                                id="vente"
                                name="typeMouvement"
                                value="vente"
                                checked={typeMouvement === "vente"}
                                onChange={handleInputTypeVenteChange}
                            />
                            <label htmlFor="vente" style={{ marginLeft: "5px",fontSize:"110%"}}>Vente</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label style={{ fontWeight: "bold" }}>Origine :</label>
                        <div>
                            <input
                                type="radio"
                                id="ferme"
                                name="origine"
                                value="ferme"
                                checked={origine === "ferme"}
                                onChange={() => setOrigine("ferme")}
                            />
                            <label htmlFor="ferme" style={{ marginLeft: "5px", marginRight: "15px" ,fontSize:"110%"}}>Ferme</label>
                            <input
                                type="radio"
                                id="marche"
                                name="origine"
                                value="marche"
                                checked={origine === "marche"}
                                onChange={() => setOrigine("marche")}
                            />
                            <label htmlFor="marche" style={{ marginLeft: "5px",fontSize:"110%"}}>Marché</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label style={{fontWeight:"bold"}}>Destination :</label>
                        <input
                            type="text"
                            className="form-control"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>
                    {displayPriceAchat &&
                            <div className="mb-3">
                                <label style={{fontWeight:"bold"}}>Prix d'achat:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={prixAchat}
                                    onChange={(e) => setPrixAchat(e.target.value)}
                                />
                            </div>
                    }
                    {displayPriceVente &&
                            <div className="mb-3">
                                <label style={{fontWeight:"bold"}}>Prix du vente:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={prixVente}
                                    onChange={(e) => setPrixVente(e.target.value)}
                                />
                            </div>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Btn  className="bg-secondary" onClick={handleClose}>
                        Fermer
                    </Btn>
                    <Btn className="btn" type="submit" onClick={handleSubmit}>
                        Enregistrer
                    </Btn>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Update;
