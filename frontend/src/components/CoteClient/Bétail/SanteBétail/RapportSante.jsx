import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RapportSante.css';

const RapportSante = () => {
  const { id } = useParams();
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    const fetchSanteByAgriculteur = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/SanteBetail/${id}`);
        setHealthData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de santé de l\'agriculteur:', error);
      }
    };

    fetchSanteByAgriculteur();
  }, [id]);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toISOString().split('T')[0];
  };

  if (healthData.length === 0) {
    return (
      <div className="rapport-sante-container">
        <h2>Rapport de Santé du Bétail</h2>
        <p>Aucune donnée de santé disponible pour cet animal.</p>
      </div>
    );
  }

  const animal = healthData[0].AnimalId;

  return (
    <div className="rapport-sante-container container">
      <h2>Rapport de Santé du Bétail</h2>
      <div className="rapport-sante-card mt-5" style={{width:'40%'}}>
        <p><strong>Référence animal:</strong> {animal.IdantifiantsAnimal}</p>
        <p><strong>Catégorie Bétail:</strong> {animal.categorieBetail}</p>
        <p><strong>Race:</strong> {animal.Race}</p>
        <p><strong>Sub Catégorie:</strong> {animal.subCategorieBetail}</p>
        <p><strong>Date de Naissance:</strong> {formatDate(animal.date_naissance)}</p>
        <p><strong>Sexe:</strong> {animal.sexe}</p>
      </div>
      <div className="row">
      {healthData.map((item) => (
        <div key={item._id} className="rapport-sante-card col-sm-12 col-md-5 m-5">
          <h3>État de Santé: {item.etatSante}</h3>
          <p><strong>Date d'Enregistrement:</strong> {formatDate(item.dateEnregistrement)}</p>
          <p><strong>Maladies et Symptômes:</strong> {item.maladiesSymptomes}</p>
          <p><strong>Observations Générales:</strong> {item.observationsGenerales}</p>
          {item.traitements.length > 0 && (
            <div>
              <h4>Traitements:</h4>
              <ul>
                {item.traitements.map((traitement, index) => (
                  <li key={index}>
                    <strong>Médicament:</strong> {traitement.medicament}, <strong>Prix:</strong> {traitement.prixMedicament}, <strong>Dose:</strong> {traitement.dose}, <strong>Fréquence:</strong> {traitement.frequence}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {item.vaccinations.length > 0 && (
            <div>
              <h4>Vaccinations:</h4>
              <ul>
                {item.vaccinations.map((vaccination, index) => (
                  <li key={index}>
                    <strong>Nom:</strong> {vaccination.nomVaccin}, <strong>Prix:</strong> {vaccination.prixVaccin}, <strong>Date:</strong> {formatDate(vaccination.dateAdministration)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      </div>
     
    </div>
  );
};

export default RapportSante;
