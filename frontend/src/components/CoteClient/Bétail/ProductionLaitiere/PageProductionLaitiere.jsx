import React, { useState, useEffect } from "react";
import Navbar from '../../Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'; 
import { useParams } from "react-router-dom";
import './PageProductionLaitiere.css';

const PageProductionLaitiere = () => {
    const [production, setProduction] = useState([]);
    
    const [dataYear,SetDataYear] = useState('');
    const [dataMonth,SetDataMonth] = useState('');
    const [prodTotal,setProdTotal] = useState(0);
    const [prod, setProd] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7);
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const weekDays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const daysOfWeek = weekDays.slice(firstDayOfMonth).concat(weekDays.slice(0, firstDayOfMonth));
    const authToken = localStorage.getItem("authToken");
    
    const user = localStorage.getItem("user");
    const idAgriculteur = user ? JSON.parse(user)._id : null;
    const {id }=  useParams();
    useEffect(() => {
        if (idAgriculteur) {
            fetchProduction();
        }
    }, [selectedDate, idAgriculteur]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        fetchProduction();
    };

    const fetchProduction = async () => {
        try {            
            const response = await axios.get(`http://localhost:3001/ProductionBetail/${idAgriculteur}/${id}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);            
            if(response.data!=null){
            setProduction(response.data.data)
            setProd(response.data.data)
            SetDataMonth(response.data.month)
            SetDataYear(response.data.year)
            setProdTotal(response.data.productionTotal)
            }
            
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };

    const selectedMonth = selectedDate.toLocaleString('default', { month: 'long' });
    const selectedYear = selectedDate.getFullYear();

    const handleChange = (event, index) => {
        if(!(dataYear === selectedDate.getFullYear() && dataMonth === selectedDate.getMonth() + 1)) {
            fetchProduction()
            const updatedProduction = [...production];
        const updatedIndex = Math.floor(index / 2);
        const updatedValue = event.target.value;

        const existingItemIndex = updatedProduction.findIndex(item => item.jour === updatedIndex);

        if (existingItemIndex !== -1) {
            if (index % 2 === 0) {
                updatedProduction[existingItemIndex].quantite = updatedValue;
            } else {
                updatedProduction[existingItemIndex].prix = updatedValue;
            }
        } else {
            updatedProduction.push({ jour: updatedIndex, quantite: index % 2 === 0 ? updatedValue : '', prix: index % 2 !== 0 ? updatedValue : ''  });
        }

        setProduction(updatedProduction);
          } else{
            setProduction([])
            const updatedProduction = [...production];
            const updatedIndex = Math.floor(index / 2);
            const updatedValue = event.target.value;
    
            const existingItemIndex = updatedProduction.findIndex(item => item.jour === updatedIndex);
    
            if (existingItemIndex !== -1) {
                if (index % 2 === 0) {
                    updatedProduction[existingItemIndex].quantite = updatedValue;
                } else {
                    updatedProduction[existingItemIndex].prix = updatedValue;
                }
            } else {
                updatedProduction.push({ jour: updatedIndex, quantite: index % 2 === 0 ? updatedValue : '', prix: index % 2 !== 0 ? updatedValue : ''  });
            }
    
            setProduction(updatedProduction);  
            }
        
    };

    


 

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const getTotalProduction = () => {
            let t = 0;
            production.map((item, index) => (
                t += (item.prix ? parseFloat(item.prix) : 0) * (item.quantite ? parseFloat(item.quantite) : 0)
            ));
            return t;
        };

        const structuredProduction = {
            idAgriculteur,
            idAnimal: id,
            month: selectedDate.getMonth() + 1,
            year: selectedDate.getFullYear(),
            data: production.map((item, index) => ({
                day: index + 1, // Le jour commence à 1
                quantite: item.quantite ? parseFloat(item.quantite) : 0, 
                prix: item.prix ? parseFloat(item.prix) : 0, 
                total: (item.prix ? parseFloat(item.prix) : 0) * (item.quantite ? parseFloat(item.quantite) : 0)
            })),
            productionTotal: getTotalProduction() 
        };

        
        const response = await axios.post("http://localhost:3001/ProductionBetail/", structuredProduction, {
            headers: {
                Authorization: `Bearer ${authToken}`,
                "Content-Type": "application/json",
            },
        });
        if(response){
            alert("Production Laitière ajoutée avec succès");
            fetchProduction();
        }
       
    } catch (error) {
        console.error('Error saving daily data:', error);
    }
};



   
    

    return (
        <div className="container">
            <Navbar textColor="black" />
            <div>
                <h3>Sélectionner un mois dans l'agenda :</h3>
                <Calendar
                    className="calendar"
                    onChange={handleDateChange}
                    value={selectedDate}
                />
                
                
               


                   
                <h2>Production Laitière Par Mois : {selectedMonth} {selectedYear}</h2>
                <form onSubmit={handleSubmit}>
                    <button className="btn" type="submit">Ajouter</button>
                    
                    <table className="table table-bordered text-center">
                        <thead>
                            <tr>
                                <th rowSpan="2" scope='col'>N° Semaine</th>
                                {daysOfWeek.map((day, index) => (
                                    <React.Fragment key={index}>
                                        <th colSpan="2" scope='col'>{day}</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                            <tr>
                                {[...Array(daysOfWeek.length)].map((_, index) => (
                                    <React.Fragment key={index}>
                                        <th scope='col'>quantité</th>
                                        <th scope='col'>prix</th>
                                    </React.Fragment>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[...Array(weeksInMonth)].map((_, semaineIndex) => (
                                <tr key={semaineIndex}>
                                    <td>{semaineIndex + 1}</td>
                                    {[...Array(Math.min(7 * 2, (daysInMonth - semaineIndex * 7) * 2))].map((_, jourIndex) => (
                                        <td key={jourIndex}>
                                            <input
                                                type="number"
                                                defaultValue={(dataYear === selectedDate.getFullYear() && dataMonth === selectedDate.getMonth() + 1) ? production[semaineIndex * 7 + Math.floor(jourIndex / 2)]?.[jourIndex % 2 === 0 ? 'quantite' : 'prix'] : ''}
                                                disabled={(dataYear === selectedDate.getFullYear() && dataMonth === selectedDate.getMonth() + 1) && prod[semaineIndex * 7 + Math.floor(jourIndex / 2)]?.[jourIndex % 2 === 0 ? 'quantite' : 'prix'] > 0 }
                                                onChange={(e) => handleChange(e, semaineIndex * 7 * 2 + jourIndex)}
                                            />

                                            
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                        <tr>
                        <td colspan='15' style={{textAlign:'right',backgroundColor:'#38c609',color:'white'}}> <b> Production Total en DT:<span>{(dataYear === selectedDate.getFullYear() && dataMonth === selectedDate.getMonth() + 1) ? prodTotal: 0}</span></b></td>
                        
                        </tr>
                    </tfoot>
                    </table>
                </form>
                
            </div>
        </div>
    );
};

export default PageProductionLaitiere;
