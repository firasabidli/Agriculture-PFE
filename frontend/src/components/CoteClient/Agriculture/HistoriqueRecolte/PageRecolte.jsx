import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../../Navbar';
import AjouterRecolte from "./Ajouter"; 
import { FcDeleteRow } from "react-icons/fc";
import UpdateRecolte from "./Update"; 

const PageRecolte = () => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typeFilter, setTypeFilter] = useState("");

    const fetchRecolte = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/HistoriqueRecolte/${id}`);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de récolte:', error);
        }
    };

    useEffect(() => {
        fetchRecolte();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet enregistrement de récolte ?");
            if (!confirmDelete) {
                return;
            }
            const updatedData = data.filter(item => item._id !== id);
            setData(updatedData);
            await axios.delete(`http://localhost:3001/HistoriqueRecolte/${id}`);
            fetchRecolte();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'enregistrement de récolte :', error);
        }
    };

    const total = data.reduce((acc, item) => acc + item.revenuTotal, 0);

    useEffect(() => {
        if (typeFilter === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item => item.type === typeFilter);
            setFilteredData(filtered);
        }
    }, [typeFilter, data]);

    return (
        <div>
            <Navbar textColor="black" />
            <div className="container" style={{ marginTop: "9%" }}>
                <div className="row">
                    <div className="col-xl-8">
                        <h4>Liste de suivi des Récoltes</h4>
                        <div style={{ marginTop: "5%", marginRight: "28%", marginLeft: "-153px" }}>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr style={{ fontWeight: "bold" }}>
                                        
                                        <th scope="col" style={{ background: "#70aca2" }}>Date</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Nombre de Balle</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix de vente Balle</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix Total Balle </th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Quantité (kg)</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix par Quantite</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix Total vente</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Revenu Total</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ width: "1%", fontSize: "large" }}>{new Date(item.date).toLocaleDateString('fr-FR', options)}</td>
                                            <td style={{ fontSize: "large" }}>{item.balles[0].nombreBalles}</td>
                                            <td style={{ fontSize: "large" }}>{item.balles[0].prixVenteParBalle}</td>
                                            <td style={{ fontSize: "large" }}>{item.balles[0].prixTotalBalle}</td>
                                            <td style={{ fontSize: "large" }}>{item.quantites[0].quantite}{item.quantites[0].unite}</td>
                                            <td style={{ fontSize: "large" }}>{item.quantites[0].prix}</td>
                                            <td style={{ fontSize: "large" }}>{item.quantites[0].prixTotalVente}</td>
                                            <td style={{ fontSize: "large" }}>{item.revenuTotal}</td>
                                            <td>
                                                <UpdateRecolte onUpdate={fetchRecolte} recolteId={item._id} />
                                                <FcDeleteRow style={{ fontSize: "234%" }} onClick={() => handleDelete(item._id)} />
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td style={{ fontSize: "large" }}>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td style={{ fontSize: "large" }}>{total}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <AjouterRecolte onCreate={fetchRecolte} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageRecolte;
