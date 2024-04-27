import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const AjouterEngrais = ({ onCreate }) => {
    const { id } = useParams();
    const now = new Date();
    const [engraisData, setEngraisData] = useState({
        idCulture: id,
        dateApplication: new Date(now).toISOString().split("T")[0],
        nom: "",
        type: "",
        quantite: "",
        prix: "",
        unite: "kg", 
        
    });

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEngraisData({
            ...engraisData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { quantite, prix } = engraisData;
        const prixtotal= quantite * prix;
        try {
            if (!engraisData.type || !engraisData.quantite || !engraisData.prix || !engraisData.nom) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            const isValidType = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(engraisData.type);
            if (!isValidType) {
                alert('Le type d\'engrais ne doit contenir que des lettres et des espaces.');
                return;
            }

            const authToken = localStorage.getItem("authToken");
            const userId = localStorage.getItem("user")._id;

            const formData = {
                Agriculteur: userId,
                prixTotalPro: prixtotal,
                ...engraisData,
            };
console.log(formData.idCulture)
            const response = await axios.post(
                "http://localhost:3001/HistoriqueEngrais/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            alert('Engrais ajouté avec succès !');
            setEngraisData({
                dateApplication: "",
                nom: "",
                type: "",
                quantite: "",
                unite:"",
                prix: "",
                prixTotalPro:0
            });
            onCreate();
            console.log("Réponse du serveur :", response.data);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement de l'engrais :", error);
        }
    };

    return (
        <div className="card" style={{ marginRight: "-45%", width: "127%" }}>
            <div className="card-body">
                <h5 style={{ textAlign: "center" }}>Ajouter de Produit</h5>
                <form onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Nom :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="nom"
                            value={engraisData.nom}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Type de produit :</label>
                        <select
                            className="form-control"
                            name="type"
                            value={engraisData.type}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">Sélectionner le type de produit</option>
                            <option value="Engrais">Engrais</option>
                            <option value="Pesticide">Pesticide</option>
                        </select>
                    </div>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Date Application</label>
                        <input
                            type="date"
                            className="form-control"
                            name="dateApplication"
                            value={engraisData.dateApplication}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{display:"flex" }}>
                      <div style={{width: "116%",marginLeft:"-30%"}}>
                      <label style={{ fontWeight: "bold" }}>Quantité :</label>
                        <input
                           type="number"
                            className="form-control"
                            name="quantite"
                            value={engraisData.quantite}
                            // onChange={handleQuantiteChange}
                            onChange={handleInputChange}
                            required
                        />
                        </div>
                        <div style={{width: "116%",marginLeft:"5%",marginRight: "-35%"}}>
                        <label style={{ fontWeight: "bold" }}>Unité :</label>
                        <select
                            className="form-control"
                            name="unite"
                            value={engraisData.unite}
                            onChange={handleInputChange}
                        >
                            <option value="kg">kg</option>
                            <option value="g">g</option>
                            <option value="L">L</option>
                            <option value="ml">ml</option>
                        </select>
                        
                        </div>
                    </div>
                    
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Prix :</label>
                        <input
                            type="number"
                            className="form-control"
                            name="prix"
                            value={engraisData.prix}
                            // onChange={handlePrixChange}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                </form>
            </div>
        </div>
    );
};

export default AjouterEngrais;
