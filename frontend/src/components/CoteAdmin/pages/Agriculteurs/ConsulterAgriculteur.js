import React, { useState, useEffect } from "react";
import Sidebar from '../../Sidebar';
import Header from '../../Header';
import axios from "axios";
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const ConsulterAgriculteur = () => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [page] = useState('ConsulterAgriculteur');
    const [isActive] = useState(true);
    const [displayedData, setDisplayedData] = useState([]);
    const [data, setData] = useState([]);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const [selectedAgriculteurs, setSelectedAgriculteurs] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture du modèle

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    // fetchData function
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Agriculteur/user');
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
        // Mettre à jour la liste des agriculteurs sélectionnés
        setSelectedAgriculteurs(isChecked ? displayedData.filter(item => item.isChecked) : []);
    };

    // Fonction pour gérer le changement d'état de la case à cocher individuelle
    const handleCheckboxChange = (event, index) => {
        const isChecked = event.target.checked;
        setDisplayedData(displayedData.map((data, dataIndex) => {
            if (index === dataIndex) {
                return { ...data, isChecked };
            }
            return data;
        }));
        // Mettre à jour la liste des agriculteurs sélectionnés
        const selectedAgriculteursUpdated = isChecked
            ? [...selectedAgriculteurs, displayedData[index]]
            : selectedAgriculteurs.filter(agriculteur => agriculteur._id !== displayedData[index]._id);
        setSelectedAgriculteurs(selectedAgriculteursUpdated);
    };

    // Fonction pour filtrer les données en fonction de la valeur de recherche
    const handleSearch = (event) => {
        const value = event.target.value;
        setSearchValue(value);
        const filteredData = data.filter(item => item.gouvernorat.nom.toLowerCase().includes(value.toLowerCase()));
        setDisplayedData(filteredData);
    };

    // Fonction pour ouvrir le modèle
    const openModal = () => {
        setIsModalOpen(true);
    };

    // Fonction pour fermer le modèle
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Fonction pour envoyer un message aux agriculteurs sélectionnés
    const sendMessageToSelectedAgriculteurs = async () => {
        if (selectedAgriculteurs.length === 0) {
            console.error("Aucun agriculteur sélectionné pour l'envoi du message.");
            return;
        }

        if (!message.trim()) {
            console.error("Le message est vide.");
            return;
        }

        try {
            // Envoyer un message à chaque agriculteur sélectionné
            const response = await axios.post('http://localhost:3001/Agriculteur/', {
                selectedAgriculteursIds: selectedAgriculteurs.map(agriculteur => agriculteur._id),
                message: message
            });

            console.log("Message envoyé avec succès aux agriculteurs sélectionnés :", response.data);
            // Réinitialiser le champ de message après l'envoi
            setMessage('');
            // Fermer le modèle après l'envoi
            closeModal();
        } catch (error) {
            console.error("Erreur lors de l'envoi du message :", error);
        }
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
                            <div  style={{display:"flex"}}>
                            <h5>Consulter les Agriculteurs</h5>
                            <button style={{width:"20%",marginLeft:"50%",marginTop:"15px",background:"dodgerblue",border:"dodgerblue",borderRadius:"6px",color:"white",height:"40px"}} onClick={openModal}>Envoyer un message</button>
                            </div>
                            
                            <span className='style-line'>
                            </span>
                        </div>
                        <section class="ftco-section">
                            <div class="container-materiel">
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="table-wrap">
                                            <div className="search-container" style={{display:"flex"}}>
                                                <TextField
                                                    placeholder="Rechercher par gouvernant"
                                                    class='rechercher'
                                                    type="search"
                                                    fullWidth
                                                    value={searchValue} onChange={handleSearch}
                                                    style={{width:"70%"}}
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
                                                                            onChange={(event) => handleCheckboxChange(event, index)}
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
                    {/* Modèle pour le message */}
                    <Modal
                        open={isModalOpen}
                        onClose={closeModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
                            <h2 id="modal-modal-title">Envoyer un message</h2>
                            <TextField
                                placeholder="Entrez votre message ici..."
                                multiline
                                fullWidth
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                            />
                            <button style={{ marginLeft: "10px",marginTop:"10px", width: "50%", background: "dodgerblue", border: "dodgerblue", borderRadius: "6px", color: "white", height: "40px" }} onClick={sendMessageToSelectedAgriculteurs}>Envoyer</button>
                        </Box>
                    </Modal>
                </main>
            </div>
        </div>
    );
}

export default ConsulterAgriculteur;
