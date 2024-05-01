import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../../Navbar';
import Ajouter from "./Ajouter";

import { FcDeleteRow } from "react-icons/fc";
import Update from "./Update";

const PageEngrais = () => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const { id } = useParams();
    const [Data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typeFilter, setTypeFilter] = useState("");

    const fetchByAgriculteur = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/HistoriqueEngrais/${id}`);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'agriculteur:', error);
        }
    };

    useEffect(() => {
        fetchByAgriculteur();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
            if (!confirmDelete) {
                return;
            }
            const updatedData = Data.filter(item => item._id !== id);
            setData(updatedData);
            await axios.delete(`http://localhost:3001/HistoriqueEngrais/${id}`);
            fetchByAgriculteur();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'élément :', error);
        }
    };

    // Calcul du total des prix
    const total = Data.reduce((acc, item) => acc + item.prixTotalPro, 0);
    useEffect(() => {
        if (typeFilter === "") {
            setFilteredData(Data);
        } else {
            const filtered = Data.filter(item => item.type === typeFilter);
            setFilteredData(filtered);
        }
    }, [typeFilter, Data]);

    return (
        <div>
            <Navbar textColor="black" />
            <div className="container" style={{ marginTop: "9%" }}>
                <div className="row">
                    <div className="col-xl-8">
                        <h4>Liste de suivi des Engrais</h4>
                        <div style={{ marginTop: "5%", marginRight: "28%", marginLeft: "-153px" }}>
                            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}className="select3"> 
                                   <option value="">Filtre par  Types</option>
                                   <option value="Pesticide">Pesticide</option>
                                    <option value="Engrais">Engrais</option>
                            </select>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr style={{ fontWeight: "bold" }}>
                                        <th style={{ background: "#70aca2" }}>Type</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Nom</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Quantité</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Date</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>PrixTotal</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index} >
                                            <td style={{ fontSize: "large" }}>{item.type}</td>
                                            <td style={{ fontSize: "large" }}>{item.nom}</td>
                                            <td style={{ fontSize: "large" }}>{item.quantite}{item.unite}</td>
                                            <td style={{ width: "1%", fontSize: "large" }}>{new Date(item.dateApplication).toLocaleDateString('fr-FR', options)}</td>
                                            <td style={{ fontSize: "large" }}>{item.prix}</td>
                                            <td style={{ fontSize: "large" }}>{item.prixTotalPro}</td>
                                            <td>
                                                <Update onUpdate={fetchByAgriculteur} engraisId={item._id}></Update>
                                                {/* <CiEdit style={{ fontSize: "234%" }} /> */}
                                                <FcDeleteRow style={{ fontSize: "234%" }} onClick={() => handleDelete(item._id)} />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td style={{ fontSize: "large" }}>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td style={{ fontSize: "large" }}>{total}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <Ajouter onCreate={fetchByAgriculteur} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageEngrais;
