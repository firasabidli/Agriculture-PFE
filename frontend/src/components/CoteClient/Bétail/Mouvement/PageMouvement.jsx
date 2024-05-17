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
          <div className=" card col-md-7">
          <h4 className='p-3 text-center'>Liste de suivi Mouvement</h4>
          {movementData.length<1? <div className='text-center p-5'><b>Auccune données disponible</b></div>:
            <div >
              {movementData.map((item,index) => (
                <>
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
                    <div className=" p-4 row ">
                      <div className="col-md-4 mb-3"><Update onUpdate={fetchMovementsByFarmer} mouvementId={item._id} /></div>
                     <div className="col-md-4 mb-3"> <button className="btn f-n-hover" style={{backgroundColor:"#F65005"}} onClick={() => handleDelete(item._id)}>
                        Supprimer
                      </button></div>
                      {item.movementType === "vente" &&
                     <div className="col-md-4 mb-3"> <FactureMouvement venteData={item} animalId={item.AnimalId} agriculteurId={item.Agriculteur}/></div>
                      }
                    </div>
                  </div>
                </div>
                {index< movementData.length-1?<hr  className="border border-info border-3 opacity-75" />: ''}
          
                </>
              ))}
            </div>
          }
          </div>
          <div className="col-md-5">
            <Ajouter onCreate={fetchMovementsByFarmer}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageMouvement;
