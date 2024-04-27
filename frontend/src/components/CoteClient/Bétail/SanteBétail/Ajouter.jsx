import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
//import { now } from "mongoose";
const AjouterSanté = ({ onCreate }) => {
    const { id } = useParams();
    const now = new Date();
  const [healthData, setHealthData] = useState({
    AnimalId:id,
    dateEnregistrement: new Date(now).toISOString().split("T")[0],
    etatSante: "",
    maladiesSymptomes: "",
    traitements: [],
    vaccinations: [],
    observationsGenerales: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHealthData({
      ...healthData,
      [name]: value,
    });
  };

  const handleAddTraitement = () => {
    setHealthData({
      ...healthData,
      traitements: [...healthData.traitements, { medicament: "", dose: "", frequence: "" }],
    });
  };

  const handleTraitementChange = (index, fieldName, value) => {
    const updatedTraitements = [...healthData.traitements];
    updatedTraitements[index][fieldName] = value;
    setHealthData({
      ...healthData,
      traitements: updatedTraitements,
    });
  };

  const handleAddVaccination = () => {
    setHealthData({
      ...healthData,
      vaccinations: [...healthData.vaccinations, { nomVaccin: "", dateAdministration: "" }],
    });
  };

  const handleVaccinationChange = (index, fieldName, value) => {
    const updatedVaccinations = [...healthData.vaccinations];
    updatedVaccinations[index][fieldName] = value;
    setHealthData({
      ...healthData,
      vaccinations: updatedVaccinations,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!healthData.dateEnregistrement || !healthData.etatSante||!healthData.maladiesSymptomes||!healthData.observationsGenerales) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }
  
      const isValidMaladiesSymptomes = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(healthData.maladiesSymptomes);
      if (!isValidMaladiesSymptomes) {
        alert('Le champ Maladies ou symptômes ne doit contenir que des lettres et des espaces.');
        return;
      }
      const isValidobservationsGenerales=/^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(healthData.observationsGenerales);
      if (!isValidobservationsGenerales) {
        alert('Le champ Maladies ou symptômes ne doit contenir que des lettres et des espaces.');
        return;
      }
    
      // Validation pour les traitements
      const isValidTraitements = healthData.traitements.every(traitement => {
        return isValidTextField(traitement.medicament) && isValidTextField(traitement.dose) && isValidTextField(traitement.frequence);
      });
      if (!isValidTraitements) {
        alert('Veuillez remplir tous les champs des traitements avec des caractères valides.');
        return;
      }
    
      // Validation pour les vaccinations
      const isValidVaccinations = healthData.vaccinations.every(vaccination => {
        return isValidTextField(vaccination.nomVaccin) && vaccination.dateAdministration !== '';
      });
      if (!isValidVaccinations) {
        alert('Veuillez remplir tous les champs des vaccinations avec des caractères valides.');
        return;
      }
    
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("user")._id;
    //   console.log("ID de l'utilisateur :", userId);
    //   console.log(userId)
      const formData = {
        Agriculteur:userId,
        ...healthData,
      };

      const response = await axios.post(
        "http://localhost:3001/SanteBetail/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert(' ajouté avec succès !');
      setHealthData({
        dateEnregistrement: "",
        etatSante: "",
        maladiesSymptomes: "",
        traitements: [],
        vaccinations: [],
        observationsGenerales: "",
      });
        onCreate();
      console.log("Réponse du serveur :", response.data);
      // Ici vous pouvez ajouter du code pour gérer la réponse du serveur, par exemple rediriger l'utilisateur
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de l'état de santé :", error);
      // Ici vous pouvez ajouter du code pour gérer les erreurs, par exemple afficher un message d'erreur à l'utilisateur
    }
  };

  const isValidTextField = (text) => {
    return /^[a-zA-Z0-9\s]+$/.test(text);
  };
  return (
    <div className="card" style={{ marginRight:"-45%",marginLeft:"-41%"}}>
      <div className="card-body">
        <h5  style={{textAlign:"center"}}>Enregistrer l'état de santé du bétail</h5>
        <form onSubmit={handleSubmit} style={{marginTop:"5%"}}>
        <div className="mb-3" style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>Date de l'enregistrement :</label>
            <input
              type="date"
              className="form-control"
              name="dateEnregistrement"
              value={healthData.dateEnregistrement}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3" style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>État de santé général :</label>
            <div>
              <input
                type="radio"
                id="bon"
                name="etatSante"
                value="bon"
                checked={healthData.etatSante === "bon"}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="bon" style={{ marginLeft: "5px", marginRight: "15px" ,fontSize:"110%"}}>Bon</label>
              <input
                type="radio"
                id="moyen"
                name="etatSante"
                value="moyen"
                checked={healthData.etatSante === "moyen"}
                onChange={handleInputChange}
              />
              <label htmlFor="moyen" style={{ marginLeft: "5px", marginRight: "15px",fontSize:"110%"}}>Moyen</label>
              <input
                type="radio"
                id="mauvais"
                name="etatSante"
                value="mauvais"
                checked={healthData.etatSante === "mauvais"}
                onChange={handleInputChange}
              />
              <label htmlFor="mauvais" style={{ marginLeft: "5px",fontSize:"110%"}}>Mauvais</label>
            </div>
          </div>
          <div className="mb-3" style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>Maladies ou symptômes :</label>
            <textarea
              className="form-control"
              name="maladiesSymptomes"
              value={healthData.maladiesSymptomes}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <div className="mb-3" style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>Traitements administrés :</label>
            {healthData.traitements.map((traitement, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="form-control mb-2"
                  name="medicament"
                  placeholder="Médicament"
                  value={traitement.medicament}
                  onChange={(e) => handleTraitementChange(index, "medicament", e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  name="dose"
                  placeholder="Dose"
                  value={traitement.dose}
                  onChange={(e) => handleTraitementChange(index, "dose", e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  name="frequence"
                  placeholder="Fréquence"
                  value={traitement.frequence}
                  onChange={(e) => handleTraitementChange(index, "frequence", e.target.value)}
                />
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={handleAddTraitement}>
              Ajouter Traitement
            </button>
          </div>
          <div className="mb-3" style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>Vaccinations :</label>
            {healthData.vaccinations.map((vaccination, index) => (
              <div key={index}>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Nom du vaccin"
                  value={vaccination.nomVaccin}
                  onChange={(e) => handleVaccinationChange(index, "nomVaccin", e.target.value)}
                  required
                />
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder="Date d'administration"
                  value={vaccination.dateAdministration}
                  onChange={(e) => handleVaccinationChange(index, "dateAdministration", e.target.value)}
                  required
                />
              </div>
            ))}
            <button type="button" className="btn btn-secondary" onClick={handleAddVaccination}>
              Ajouter Vaccination
            </button>
          </div>
          <div className="mb-3"style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>Observations générales :</label>
            <textarea
              className="form-control"
              name="observationsGenerales"
              value={healthData.observationsGenerales}
              onChange={handleInputChange}
              rows="3"
            />
          </div>
          <button type="submit" className="btn btn-primary">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default AjouterSanté;
