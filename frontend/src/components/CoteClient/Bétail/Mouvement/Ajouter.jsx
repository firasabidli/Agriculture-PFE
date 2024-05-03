import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const Ajouter = ({ onCreate }) => {
  const { id } = useParams();
  const now=new Date();
  const [displayPriceAchat, setDisplayPriceAchat] = useState(false);
  const [displayPriceVente, setDisplayPriceVente] = useState(false);
  const [movementData, setMovementData] = useState({
    AnimalId:id,
    dateMouvement: new Date(now).toISOString().split("T")[0],
    movementType: "",
    origin: "",
    destination: "",
    priceAchat: 0,
    priceVente: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovementData({
      ...movementData,
      [name]: value,
    });
  };

  const handleInputTypeVenteChange = (e) => {
    const { name, value } = e.target;
    setMovementData({
      ...movementData,
      [name]: value,
    });
    setDisplayPriceVente(true);
    setDisplayPriceAchat(false);
  };
  const handleInputTypeAchatChange = (e) => {
    const { name, value } = e.target;
    setMovementData({
      ...movementData,
      [name]: value,
    });
    setDisplayPriceAchat(true);
    setDisplayPriceVente(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const isValiddestination= /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(movementData.destination);
      if (!isValiddestination) {
        alert('Le champ destination ne doit contenir que des lettres et des espaces.');
        return;
      }
    
      if (!movementData.destination) {
        alert('Veuillez saisir la destination.');
        return;
      }
  
     if (displayPriceAchat){
      if (isNaN(movementData.priceAchat)  || movementData.priceAchat <= 0) {
        alert("Le prix d'achat doit être un nombre positif.");
        return;
      }
     }
     if (displayPriceVente){
      if (isNaN(movementData.priceVente)  || movementData.priceVente <= 0) {
        alert("Le prix du vente doit être un nombre positif.");
        return;
      }
     }
      const authToken = localStorage.getItem("authToken");
      const userId = localStorage.getItem("user")._id;
      console.log("yy",movementData)
      const formData = {
        Agriculteur: userId,
        ...movementData,
      };

      const response = await axios.post(
        "http://localhost:3001/MouvementsBetail/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert('Mouvement ajouté avec succès !');
      setMovementData({ dateMouvement: "",  movementType: "",
      origin: "",
      destination: "",
      priceAchat: 0,
      priceVente: 0,
     });
      onCreate();
      window.location.reload()
      console.log("Réponse du serveur :", response.data);
    } catch (error) {
      console.error("Erreur lors de l'ajout du mouvement de bétail :", error);
    }
  };

  return (
    <div className="card" style={{ marginRight:"-45%",marginLeft:"-41%"}}>
      <div className="card-body">
        <h5 style={{ textAlign: "center" }}>Ajouter un mouvement de bétail</h5>
        <form onSubmit={handleSubmit} style={{marginTop:"5%"}}>
          <div className="mb-3" style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>Type de Mouvement :</label>
            <div>
              <input
                type="radio"
                id="achat"
                name="movementType"
                value="achat"
                checked={movementData.movementType === "achat"}
               
                onChange={handleInputTypeAchatChange}
                required
              />
              <label htmlFor="achat" style={{ marginLeft: "5px", marginRight: "15px" ,fontSize:"110%"}}>Achat</label>
              <input
                type="radio"
                id="vente"
                name="movementType"
                value="vente"
                checked={movementData.movementType === "vente"}
                onChange={handleInputTypeVenteChange}
              />
              <label htmlFor="vente" style={{ marginLeft: "5px",fontSize:"110%"}}>Vente</label>
            </div>
          </div>
          <div className="mb-3" style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>Origine :</label>
            <div>
              <input
                type="radio"
                id="ferme"
                name="origin"
                value="ferme"
                checked={movementData.origin === "ferme"}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="ferme" style={{ marginLeft: "5px", marginRight: "15px" ,fontSize:"110%"}}>Ferme</label>
              <input
                type="radio"
                id="marche"
                name="origin"
                value="marche"
                checked={movementData.origin === "marche"}
                onChange={handleInputChange}
              />
              <label htmlFor="marche" style={{ marginLeft: "5px",fontSize:"110%"}}>Marché</label>
            </div>
          </div>
          <div className="mb-3" style={{width: "116%"}}>
            <label style={{fontWeight:"bold"}}>Destination :</label>
            <input
              type="text"
              className="form-control"
              name="destination"
              value={movementData.destination}
              onChange={handleInputChange}
              required
            />
          </div>
          {displayPriceAchat &&
              <div className="mb-3" style={{width: "116%"}}>
                <label style={{fontWeight:"bold"}}>Prix d'achat :</label>
                <input
                  type="number"
                  className="form-control"
                  name="priceAchat"
                  value={movementData.priceAchat}
                  onChange={handleInputChange}
                />
              </div>
          }
            {displayPriceVente &&
              <div className="mb-3" style={{width: "116%"}}>
                <label style={{fontWeight:"bold"}}>Prix du vente:</label>
                <input
                  type="number"
                  className="form-control"
                  name="priceVente"
                  value={movementData.priceVente}
                  onChange={handleInputChange}
                />
              </div>
            }
          <button type="submit" className="btn btn-primary">Ajouter Mouvement</button>
        </form>
      </div>
    </div>
  );
};

export default Ajouter;
