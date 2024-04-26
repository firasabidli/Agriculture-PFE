import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Navbar from '../../Navbar';
import AjouterSanté from "./Ajouter";

const PageEngrais = () => {
    const { id } = useParams();
    const [Data, setData] = useState([]);

    const fetchByAgriculteur = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/HistoriqueEngrais/${id}`);
            setData(response.data);
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

            await axios.delete(`http://localhost:3001/HistoriqueEngrais/${id}`);
            fetchByAgriculteur();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'élément :', error);
        }
    };

    // Calcul du total des prix
    const total = Data.reduce((acc, item) => acc + item.prix, 0);

    return (
        <div>
            <Navbar textColor="black" />
            <div className="container" style={{ marginTop: "9%" }}>
                <div className="row">
                    <div className="col-xl-8">
                        <h4>Liste de suivi des Engrais</h4>
                        <div style={{ marginTop: "5%", marginRight: "28%", marginLeft: "-153px" }}>
                        <table class="table caption-top">
  <caption>List of users</caption>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        
                                        <th scope="col">Type</th>
                                        <th scope="col">Quantité</th>
                                        <th scope="col">Date d'application</th>
                                        <th scope="col">Prix</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Data.map((item, index) => (
                                        <tr key={index}>
                                            
                                            <td>{item.type}</td>
                                            <td>{item.quantite}</td>
                                            <td style={{width:"1%"}}>{item.dateApplication}</td>
                                            <td>{item.prix}</td>
                                        </tr>
                                    ))}
                                    {/* <tr>
                                        <td colSpan="4" className="text-end">Total</td>
                                        <td>{total}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <AjouterSanté onCreate={fetchByAgriculteur} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageEngrais;
