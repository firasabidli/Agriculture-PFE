import React, { useEffect, useState } from 'react';
import './ListAnimal.css'
import { Dropdown } from 'react-bootstrap';
import Navbar from '../../Navbar';
import Carousel from './Carousel.jsx';
import Details from './Details.jsx';
import Add from './Add';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UpdateAgriculture from './Update.jsx';
const GestionStock = () => {
    const [culture, setCulture] = useState([]);
    
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const [selectedCultureId, setSelectedCultureId] = useState(null);
    const [selecteddetailsId, setSelecteddetailsId] = useState(null);

    const handleDetailsClick = (Id) => {
        console.log("cultur",Id)
        setSelecteddetailsId(Id);
    };

    const handleCloseDetailsModal = () => {
        setSelecteddetailsId(null);
        fetchStockByAgriculteur();
    };
    const handleUpdateClick = (cultureId) => {
        setSelectedCultureId(cultureId);
    };
    const handleCloseModal = () => {
        setSelectedCultureId(null);
        fetchStockByAgriculteur();
    }

    useEffect(() => {
        fetchStockByAgriculteur();
    }, []);

    const fetchStockByAgriculteur = async () => {
        try {
            const authToken = localStorage.getItem('authToken');
            const response = await axios.get('http://localhost:3001/GestionStocks', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setCulture(response.data);
            console.log("bb",response.data);
            
        } catch (error) {
            console.error('Erreur lors de la récupération des agricultures de l\'agriculteur:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
            if (!confirmDelete) {
                return;
            }

            const updatedData = culture.filter(item => item._id !== id);
            setCulture(updatedData);
           
            await axios.delete(`http://localhost:3001/GestionStocks/${id}`);
            fetchStockByAgriculteur();
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'élément :', error);
        }
    };
    const handleFactureClick = (id) =>{
        return `/agriculture/FactureStocks/${id}`;
    }
    return (
        <div>
            <Navbar textColor="white" />
            <Carousel />
            <div className="containerList" style={{ marginTop: "3%" }}>
                <div className="row">
                    <div className="col-md-7 ">
                        <div className="page-content page-container" id="page-content">
                            <div className="padding">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="animal-list">
                                            {culture.length > 0 ? (
                                                culture.map((element) => (
                                                    <div className="container-fluid d-flex justify-content-center" key={element._id}>
                                                        <div className="list list-row card" style={{ width: "100%" }} >
                                                            <div className="list-item" data-id="">
                                                                <div><a href="x"><span className="w-40 avatar gd-primary">S</span></a></div>
                                                                <div className="flex">
                                                                    <a href="x" className="item-author text-color">libellé: {element.libellé}</a>
                                                                    <br />
                                                                    <div className="item-except text-muted text-sm h-1x">Date Enregistrement: {new Date(element.date).toLocaleDateString('fr-FR', options)}</div>
                                                                </div>
                                                                <div className="no-wrap">
                                                                    <div className="item-date text-muted text-sm d-none d-md-block"></div>
                                                                </div>
                                                                <div>
                                                                    <Dropdown align="end">
                                                                        <Dropdown.Toggle className='eviteHover' style={{background:"white", color:"black", border:"none"}} >
                                                                            <Dropdown.Menu>
                                                                            {element.sortie.some((sortie) => sortie.raisonSortie === "Vente") && (
                                                                                <Dropdown.Item ><Link className="dropdown-item" to={ handleFactureClick(element._id)}  >Voir Facture</Link></Dropdown.Item>
                                                                            )}
                                                                            <p  className="dropdown-item" onClick={() => handleDetailsClick(element._id)} style={{fontFamily:"Arial"}}>Détails</p>
                                                                            <p  className="dropdown-item text-success" onClick={() => handleUpdateClick(element._id)} style={{fontFamily:"Arial"}}>Modifier</p>
                                                                                <Dropdown.Divider />
                                                                                <Dropdown.Item className="text-danger" onClick={() => handleDelete(element._id)}>
                                                                                    Supprimer
                                                                                </Dropdown.Item>
                                                                            </Dropdown.Menu>
                                                                        </Dropdown.Toggle>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <p style={{ fontFamily: "arial", fontSize: "x-large", marginLeft: "15%" }}>Aucun élément de stock trouvé.</p>
                                            )}
                                             <UpdateAgriculture stockId={selectedCultureId} onClose={handleCloseModal} />
                                             <Details Id={selecteddetailsId} onClose={handleCloseDetailsModal} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5">
                    <Add onCreate={fetchStockByAgriculteur} />
                    </div>
                </div>
            </div>
            
        </div>
    );
}
export default GestionStock;
