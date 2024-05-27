import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../../Navbar';
import AjouterEquipement from "./Ajouter"; // Assurez-vous d'avoir le bon composant d'ajout d'équipement
import { FcDeleteRow } from "react-icons/fc";
import UpdateEquipement from "./Update"; // Assurez-vous d'avoir le bon composant de mise à jour d'équipement
import { Table } from "react-bootstrap";
const PageEquipement = () => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typeFilter, setTypeFilter] = useState("");

    const fetchEquipement = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/HistoriqueEquipement/${id}`);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données des équipements:', error);
        }
    };

    useEffect(() => {
        fetchEquipement();
    }, []);

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet équipement ?");
            if (!confirmDelete) {
                return;
            }
            const updatedData = data.filter(item => item._id !== id);
            setData(updatedData);
            await axios.delete(`http://localhost:3001/HistoriqueEquipement/${id}`);
            fetchEquipement();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'équipement :', error);
        }
    };

    const total = data.reduce((acc, item) => acc + item.prixTotalEq, 0);
    
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
                    <div className="col-md-8">
                        <h4>Liste de suivi des Equipements</h4>
                        <div style={{ marginTop: "5%"}}>
                            {/* <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                                   <option value="">Filtre par Types</option>
                                   <option value="Pesticide">Pesticide</option>
                                   <option value="Engrais">Engrais</option>
                            </select> */}
                            <Table responsive>
                                <thead className="thead-light">
                                    <tr style={{ fontWeight: "bold" }}>
                                        <th scope="col" style={{ background: "#70aca2" }}>Nom</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Date</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>nombreHeures</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix d'Heure</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix Total</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Actions</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ fontSize: "large" }}>{item.nom}</td>
                                            <td style={{ width: "1%", fontSize: "large" }}>{new Date(item.date).toLocaleDateString('fr-FR', options)}</td>
                                            <td style={{ fontSize: "large" }}>{item.nombreHeures}</td>
                                            <td style={{ fontSize: "large" }}>{item.prixParHeure}</td>
                                            <td style={{ fontSize: "large" }}>{item.prixTotalEq}</td>
                                            <td>
                                                <UpdateEquipement onUpdate={fetchEquipement} equipementId={item._id} />
                                                <FcDeleteRow style={{ fontSize: "234%" }} onClick={() => handleDelete(item._id)} />
                                            </td>
                                            <td></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        
                                        <td colSpan={6}></td>
                                        <td  style={{ fontSize: "large"}}>{total}</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <AjouterEquipement onCreate={fetchEquipement} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageEquipement;
