import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { MdNotifications } from "react-icons/md";

const NotifCulture = () => {
    const [remarques, setRemarques] = useState([]);
    const [showAlerts, setShowAlerts] = useState(false);
    const [showRemarques, setShowRemarques] = useState(false);
    // const [readAlert, setReadAlert] = useState(false);
    const fetchRemarques = async () => {
        try {
            const response = await axios.get('http://localhost:3001/RemarqueAgriculture/');
            setRemarques(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des remarques :', error);
        }
    };
    useEffect(() => {
        fetchRemarques();
    }, []);
    const supprimer= async (id)=>{
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
        setShowRemarques(true); // Afficher les remarques lorsque le bouton "Remarque" est cliqué
    };

    return (
        <div>
            <div className='notification_nombre'>
                <div>
                    <MdNotifications className='icon icon-header-notif notification' onClick={handleNotificationClick} />
                </div>
            
            {remarques.length > 0 && (
                <span className="notification-count badge">{remarques.length}</span>
            )}
            </div>
            {showAlerts && (
                <ul className="dropdown-menu position-fixed d-grid gap-1 p-2  mx-0 shadow" style={{ marginTop: "9px", width: " 30rem" }}>
                    <li style={{ backgroundColor: "rgb(231, 212, 212)", height: "50px" }}>
                        <h5 style={{ textAlign: "center", marginTop: "10px" }}>Notifications</h5>
                    </li>
                    <li>
                        <button className='button-notif' onClick={handleShowRemarquesClick}>Remarque</button>
                        <button className='button-notif'>Utilisateur</button>
                        <button className='button-notif'>Utilisateur</button>
                    </li>
                    {showRemarques && remarques.map((req, index) => (
                        <li key={index}>
                            <div class="alert alert-primary" role="alert">
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <h6 class="mb-0">{req.option_Remarque}:<span> {req.nom_culture}</span></h6>
                                        <p>{req.Remarque}</p>
                                    </div>
                                    <small class="opacity-50 text-nowrap" style={{ marginLeft: "-10%",marginTop:"20%" }}>{formatDate(req.date_enregistrement)}</small>
                                    <button type="button" class="btn-close" onClick={() =>Supprimer(req._id)}></button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default NotifCulture;
