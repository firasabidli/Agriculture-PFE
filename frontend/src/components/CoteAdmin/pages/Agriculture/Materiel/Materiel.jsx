import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Sidebar';
import Header from '../../../Header';
import './Materiel.css'
import TextField from '@mui/material/TextField';

import Delete from './Delete';
import Update from './Update';

import Add from './Add';


const Materiel = () => {
    const [data, setData] = useState([]);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [page] = useState('Materiel');
    const [isActive] = useState(true);
    const [query, setQuery] = useState('');
    const [displayedData, setDisplayedData] = useState([]);

    const handleSearch = () => {
        const filteredData = data.filter(item =>
            item.nom.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedData(filteredData);
    };

    // fetchData function
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Materiel');
            if (Array.isArray(response.data.data)) {
                setData(response.data.data);
                setDisplayedData(response.data.data); // Afficher les données complètes initialement
            } else {
                console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
        <div className='wrapper'>
            <Sidebar isSidebarCollapsed={isSidebarCollapsed} page={page} isActive={isActive}/>
            <div className="flex-grow-1"> 
                <Header toggleSidebar={toggleSidebar}/>
                <main className='stock-container'>
                    <div className='main-ajoute'>
                        <Add onCreate={fetchData}/>
                    </div>
                    <div className='main-title'>
                        <div className='List-title'>
                            <h5>Liste d'Equipement</h5>
                            <span className='style-line'></span>
                            <TextField
						placeholder="rechercher"
						class='rechercher'
						type="search"
						variant="outlined"
						fullWidth
						size="small"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								handleSearch();
							}
						}}
					/>
                        </div>
                        <section className="ftco-section"> {/* Changed class to className */}
                            <div className="container-materiel"> {/* Changed class to className */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            {displayedData.length === 0 ? (
                                                <p>Aucune donnée disponible</p>
                                            ) : (
                                                <table className="table text-center">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>ID no.</th>
                                                            <th>Image</th>
                                                            <th>Nom</th>
                                                            <th>description</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {displayedData.map((item, index) => (
                                                            <tr key={item._id} className="alert" role="alert">
                                                                <td>{index}</td>
                                                                <td className='td-im' >
                                                                    {item.image_materiel && (
                                                                        <img src={item.image_materiel} className='td-image' style={{width:'120px',textAlign:'center'}} alt='Materiel'/>
                                                                    )}
                                                                </td>
                                                                <td className='td-title'>{item.nom}</td> {/* Changed nom to name */}
                                                                <td>{item.description}</td>
                                                                <td >
                                                                    <div className='action ' style={{marginLeft:'100px'}}>
                                                                        <Update materielId={item._id} onUpdate={fetchData}/> {/* Removed () from fetchData */}
                                                                        <Delete materielId={item._id} onDelete={fetchData}/> {/* Removed () from fetchData */}
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Materiel;
