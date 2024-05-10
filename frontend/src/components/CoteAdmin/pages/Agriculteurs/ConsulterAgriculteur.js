import React, { useState, useEffect } from "react";
import Sidebar from '../../Sidebar';
import Header from '../../Header';
import axios from "axios";
import TextField from '@mui/material/TextField';
const ConsulterAgriculteur = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [page] = useState('ConsulterAgriculteur');
    const [isActive] = useState(true);
    const [displayedData, setDisplayedData] = useState([]);
    const [data, setData] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // fetchData function
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/auth/user');
            if (Array.isArray(response.data)) {
                setData(response.data);
                setDisplayedData(response.data); // Afficher les données complètes initialement
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

    // Fonction pour cocher/décocher toutes les cases à cocher
    const handleSelectAllCheckbox = (event) => {
        const isChecked = event.target.checked;
        setSelectAllChecked(isChecked);
        // Mettre à jour l'état de chaque élément de données pour correspondre à l'état de la case à cocher de l'en-tête
        setDisplayedData(displayedData.map(item => ({ ...item, isChecked })));
    };

    // Fonction pour filtrer les données en fonction de la valeur de recherche
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        const filteredData = data.filter(item => item.gouvernorat.nom.toLowerCase().includes(value.toLowerCase()));
        setDisplayedData(filteredData);
    };

    return (
        <div className='wrapper'>
            <Sidebar isSidebarCollapsed={isSidebarCollapsed} page={page} isActive={isActive}/>
            <div className="flex-grow-1">
                <Header toggleSidebar={toggleSidebar}/>
                <main className='stock-container'>
                    <div className='main-ajoute'>
                        <h1>hi</h1>
                    </div>
                    <div className='main-title'>
                        <div className='List-title'>
                            <h5>Consulter les Agriculteurs</h5>
                            <span className='style-line'></span>
                        </div>
                        <section class="ftco-section">
                            <div class="container-materiel">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-wrap">
                                            <div className="search-container">
                                            <TextField
                                                placeholder="rechercher"
                                                class='rechercher'
                                                type="search"
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                style={{width:"50%"}}
                                                value={searchValue}
                                                onChange={handleSearch}
                                            />
                                            </div>
                                            {displayedData.length === 0 ? (
                                                <p>Aucune donnée disponible</p>
                                            ) : (
                                                <table className="table text-center">
                                                    <thead className="thead-dark">
                                                        <tr>
                                                            <th>
                                                                <div class="form-check">
                                                                    <input
                                                                        class="form-check-input"
                                                                        type="checkbox"
                                                                        value=""
                                                                        id="flexCheckDefault"
                                                                        checked={selectAllChecked}
                                                                        onChange={handleSelectAllCheckbox}
                                                                    />
                                                                    ID no.
                                                                </div>
                                                            </th>
                                                            <th>Nom</th>
                                                            <th>Gouvernant</th>
                                                            <th>email</th>
                                                            <th>numeroTelephone</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {displayedData.map((item, index) => (
                                                            <tr key={item._id} className="alert" role="alert">
                                                                <td>
                                                                    <div class="form-check">
                                                                        <input
                                                                            class="form-check-input"
                                                                            type="checkbox"
                                                                            value=""
                                                                            id={`flexCheckDefault${index}`}
                                                                            checked={item.isChecked || false}
                                                                            onChange={(event) => {
                                                                                const isChecked = event.target.checked;
                                                                                setDisplayedData(displayedData.map((data, dataIndex) => {
                                                                                    if (index === dataIndex) {
                                                                                        return { ...data, isChecked };
                                                                                    }
                                                                                    return data;
                                                                                }));
                                                                            }}
                                                                        />
                                                                        {index}
                                                                    </div>
                                                                </td>
                                                                <td className='td-im w-25'>{item.nom}</td>
                                                                <td className='td-title'>{item.gouvernorat.nom}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.numeroTelephone}</td>
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
}

export default ConsulterAgriculteur;
