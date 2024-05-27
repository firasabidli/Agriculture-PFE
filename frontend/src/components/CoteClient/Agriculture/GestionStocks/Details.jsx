// Details.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

const Details = ({ Id, onClose }) => {
    const [stockDetails, setStockDetails] = useState(null);

    const fetchStockDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/GestionStocks/stock/${Id}`);
            const stockData = response.data.stocks;
            console.log("Stock details:", stockData);
            setStockDetails(stockData);
        } catch (error) {
            console.error('Error fetching stock details:', error);
        }
    };

    useEffect(() => {
        if (Id) { 
            fetchStockDetails();
        }
    }, [Id]);

    return (
        <Modal show={!!Id} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Détails du Stock</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {stockDetails ? (
                    <div>
                        <p><span style={{fontWeight:"bold"}}>Libellé: </span> {stockDetails.libellé}</p>
                        <p><span style={{fontWeight:"bold"}}>Quantité Générale: </span> {stockDetails.quantitéGénérale}</p>
                        <p><span style={{fontWeight:"bold"}}>Emplacement: </span> {stockDetails.emplacement}</p>
                        <p><span style={{fontWeight:"bold"}}>Ville: </span> {stockDetails.ville}</p>
                        <p><span style={{fontWeight:"bold"}}>Type de Stocks: </span> {stockDetails.typeStocks}</p>
                        <p><span style={{fontWeight:"bold"}}>Date d'Enregistrement: </span>{new Date(stockDetails.date).toLocaleDateString('fr-FR')}</p>
                        <p><span style={{fontWeight:"bold"}}>Entrées:</span></p>
                        {Array.isArray(stockDetails.entrées) && stockDetails.entrées.map((entrée, index) => (
                            <div key={index}>
                                <p>Date d'entrée: {new Date(entrée.dateEntrée).toLocaleDateString('fr-FR')}</p>
                                <p>Quantité d'entrée: {entrée.quantitéEntrée}</p>
                                <p>Raison d'entrée: {entrée.raisonEntrée}</p>
                                <p>Prix d'entrée: {entrée.prix}</p>
                            </div>
                        ))}
                        <p><span style={{fontWeight:"bold"}}>Sorties:</span></p>
                        {Array.isArray(stockDetails.sortie) && stockDetails.sortie.map((sortie, index) => (
                            <div key={index}>
                                <p>Date de sortie: {new Date(sortie.dateSortie).toLocaleDateString('fr-FR')}</p>
                                <p>Quantité de sortie: {sortie.quantitéSortie}</p>
                                <p>Raison de sortie: {sortie.raisonSortie}</p>
                                <p>Prix de sortie: {sortie.prix}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Les détails du stock ne sont pas disponibles.</p>
                )}
            </Modal.Body>
        </Modal>
    );
}

export default Details;
