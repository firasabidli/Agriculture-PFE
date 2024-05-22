import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const AjouterRecolte = ({ onCreate }) => {
    const { id } = useParams();
    const now = new Date();
    const [date, setDate] = useState(new Date(now).toISOString().split("T")[0]);
    const [balles, setBalles] = useState([{ nombreBalles: 0, prixTotalBalle:  0, prixVenteParBalle: 0 }]);
    const [quantites, setQuantites] = useState([{ quantite: 0, unite: '', prixTotalVente: 0,prix:0 }]);
    const [revenuTotal, setRevenuTotal] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
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
    
            // Déclarer formData avec les données mises à jour
            const formData = {
                idCulture: id,
                date: date,
                balles: balles,
                quantites: quantites,
                revenuTotal: revenuTotal
            };
    
            // Envoyer la requête POST avec les données formData
            const authToken = localStorage.getItem("authToken");
            const response = await axios.post(
                "http://localhost:3001/HistoriqueRecolte/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            // Réinitialiser les états et afficher une alerte de succès
            alert('Récolte ajoutée avec succès !');
            setDate(new Date(now).toISOString().split("T")[0]);
            setBalles([{ nombreBalles: 0, prixTotalBalle:  0, prixVenteParBalle: 0 }]);
            setQuantites([{ quantite: 0, unite: ' ', prixTotalVente: 0,prix:0 }]);
            setRevenuTotal(0);
            onCreate();
            console.log("Réponse du serveur :", response.data);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de la récolte :", error);
        }
    };

    return (
        <div className="card" style={{ marginRight: "-45%", width: "127%" }}>
            <div className="card-body">
                <h5 style={{ textAlign: "center" }}>Ajouter une Récolte</h5>
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
                    {balles.map((balle, index) => (
                        <div key={index} style={{ width: "116%" }}>
                            <div className="mb-3" style={{ width: "104%" }}>
                                <label style={{ fontWeight: "bold" }}>Nombre de Balles :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={balle.nombreBalles}
                                    onChange={(e) => {
                                        const newBalles = [...balles];
                                        newBalles[index].nombreBalles = e.target.value;
                                        setBalles(newBalles);
                                    }}
                                    required
                                />
                            </div>
                            <div className="mb-3" style={{ width: "104%" }}>
                                <label style={{ fontWeight: "bold" }}>Prix de Vente par Balle :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={balle.prixVenteParBalle}
                                    onChange={(e) => {
                                        const newBalles = [...balles];
                                        newBalles[index].prixVenteParBalle = e.target.value;
                                        setBalles(newBalles);
                                    }}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    {quantites.map((quantite, index) => (
                        <div key={index} style={{ width: "116%" }} >
                            <div className="mb-3" style={{ width: "104%" }}>
                                <label style={{ fontWeight: "bold" }}>Quantité du Rendements :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={quantite.quantite}
                                    onChange={(e) => {
                                        const newQuantites = [...quantites];
                                        newQuantites[index].quantite = e.target.value;
                                        setQuantites(newQuantites);
                                    }}
                                    required
                                />
                            </div>
                            <div className="mb-3" style={{ width: "104%" }}>
                            <label style={{ fontWeight: "bold" }}>Unité :</label>
                            <select
                                className="form-control"
                                value={quantite.unite}
                                onChange={(e) => {
                                    const newQuantites = [...quantites];
                                    newQuantites[index].unite = e.target.value;
                                    setQuantites(newQuantites);
                                }}
                                
                            >
                                <option value="">Sélectionnez une unité</option>
                                <option value="kg">Kilogramme (kg)</option>
                                <option value="ton">Tonne (ton)</option>
                            </select>
                        </div>

                            <div className="mb-3" style={{ width: "104%" }}>
                                <label style={{ fontWeight: "bold" }}>Prix de Vente :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={quantite.prix}
                                    onChange={(e) => {
                                        const newQuantites = [...quantites];
                                        newQuantites[index].prix = e.target.value;
                                        setQuantites(newQuantites);
                                    }}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AjouterRecolte;
