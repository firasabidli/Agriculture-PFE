
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Navbar from '../../../Navbar';
import CarouselBetail from '../CarouselBetail.jsx';
import { FiExternalLink } from "react-icons/fi";
const HistoriqueProduction = () => {
    const [productions, setProductions] = useState([]);
    const user = localStorage.getItem("user");
    const idAgriculteur = user ? JSON.parse(user)._id : null;
    const { id } = useParams();
    useEffect(() => {
        fetchProduction();
    }, );

    const fetchProduction = async () => {
        try {            
            const response = await axios.get(`http://localhost:3001/ProductionBetail/${idAgriculteur}/${id}`);            
            if (response.data != null) {
                setProductions(response.data);
            }
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };

    const calculateYearlyTotal = (yearlyData) => {
        let total = 0;
        yearlyData.forEach(monthData => {
            total += monthData.productionTotal;
        });
        return total;
    };
    return (
        <div className="m-3">
            <Navbar textColor="black" />
            <CarouselBetail></CarouselBetail>
            <Link to={`/agriculteur/PageProductionLaitiere/${id}`} style={{float:'right', color:'gray',fontSize:'1.4rem', paddingTop:'25px',marginRight:'20px'}}>Production Laitirère<FiExternalLink /></Link> <br />
           <div className="container  p-5">
           <h1 className="display-6 text-center">Historique Production laitirère</h1> 
            {productions.map((animal, index) => (
                <div key={index}>
                    <Table responsive bordered className="w-50">
                        <thead>
                            <tr>
                                <th colSpan={5}>Identifiant</th>
                                <th colSpan={5}>Race</th>
                                <th colSpan={5}>Date de Naissance</th>
                            </tr>
                            <tr>
                                <th colSpan={5}>{animal.idAnimal.IdantifiantsAnimal}</th>
                                <th colSpan={5}>{animal.idAnimal.Race}</th>
                                <th colSpan={5}>{new Date(animal.idAnimal.date_naissance).toLocaleDateString()}</th>
                            </tr>
                            <tr>
                                <th colSpan={14}>Production Par année</th>
                            </tr>
                            <tr>
                                <th>Année</th>
                                <th>Jan</th>
                                <th>Fév</th>
                                <th>Mar</th>
                                <th>Avr</th>
                                <th>Mai</th>
                                <th>Jui</th>
                                <th>Juil</th>
                                <th>Out</th>
                                <th>Sept</th>
                                <th>Oct</th>
                                <th>Nov</th>
                                <th>Déc</th>
                                <th>Total Annuel</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.keys(animal.productions).map(year => (
                                <tr key={year}>
                                    <td>{year}</td>
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(month => (
                                        <td key={month}>
                                            {animal.productions[year].find(item => item.month === month)?.productionTotal || 0}
                                        </td>
                                    ))}
                                    
                                    <td>{calculateYearlyTotal(animal.productions[year])}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={13} className="text-end">Production Totale:</td>
                                <td> {Object.keys(animal.productions).reduce((acc, year) => acc + calculateYearlyTotal(animal.productions[year]), 0)}</td>
                            </tr>
                        </tfoot>
                    </Table>
                </div>
            ))}
           </div>
        </div>
    );
    
};

export default HistoriqueProduction;
