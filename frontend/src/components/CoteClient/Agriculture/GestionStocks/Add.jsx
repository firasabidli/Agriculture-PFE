import React, { useState, useEffect } from "react";
import axios from 'axios';

const Ajouter = ({ onCreate }) => {
    const now = new Date();
    const [date, setDate] = useState(new Date(now).toISOString().split("T")[0]);
    const [entrées, setEntrées] = useState([{ dateEntrée: '', quantitéEntrée: 0, uniteEntrée: 'kg', raisonEntrée: '', prix:0 }]);
    const [emplacement, setEmplacement] = useState('');
    const [ville, setVille] = useState('');
    const [libellé, setLibellé] = useState('');
    const [typeStocks, setTypeStocks] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      fetchCategories();
    }, []);
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/Categorie'); // Assurez-vous de remplacer l'URL par celle de votre endpoint pour récupérer les catégories
        setCategories(response.data.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidnom = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(libellé);
        const isValidville = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(ville);
        const isValidemplacement = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(emplacement);
  if (!isValidnom || !isValidville||!isValidemplacement) {
    alert('Le champ text ne doit contenir que des lettres, des chiffres et des espaces.');
    return;
  }
        try {
            // Déclarer formData avec les données mises à jour
            const formData = {
                libellé: libellé,
                date: date,
                quantitéGénérale: entrées.reduce((acc, entrée) => acc + entrée.quantitéEntrée, 0),
                entrées: entrées,
                sortie: [],
                emplacement: emplacement,
                ville: ville,
                typeStocks: typeStocks
            };
    
            // Envoyer la requête POST avec les données formData
            const authToken = localStorage.getItem("authToken");
            const response = await axios.post(
                "http://localhost:3001/GestionStocks/",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            // Réinitialiser les états et afficher une alerte de succès
            alert('Stock ajouté avec succès !');
            setDate(new Date(now).toISOString().split("T")[0]);
            setEntrées([{ dateEntrée: '', quantitéEntrée: 0, uniteEntrée: 'kg', raisonEntrée: '', prix: '' }]);
            setEmplacement('');
            setVille('');
            setLibellé('');
            setTypeStocks('');
            onCreate();
            console.log("Réponse du serveur :", response.data);
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du stock :", error);
        }
    };

    return (
        <div className="card" style={{ marginTop:"12%" }}>
            <form onSubmit={handleSubmit} style={{ marginTop: "5%" }}>
            <div className="card-body w-100">
            
                <h5 style={{ textAlign: "center" }}>Ajouter un Stock</h5>
                
                    <div className="mb-3" >
                        <label style={{ fontWeight: "bold" }}>Libellé :</label>
                        <input
                            type="text"
                            className="form-control"
                            name="libellé"
                            value={libellé}
                            onChange={(e) => setLibellé(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3" >
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
                    {entrées.map((entrée, index) => (
                        <div key={index} style={{ width: "116%" }}>
                            <div className="mb-3" style={{ width: "104%" }}>
                                <label style={{ fontWeight: "bold" }}>Date d'entrée :</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={entrée.dateEntrée}
                                    onChange={(e) => {
                                        const newEntrées = [...entrées];
                                        newEntrées[index].dateEntrée = e.target.value;
                                        setEntrées(newEntrées);
                                    }}
                                    required
                                />
                            </div>
                            <div className="mb-3" style={{display:"flex",width:"104%" }}>
                                <div className="mb-3" style={{ width: "50%" }}>
                                    <label style={{ fontWeight: "bold" }}>Quantité d'entrée</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={entrée.quantitéEntrée}
                                        onChange={(e) => {
                                            const newEntrées = [...entrées];
                                            newEntrées[index].quantitéEntrée = e.target.value;
                                            setEntrées(newEntrées);
                                        }}
                                        required
                                    />
                                </div>
                                <div style={{width:"50%",marginLeft:'2%', textAlign:'center'}}>
                                    <label style={{ fontWeight: "bold" }}>Unité</label>
                                    <select
                                        className="form-control"
                                        value={entrée.uniteEntrée}
                                        onChange={(e) => {
                                            const newEntrées = [...entrées];
                                            newEntrées[index].uniteEntrée = e.target.value;
                                            setEntrées(newEntrées);
                                        }}
                                        required
                                    >
                                        <option value="kg">kg</option>
                                        <option value="g">g</option>
                                        <option value="L">L</option>
                                        <option value="ml">ml</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3" >
                                <label style={{ fontWeight: "bold" }}>Raison d'entrée :</label>
                                <select
                                    className="form-control"
                                    value={entrée.raisonEntrée}
                                    onChange={(e) => {
                                        const newEntrées = [...entrées];
                                        newEntrées[index].raisonEntrée = e.target.value;
                                        setEntrées(newEntrées);
                                    }}
                                    required
                                >
                                    <option value="">Sélectionnez une raison</option>
                                    <option value="Achat">Achat</option>
                                    <option value="Production">Production</option>
                                    <option value="Don">Don</option>
                                    <option value="Autre">Autre</option>
                                </select>
                            </div>
                            <div className="mb-3" >
                                <label style={{ fontWeight: "bold" }}>Prix :</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={entrée.prix}
                                    onChange={(e) => {
                                        const newEntrées = [...entrées];
                                        newEntrées[index].prix = e.target.value;
                                        setEntrées(newEntrées);
                                    }}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                    <div className="mb-3" >
                        <label style={{ fontWeight: "bold" }}>Emplacement :</label>
                        <input
                            type="text"
                            className="form-control"
                            value={emplacement}
                            onChange={(e) => setEmplacement(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3" >
                        <label style={{ fontWeight: "bold" }}>Ville :</label>
                        <input
                            type="text"
                            className="form-control"
                            value={ville}
                            onChange={(e) => setVille(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3" >
                        <label style={{ fontWeight: "bold" }}>Type de Stocks :</label>
                        <select 
                            className="form-control"
                            value={typeStocks}
                            onChange={(e) => setTypeStocks(e.target.value)}
                            required
                        >
                            <option value="">Choisir..</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>{category.nom_categorie}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Enregistrer</button>
                
            </div>
            </form>
        </div>
    );
};

export default Ajouter;
