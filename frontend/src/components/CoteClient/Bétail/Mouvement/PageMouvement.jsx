
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import Update from "./Update";
import Ajouter from "./Ajouter";
import Navbar from'../../Navbar';
const PageMouvement = () => {
  const { id } = useParams();
  const [movementData, setMovementData] = useState([]);

  const fetchMovementsByFarmer = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/MouvementsBetail/${id}`);
      setMovementData(response.data);
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

    return(
        <div>
            <Navbar textColor="black" />
            <div class="container" style={{marginTop:"9%"}}>

<div class="row" >
    <div class="col-xl-8">
        <h4>Liste de suivi Mouvement</h4>
        <div style={{ marginTop: "5%", marginRight: "28%", marginLeft: "-153px" }}>
        {movementData.map((item) => (
            <div key={item._id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{item.movementType}</h5>
                <p className="card-text">Origine: {item.origin}</p>
                <p className="card-text">Destination: {item.destination}</p>
                <p className="card-text">Prix: {item.price}DT</p>
                <p className="card-text">Enregistré le: {formatDate(item.movementDate)}</p>
                <div className="btn-group" role="group" style={{marginLeft:"15%",marginTop:"15px"}}>
                  <Update onUpdate={fetchMovementsByFarmer} mouvementId={item._id} />
                  <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
    {/* <ListeSanté /> */}
        {/* <!-- end row--> */}
    </div>
    <div class="col-xl-4">
    <Ajouter onCreate={fetchMovementsByFarmer}/>
    </div>
</div>
{/* <!-- end row --> */}
</div>
        </div>

    );
};
export default PageMouvement;