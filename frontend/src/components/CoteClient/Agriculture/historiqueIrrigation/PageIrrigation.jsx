import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../../Navbar';
import AjouterIrrigation from "./Ajouter"; 
import { FcDeleteRow } from "react-icons/fc";
import UpdateIrrigation from "./Update"; 
import { Table } from "react-bootstrap";
const PageIrrigation = () => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [typeFilter] = useState("");

    const fetchIrrigation = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/HistoriqueIrrigation/${id}`);
            setData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des données d\'irrigation:', error);
        }
    };

    useEffect(() => {
        fetchIrrigation();
    }, );

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet enregistrement d'irrigation ?");
            if (!confirmDelete) {
                return;
            }
            const updatedData = data.filter(item => item._id !== id);
            setData(updatedData);
            await axios.delete(`http://localhost:3001/HistoriqueIrrigation/${id}`);
            fetchIrrigation();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'enregistrement d\'irrigation :', error);
        }
    };

    const total = data.reduce((acc, item) => acc + item.coutTotal, 0);

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
                        <h4>Liste de suivi des Irrigations</h4>
                        <div style={{ marginTop: "5%"}}>
                            <Table responsive >
                                <thead className="thead-light">
                                    <tr style={{ fontWeight: "bold" }}>
                                    <th scope="col" style={{ background: "#70aca2" }}>Type d'Irrigation</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Date</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Durée (h)</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Prix par heure</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Coût Total</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Actions</th>
                                        <th scope="col" style={{ background: "#70aca2" }}>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((item, index) => (
                                        <tr key={index}>
                                            <td style={{ fontSize: "large" }}>{item.type}</td>
                                            <td style={{  fontSize: "large" }}>{new Date(item.date).toLocaleDateString('fr-FR', options)}</td>
                                            <td style={{ fontSize: "large",width:'90px' }}>{item.duree}</td>
                                            <td style={{ fontSize: "large",width:'105px' }}>{item.prixParHeure}</td>
                                            <td style={{ fontSize: "large",width:'100px' }}>{item.coutTotal}</td>
                                            <td style={{width:'80px'}}>
                                                <UpdateIrrigation onUpdate={fetchIrrigation} irrigationId={item._id} />
                                                <FcDeleteRow style={{ fontSize: "234%" }} onClick={() => handleDelete(item._id)} />
                                            </td>
                                            <td style={{ width:'90px' }}></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td  colSpan={6} ></td>
                                        
                                        <td style={{ fontSize: "large",width:'90px' }}>{total}</td>
                                    
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="col-md-4 mt-3">
                        <AjouterIrrigation onCreate={fetchIrrigation} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageIrrigation;
