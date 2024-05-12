import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Update from "./Update";
import Ajouter from "./Ajouter";
import Navbar from'../../Navbar';
import FactureMouvement from "./FactureMouvement";

const PageMouvement = () => {
  const { id } = useParams();
  const [movementData, setMovementData] = useState([]);
  const [displayPriceAchat, setDisplayPriceAchat] = useState(false);
  const [displayPriceVente, setDisplayPriceVente] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchMovementsByFarmer = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/MouvementsBetail/${id}`);
      setMovementData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des mouvements de bétail:', error);
    }
  };

  useEffect(() => {
    fetchMovementsByFarmer();
  }, []);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
      if (!confirmDelete) {
        return;
      }

      const updatedData = movementData.filter(item => item._id !== id);
      setMovementData(updatedData);
      await axios.delete(`http://localhost:3001/MouvementsBetail/${id}`);
      fetchMovementsByFarmer();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'élément :', error);
    }
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = dateObject.toISOString().split("T")[0];
    return formattedDate;
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return(
    <div>
      <Navbar textColor="black" />
      <div className="container" style={{marginTop:"9%"}}>
        <div className="row" >
          <div className="col-xl-8">
            <h4>Liste de suivi Mouvement</h4>
            <div style={{ marginTop: "5%", marginRight: "28%", marginLeft: "-153px" }}>
              {movementData.map((item) => (
                <div key={item._id} className="card mb-3">
                  <div className="card-body">
                    <h5 style={{textTransform:"uppercase",fontWeight:"bold",color: "#7e8d9f",fontSize:"200%"}}>{item.movementType}</h5>
                    <p className="card-text"><span class="fw-bold">Origine:</span> {item.origin}</p>
                    <p className="card-text"><span class="fw-bold">Destination:</span> {item.destination}</p>
                    {item.movementType === "achat" &&
                    <p className="card-text"><span class="fw-bold">Prix d'achat:</span> {item.priceAchat}DT</p>}
                    {item.movementType === "vente" &&
                    <p className="card-text"><span class="fw-bold">Prix du vente:</span> {item.priceVente}DT</p>}
                    <p className="card-text"><span class="fw-bold">Enregistré le: </span>{formatDate(item.movementDate)}</p>
                    <div className="btn-group" role="group" style={{marginLeft:"10%",marginTop:"15px"}}>
                      <Update onUpdate={fetchMovementsByFarmer} mouvementId={item._id} />
                      <button className="btn" style={{backgroundColor:"#F65005",border:"1px solid #F65005",borderRadius:"10px"}} onClick={() => handleDelete(item._id)}>
                        Supprimer
                      </button>
                      {item.movementType === "vente" &&
                      <FactureMouvement venteData={item} animalId={item.AnimalId} agriculteurId={item.Agriculteur}/>
                      }
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
          <div className="col-xl-4">
            <Ajouter onCreate={fetchMovementsByFarmer}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageMouvement;
