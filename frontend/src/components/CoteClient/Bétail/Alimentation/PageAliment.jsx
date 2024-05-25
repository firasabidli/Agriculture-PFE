import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Navbar from '../../Navbar';
import AjouterAliment from "./Ajouter";
import EditAliment from "./Update";
import DeleteAliment from "./DeleteAliment";

const PageAliment = () => {
    const [alimentsData, setAlimentsData] = useState([]);
    const user = localStorage.getItem("user");
    const idAgriculteur = user ? JSON.parse(user)._id : null;
    const { id } = useParams();
    
    const fetchAliments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/AlimentsAnimal/${idAgriculteur}/${id}`);
            if (Array.isArray(response.data.data)) {
                setAlimentsData(response.data.data);
            } else {
                console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    useEffect(() => {
        fetchAliments();
    }, [id]);

    const calculateTotalPrice = () => {
        return alimentsData.reduce((total, item) => total + item.total, 0);
    };

    return (
        <div>
            <Navbar textColor="black" />
            <div className="container" style={{ marginTop: "15%" }}>
                <div className="row">
                    <div className="col-md-8">
                        <h4 className='p-3 text-center'>Liste de suivi Aliments </h4>
                        {alimentsData.length < 1 ? 
                            <div className='text-center p-5'><b>Auccune données disponible</b></div> :
                            <Table responsive size="md">
                                <thead>
                                    <tr>
                                        <th scope="col" style={{ background: "#70aca2", textAlign:'center' }}>ID</th>
                                        <th scope="col" style={{ background: "#70aca2", textAlign:'center' }}>Date d'Achat</th>
                                        <th scope="col" style={{ background: "#70aca2", textAlign:'center' }}>Aliments</th>
                                        <th scope="col" style={{ background: "#70aca2", textAlign:'center' }}>Quantite</th>
                                        <th scope="col" style={{ background: "#70aca2", textAlign:'center' }}>Prix en DT</th>
                                        <th scope="col" style={{ background: "#70aca2", textAlign:'center' }}>Total</th>
                                        <th scope="col" style={{ background: "#70aca2",textAlign:'center' }}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alimentsData.map((item, index) => (
                                        <tr key={item._id} className="alert" role="alert">
                                            <td style={{width:'20px',textAlign:'center'}}>{index}</td>
                                            <td className='td-title'>{new Date(item.dateAchat).toLocaleDateString()}</td>
                                            <td>{item.aliments}</td>
                                            <td>{item.quantite} {item.unite}</td>
                                            <td>{item.prix}</td>
                                            <td>{item.total}</td>
                                            <td style={{width:'80px'}}>
                                                <EditAliment alimentId={item._id} aliment={item} onUpdate={fetchAliments} /> 
                                                <DeleteAliment alimentId={item._id} onDelete={fetchAliments} />  
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan='6' style={{textAlign:'right',backgroundColor:'#70aca2',color:'white'}}> 
                                            <b> Prix Total en DT: <span>{calculateTotalPrice()}</span></b>
                                        </td>
                                    </tr>
                                </tfoot>
                            </Table>
                        }
                    </div>
                    <div className="col-md-4">
                        <AjouterAliment onCreate={fetchAliments} AnimalId={id} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageAliment;
