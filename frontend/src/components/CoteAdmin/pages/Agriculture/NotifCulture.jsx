import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
//import { MdNotifications } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
const NotifCulture = () => {
    const [remarques, setRemarques] = useState([]);
    const [showAlerts, setShowAlerts] = useState(false);
    const [showRemarques, setShowRemarques] = useState(false);
    const [selectedAgriculteur, setSelectedAgriculteur] = useState(null);
    const fetchRemarques = async () => {
        try {
            const response = await axios.get('http://localhost:3001/RemarqueAgriculture/');
            setRemarques(response.data);
            //alert(response.data[0]._id)
            // const updatedRemarques = response.data.map(rem => ({ ...rem, vu: false }));
            // setRemarques(updatedRemarques);
        } catch (error) {
            console.error('Erreur lors de la récupération des remarques :', error);
        }
    };
    useEffect(() => {
        fetchRemarques();
    }, []);
    const Supprimer= async (id)=>{
        try {
			// Afficher une alerte pour demander confirmation
			const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
			if (!confirmDelete) {
				return;
			}
	
			const updatedData = remarques.filter(item => item._id !== id);
            setRemarques(updatedData);
	
			await axios.delete(`http://localhost:3001/RemarqueAgriculture/${id}`);
            fetchRemarques();
				
		} catch (error) {
			console.error('Erreur lors de la suppression de l\'élément :', error);
		}
    }
    const formatDate = (dateTimeString) => {
        const dateEnregistrement = moment(dateTimeString);
        const differenceMinutes = moment().diff(dateEnregistrement, 'minutes');
        if (differenceMinutes < 60) {
            return `Il y a ${differenceMinutes} minute${differenceMinutes > 1 ? 's' : ''}`;
        } else {
            const differenceHours = Math.floor(differenceMinutes / 60);
            const remainingMinutes = differenceMinutes % 60;
            return `Il y a ${differenceHours} heure${differenceHours > 1 ? 's' : ''} et ${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
        }
    };
    const handleNotificationClick = () => {
        setShowAlerts(!showAlerts);
    };

    const handleShowRemarquesClick = () => {
        setShowRemarques(true);
    };
    const handleAgriculteurClick = (agriculteur) => {
        setSelectedAgriculteur(agriculteur);
    };
    const handleCommentaireVu = async (id) => {
        try {
            await axios.put(`http://localhost:3001/RemarqueAgriculture/${id}`, { visible: 1 });
            const updatedRemarques = remarques.map(rem => rem._id === id ? { ...rem, visible: 1 } : rem);
            setRemarques(updatedRemarques);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de la visibilité du commentaire depuis le front-end :', error);
        }
    };
    return (
        <div>
            <div className='notification_nombre'>
                <div>
                    <IoMdNotifications className=' icon-header-notif notification' style={{marginLeft:"-70%",marginRight:"61%",fontSize: "169%"}} onClick={handleNotificationClick} />
                </div>
            
            {remarques.length > 0 && (
                <span className="notification-count badge">{remarques.length}</span>
            )}
            </div>
            {showAlerts && (
                <ul className="dropdown-menu position-fixed d-grid gap-1 p-2  mx-0 shadow" style={{ marginTop: "9px", width: " 28rem" }}>
                    <li style={{ backgroundColor: "rgb(231, 212, 212)", height: "50px" }}>
                        <h5 style={{ textAlign: "center", marginTop: "10px" }}>Notifications</h5>
                    </li>
                    <li>
                        <button className='button-notif' onClick={handleShowRemarquesClick}>Commentaire</button>
                        {/* <button className='button-notif'>Utilisateur</button>
                        <button className='button-notif'>Utilisateur</button> */}
                    </li>
                    {showRemarques && remarques.map((req, index) => (
                        <li key={index}>
                            <div className={`alert ${req.visible === 0 ? 'alert-primary' : 'alert-secondary'}`} role="alert" onClick={() => handleCommentaireVu(req._id)}>
                            {console.log("req.visible:", req.visible)}
                                <div class="d-flex justify-content-between">
                                    <div>
                                    <div onClick={() => handleAgriculteurClick(req.Agriculteur)}>
                                    <img
                                        src={req.Agriculteur.image && req.Agriculteur.image.startsWith('http') ? req.Agriculteur.image : `http://localhost:3001/images/Utilisateur/Agriculteur/${req.Agriculteur.image}`}
                                        alt={req.Agriculteur.image}
                                        width="32"
                                        height="32"
                                        className="rounded-circle"
                                    />
                                        <span style={{marginLeft:'10px',fontWeight:"bold", color:"black"}}>{req.Agriculteur.nom || 'User'}</span>
                                        </div>
                                        {/* <h5>{req.Agriculteur.nom}</h5> */}
                                        <h6 class="mb-0" style={{marginTop:"10px"}}>{req.option_Commentaire}:<span> {req.nom_culture}</span></h6>
                                        <p>{req.commentaire}</p>
                                    </div>
                                    <small class="opacity-50 text-nowrap" style={{ marginLeft: "-10%",marginTop:"20%" }}>{formatDate(req.date_enregistrement)}</small>
                                    <button type="button" class="btn-close" onClick={() =>Supprimer(req._id)}></button>
                                </div>
                            </div>
                        </li>
                    ))}
                     {/* Mini-modal pour afficher les détails de l'agriculteur */}
            {selectedAgriculteur && (
                <div className="overlay" onClick={() => setSelectedAgriculteur(null)}>
             <ul className="dropdown-menu position-fixed d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px" style={{ top:'140px', zIndex: 2, right:'10%' }}>
            
            <li className="dropdown-item rounded-2"> 
            <img src={selectedAgriculteur.image && selectedAgriculteur.image.startsWith('http') ? selectedAgriculteur.image : `http://localhost:3001/images/Utilisateur/Agriculteur/${selectedAgriculteur.image}`}
                 alt={selectedAgriculteur.image}
                 width="30"
                 height="35"
                className="rounded-circle"/><span style={{marginLeft:"10%",fontWeight:"bold"}}>{selectedAgriculteur.nom}</span></li>
                <li className="dropdown-item rounded-2"> <span style={{fontWeight:"bold"}}>Email:</span> {selectedAgriculteur.email} </li>
                <li className="dropdown-item rounded-2"><span style={{fontWeight:"bold"}}>Gouvernant:</span> {selectedAgriculteur.gouvernorat.nom} </li>
            </ul>
            </div>
            )}
                </ul>
            )}
        </div>
    );
}

export default NotifCulture;
