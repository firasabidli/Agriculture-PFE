
import './PageSanté.css';
import Navbar from'../../Navbar';
import AjouterSanté from "./Ajouter";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Update from "./Update";
const PageSanté=()=> {
    const { id } = useParams();
    const [healthData, setHealthData] = useState([]);
  
    const fetchSanteByAgriculteur = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/SanteBetail/${id}`);
        setHealthData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de santé de l\'agriculteur:', error);
      }
    };
  
    const formatDate = (dateString) => {
      const dateObject = new Date(dateString);
      const formattedDate = dateObject.toISOString().split("T")[0];
      return formattedDate;
    };
  
    useEffect(() => {
      fetchSanteByAgriculteur();
      console.log('Component mounted');
  scheduleNextCheck();
    }, []);
  
    const handleDelete = async (id) => {
      try {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
        if (!confirmDelete) {
          return;
        }
  
        const updatedData = healthData.filter(item => item._id !== id);
        setHealthData(updatedData);
        await axios.delete(`http://localhost:3001/SanteBetail/${id}`);
        fetchSanteByAgriculteur();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'élément :', error);
      }
    };
    const checkVaccinationDates = () => {
      const today = new Date();
    
      healthData.forEach((item) => {
        const vaccinationDate = new Date(item.dateVaccination);
    
        // Comparer la date de vaccination avec la date actuelle
        if (vaccinationDate.getDate() === today.getDate() &&
            vaccinationDate.getMonth() === today.getMonth() &&
            vaccinationDate.getFullYear() === today.getFullYear()) {
          // Afficher une notification pour cette vaccination
          console.log(`Vaccination due today: ${item.nomVaccin}`);
          showNotification(`Vaccination due today: ${item.nomVaccin}`);
        }
      });
    
      // Planifier la prochaine vérification à 00h30 pour le lendemain
      scheduleNextCheck();
    };
    
    
  
    const scheduleNextCheck = () => {
      const now = new Date();
      const nextCheckTime = new Date(now);
    
      // Définir l'heure à 00h44 à partir de l'heure actuelle
      nextCheckTime.setHours(1, 14, 0, 0);
    
      console.log('Next check time:', nextCheckTime);
    
      // Vérifier si l'heure actuelle est déjà passée 00h44 pour aujourd'hui
      if (now > nextCheckTime) {
        // Si oui, passer à demain à 00h44
        nextCheckTime.setDate(now.getDate() + 1);
      }
    
      const timeUntilNextCheck = nextCheckTime - now;
    
      console.log('Time until next check:', timeUntilNextCheck);
    
      // Utiliser setTimeout pour déclencher la vérification à 00h44
      setTimeout(() => {
        console.log('Executing checkVaccinationDates...');
        checkVaccinationDates();
      }, timeUntilNextCheck);
    };
    
    
  
    const showNotification = (message) => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Rappel de Vaccination', {
          body: message,
        });
      }
    };
  
    // Demander la permission d'afficher des notifications au chargement initial
    useEffect(() => {
      if ('Notification' in window && Notification.permission !== 'granted') {
        Notification.requestPermission();
      }
    }, []);
    return(
        <div>
            <Navbar textColor="black" />
            <div class="container" style={{marginTop:"9%"}}>
<div class="row" >
    <div class="col-xl-8">
        <h4>Liste de suivi de santé</h4>
        <div style={{ marginTop: "5%", marginRight: "28%", marginLeft: "-153px" }}>
      {healthData.map((item, index) => (
        <div key={item._id} className="card row-hover pos-relative py-3 px-3 mb-3 border-warning border-top-0 border-right-0 border-bottom-0 rounded-0">
          <div className="row align-items-center">
            <div className="col-md-8 mb-3 mb-sm-0">
              <h5>{item.etatSante}</h5>
              <p className="text-sm"><span className="op-6" style={{fontWeight:"bold"}}>Enregistré le </span>{formatDate(item.dateEnregistrement)}</p>
              <p className="text-sm" style={{fontSize:"110%"}}><span className="op-6" style={{fontWeight:"bold"}}>Maladies etSymptomes:  </span> {item.maladiesSymptomes}</p>
              <p className="text-sm" style={{fontSize:"110%"}}><span className="op-6" style={{fontWeight:"bold"}}>observations Generales:  </span> {item.observationsGenerales}</p>
              {/* Afficher les traitements */}
              {item.traitements && item.traitements.length > 0 && (
                <div className="text-sm op-5" style={{fontSize:"110%"}}>
                  <p style={{fontWeight:"bold"}}>Traitements :</p>
                  <select className="form-control">
                    {item.traitements.map((traitement, index) => (
                      <option key={index} value={traitement.medicament}>
                        {traitement.medicament}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {/* Afficher les vaccinations */}
              {item.vaccinations && item.vaccinations.length > 0 && (
                <div className="text-sm op-5" style={{fontSize:"110%"}}>
                  <p style={{fontWeight:"bold"}}>Vaccinations :</p>
                  <select className="form-control">
                    {item.vaccinations.map((vaccination, index) => (
                      <option key={index} value={vaccination.nomVaccin}>
                        {vaccination.nomVaccin}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="col-12 col-md-4" style={{display:"flex",marginLeft:"15%",marginTop:"15px"}}>
              {/* <button className="f-n-hover btn btn-success btn-raised px-4 py-25 w-75 text-600" style={{marginRight:"30%",color: "white"}}>
                Modifier
              </button> */}
              <Update onUpdate={fetchSanteByAgriculteur} SanteId={item._id}/>
              <button className="f-n-hover btn btn-danger" onClick={() => handleDelete(item._id)}>
                Supprimer
              </button>
            </div>
            </div>
          </div>
         
        </div>
      ))}
    </div>
    {/* <ListeSanté /> */}
        {/* <!-- end row--> */}
    </div>
    <div class="col-xl-4">
    <AjouterSanté onCreate={fetchSanteByAgriculteur}/>
    </div>
</div>
{/* <!-- end row --> */}
</div>
</div>

    );
};
export default PageSanté;