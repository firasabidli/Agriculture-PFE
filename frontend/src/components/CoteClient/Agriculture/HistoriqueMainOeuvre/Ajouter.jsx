import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const AjouterMainOeuvre = ({ onCreate }) => {
    const { id } = useParams();
    const now = new Date();
    const [dateTravail, setDateTravail] = useState(new Date(now).toISOString().split("T")[0]);
    const [nom, setNom] = useState("");
    const [typeTravail, setTypeTravail] = useState("");
    const [nombreHeures, setNombreHeures] = useState("");
    const [prixParHeure, setPrixParHeure] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (!nom || !typeTravail || !nombreHeures || !prixParHeure) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            const isValidNom = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nom);
            if (!isValidNom) {
                alert('Le nom de la main-d\'œuvre ne doit contenir que des lettres et des espaces.');
                return;
            }
            const prixTotal=prixParHeure* nombreHeures;
            const authToken = localStorage.getItem("authToken");
            const userId = localStorage.getItem("user")._id;
            const formData = {
                Agriculteur: userId,
                idCulture: id,
                nom: nom,
                typeTravail: typeTravail,
                nombreHeures: nombreHeures,
                dateTravail: dateTravail,
                prixParHeure: prixParHeure,
                prixTotal:prixTotal
            };

            const response = await axios.post(
                "http://localhost:3001/HistoriqueMainOeuvre/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            alert('Main d\'œuvre ajoutée avec succès !');
            setDateTravail(new Date(now).toISOString().split("T")[0]);
            setNom("");
            
            setTypeTravail("");
            setNombreHeures("");
            setPrixParHeure("");
            onCreate();
            console.log("Réponse du serveur :", response.data);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la main d'œuvre :", error);
        }
    };

    return (
        <div className="card" >
            <div className="card-body">
                <h5 style={{ textAlign: "center" }}>Ajouter une Main d'œuvre</h5>
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
                        <label style={{ fontWeight: "bold" }}>Type de travail :</label>
                        <select
                            className="form-control"
                            name="typeTravail"
                            value={typeTravail}
                            onChange={(e) => setTypeTravail(e.target.value)}
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
                            {/* Ajoutez ici d'autres options de type de travail selon votre besoin */}
                        </select>
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
                        <label style={{ fontWeight: "bold" }}>Date de travail :</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateTravail"
                            value={dateTravail}
                            onChange={(e) => setDateTravail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AjouterMainOeuvre;
