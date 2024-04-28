import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../../Navbar';
import AjouterMainOeuvre from "./Ajouter";
import { FcDeleteRow } from "react-icons/fc";
import UpdateMainOeuvre from "./Update";

const PageMainOeuvre = () => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typeFilter, setTypeFilter] = useState("");

    const fetchMainOeuvre = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/HistoriqueMainOeuvre/${id}`);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données de la main d\'œuvre:', error);
        }
    };

    useEffect(() => {
        fetchMainOeuvre();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet enregistrement de main d'œuvre ?");
            if (!confirmDelete) {
                return;
            }
            const updatedData = data.filter(item => item._id !== id);
            setData(updatedData);
            await axios.delete(`http://localhost:3001/HistoriqueMainOeuvre/${id}`);
            fetchMainOeuvre();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'enregistrement de main d\'œuvre :', error);
        }
    };

    const total = data.reduce((acc, item) => acc + item.prixTotal, 0);

    useEffect(() => {
        if (typeFilter === "") {
            setFilteredData(data);
        } else {
            const filtered = data.filter(item => item.typeTravail === typeFilter);
            setFilteredData(filtered);
        }
    }, [typeFilter, data]);

    return (
        <div>
            <Navbar textColor="black" />
            <div className="container" style={{ marginTop: "9%" }}>
                <div className="row">
                    <div className="col-xl-8">
                        <h4>Liste de suivi des Main d'œuvre</h4>
                        <div style={{ marginTop: "5%", marginRight: "28%", marginLeft: "-153px" }}>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr style={{ fontWeight: "bold" }}>
                                    <th scope="col" style={{ background: "#70aca2" }}>Type Travail</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Nom</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Date</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Nombre d'heures</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix par heure</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix Total</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ fontSize: "large" }}>{item.typeTravail}</td>
                                            <td style={{ fontSize: "large" ,width: "1%"}}>{item.nom}</td>
                                            <td style={{ width: "1%", fontSize: "large" }}>{new Date(item.dateTravail).toLocaleDateString('fr-FR', options)}</td>
                                            <td style={{ fontSize: "large" }}>{item.nombreHeures}</td>
                                            <td style={{ fontSize: "large" }}>{item.prixParHeure}</td>
                                            <td style={{ fontSize: "large" }}>{item.prixTotal}</td>
                                            <td>
                                                <UpdateMainOeuvre onUpdate={fetchMainOeuvre} mainOeuvreId={item._id} />
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
                        <AjouterMainOeuvre onCreate={fetchMainOeuvre} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageMainOeuvre;
