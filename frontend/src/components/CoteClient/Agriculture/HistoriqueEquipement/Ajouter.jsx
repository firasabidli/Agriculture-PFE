import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const AjouterEquipement = ({ onCreate }) => {
    const { id } = useParams();
    const now = new Date();
    const [dateAcquisition, setDateAcquisition] = useState(new Date(now).toISOString().split("T")[0]);
    const [nom, setNom] = useState("");
    const [prixParHeure, setPrixParHeure] = useState("");
    const [nombreHeures, setNombreHeures] = useState("");
    const [prixTotalEq, setPrixTotalEq] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (!nom || !prixParHeure || !nombreHeures) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            const isValidNom = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nom);
            if (!isValidNom) {
                alert('Le nom d\'équipement ne doit contenir que des lettres et des espaces.');
                return;
            }

            const prixTotalEq = prixParHeure * nombreHeures;

            const authToken = localStorage.getItem("authToken");
            const userId = localStorage.getItem("user")._id;
            const formData = {
                Agriculteur: userId,
                idCulture: id,
                nom: nom,
                prixParHeure: prixParHeure,
                nombreHeures: nombreHeures,
                prixTotalEq: prixTotalEq,
                dateAcquisition: dateAcquisition,
            };

            const response = await axios.post(
                "http://localhost:3001/HistoriqueEquipement/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            alert('Équipement ajouté avec succès !');
            setDateAcquisition(new Date(now).toISOString().split("T")[0]);
            setNom("");
            setPrixParHeure("");
            setNombreHeures("");
            setPrixTotalEq(0);
            onCreate();
            console.log("Réponse du serveur :", response.data);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'équipement :", error);
        }
    };

    return (
        <div className="card" >
            <div className="card-body">
                <h5 style={{ textAlign: "center" }}>Ajouter un Équipement</h5>
                <form onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Nom :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nom"
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Prix par heure :</label>
                        <input
                            type="number"
                            className="form-control"
                            name="prixParHeure"
                            value={prixParHeure}
                            onChange={(e) => setPrixParHeure(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Nombre d'heures :</label>
                        <input
                            type="number"
                            className="form-control"
                            name="nombreHeures"
                            value={nombreHeures}
                            onChange={(e) => setNombreHeures(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Date d'acquisition :</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateAcquisition"
                            value={dateAcquisition}
                            onChange={(e) => setDateAcquisition(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AjouterEquipement;
