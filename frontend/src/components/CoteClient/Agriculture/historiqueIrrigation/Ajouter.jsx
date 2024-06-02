import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const AjouterIrrigation = ({ onCreate }) => {
    const { id } = useParams();
    const now = new Date();
    const [date, setDate] = useState(new Date(now).toISOString().split("T")[0]);
    const [duree, setDuree] = useState("");
    const [typeIrrigation, setTypeIrrigation] = useState("");
    const [prixParHeure, setPrixParHeure] = useState("");
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (!duree || !typeIrrigation || !prixParHeure) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            const authToken = localStorage.getItem("authToken");
            
            const formData = {
                idCulture: id,
                date: date,
                duree: duree,
                type: typeIrrigation,
                prixParHeure: prixParHeure,
                coutTotal: prixParHeure * duree
            };

            const response = await axios.post(
                "http://localhost:3001/HistoriqueIrrigation/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            alert('Irrigation ajoutée avec succès !');
            setDate(new Date(now).toISOString().split("T")[0]);
            setDuree("");
            setTypeIrrigation("");
            setPrixParHeure("");
            
            onCreate();
            console.log("Réponse du serveur :", response.data);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'irrigation :", error);
        }
    };

    return (
        <div className="card" >
            <div className="card-body">
                <h5 style={{ textAlign: "center" }}>Ajouter une Irrigation</h5>
                <form onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Date :</label>
                        <input
                            type="date"
                            className="form-control"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Type d'Irrigation :</label>
                        <select
                            className="form-control"
                            name="typeIrrigation"
                            value={typeIrrigation}
                            onChange={(e) => setTypeIrrigation(e.target.value)}
                            required
                        >
                            <option value="">Sélectionner le type d'irrigation</option>
                            <option value="goutte-à-goutte">Goutte-à-goutte</option>
                            <option value="asperseur">Asperseur</option>
                            <option value="canal">Canal</option>
                            <option value="autre">Autre</option>
                        </select>
                    </div>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Durée (en heures) :</label>
                        <input
                            type="number"
                            className="form-control"
                            name="duree"
                            value={duree}
                            onChange={(e) => setDuree(e.target.value)}
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
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AjouterIrrigation;
