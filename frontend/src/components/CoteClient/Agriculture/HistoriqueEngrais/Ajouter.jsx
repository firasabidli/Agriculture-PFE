import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const AjouterEngrais = ({ onCreate }) => {
    const { id } = useParams();
    const now = new Date();
    const [dateApplication, setDateApplication] = useState(new Date(now).toISOString().split("T")[0]);
    const [unite, setUnite] = useState("kg");
    const [nom, setNom] = useState("");
    const [type,setType]=useState("");
    const [quantite,setQuantite]=useState("");
    const [prix,setprix]=useState("");
    const [prixTotalPro,setTotalPro]=useState(0);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const { quantite, prix } = engraisData;
        
        try {
            if (!type || !quantite || !prix || !nom) {
                alert('Veuillez remplir tous les champs.');
                return;
            }

            const isValidnom = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nom);
            if (!isValidnom) {
                alert('Le nom d\'engrais ne doit contenir que des lettres et des espaces.');
                return;
            }

            const authToken = localStorage.getItem("authToken");
            const userId = localStorage.getItem("user")._id;
            const prixTotalPro=quantite * prix;
            const formData = {
                Agriculteur: userId,
                idCulture: id,
                prixTotalPro: prixTotalPro,
                dateApplication:dateApplication,
                unite:unite,
                nom:nom,
                type:type,
                quantite:quantite,
                prix:prix
            };
            console.log("data", formData.dateApplication);

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
            setDateApplication(new Date(now).toISOString().split("T")[0]);
            setUnite("kg");
            setNom("");
            setType("")
            setQuantite("");
            setTotalPro(0);
            setprix("");
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
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3" style={{ width: "116%" }}>
                        <label style={{ fontWeight: "bold" }}>Type de produit :</label>
                        <select
                            className="form-control"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
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
                            value={dateApplication}
                            onChange={(e) => setDateApplication(e.target.value)}
                            // onChange={handleInputChange}
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
                            value={quantite}
                            // onChange={handleQuantiteChange}
                            //onChange={handleInputChange}
                            onChange={(e) => setQuantite(e.target.value)}
                            required
                        />
                        </div>
                        <div style={{width: "116%",marginLeft:"5%",marginRight: "-35%"}}>
                        <label style={{ fontWeight: "bold" }}>Unité :</label>
                        <select
                            className="form-control"
                            name="unite"
                            value={unite}
                            onChange={(e) => setUnite(e.target.value)}
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
                            value={prix}
                            onChange={(e) => setprix(e.target.value)}
                            // onChange={handlePrixChange}
                            // onChange={handleInputChange}
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
