import React, { useState, useEffect } from "react";
import Navbar from '../../Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'; 
import { useParams } from "react-router-dom";
import './PageProductionLaitiere.css';
import AddAliments from "./AddAliments";
import EditAliment from "./EditAliment";
import DeleteAliment from "./DeleteAliment";
import Form from 'react-bootstrap/Form';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Table } from "react-bootstrap";
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const PageProductionLaitiere = () => {
    const [production, setProduction] = useState([]);
    const [stat, setStat] = useState([]);
    const [alimentsData, setAlimentsData] = useState([]);
    const [dataYear, setDataYear] = useState('');
    const [dataMonth, setDataMonth] = useState('');
    const [prodTotal, setProdTotal] = useState(0);
    const [prod, setProd] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
    const weeksInMonth = Math.ceil(daysInMonth / 7);
    const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const weekDays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const daysOfWeek = weekDays.slice(firstDayOfMonth).concat(weekDays.slice(0, firstDayOfMonth));
    const [prixTotal, setPrixTotal] = useState(0);
    const user = localStorage.getItem("user");
    const idAgriculteur = user ? JSON.parse(user)._id : null;
    const { id } = useParams();
    const authToken = localStorage.getItem("authToken");

    useEffect(() => {
        if (idAgriculteur) {
            fetchProduction();
            fetchStatistique();
        }
    }, [selectedDate, idAgriculteur]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const fetchProduction = async () => {
        try {            
            const response = await axios.get(`http://localhost:3001/ProductionBetail/${idAgriculteur}/${id}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);            
            if (response.data != null) {
                setProduction(response.data.data);
                setProd(response.data.data);
                setDataMonth(response.data.month);
                setDataYear(response.data.year);
                setProdTotal(response.data.productionTotal);
            }
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };

    const fetchStatistique = async () => {
        try {            
            const response = await axios.get(`http://localhost:3001/ProductionBetail/stat/${idAgriculteur}/${id}/${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}`);            
            if (response.data != null) {
                setStat(response.data.weeks.map((week) => ({
                    label: week.semaine,
                    quantites: week.days.map(day => day.quantite),
                })));
            }
        } catch (error) {
            console.error('Error fetching daily data:', error);
        }
    };


    const ColorsSemaine = ["green","yellow","blue","pink","red"]
   
    const data = {
        labels: daysOfWeek,
        datasets: stat.map((week, index) => ({
            label: week.label,
            data: week.quantites,
            backgroundColor: ColorsSemaine[index], // Utilisez la couleur spécifique pour cette semaine
        borderColor: ColorsSemaine[index], // Utilisez la couleur spécifique pour cette semaine
        borderWidth: 1,
        pointBackgroundColor: ColorsSemaine[index], // Définissez la couleur de fond des points pour correspondre à la couleur de la semaine
        pointBorderColor: ColorsSemaine[index], // Définissez la couleur de la bordure des points pour correspondre à la couleur de la semaine
         
        })),
    };

    const options = {
        elements: {
            line: {
                tension: 0.5,
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'Statistique de production laitiraire',
            },
        },
    };

    const selectedMonth = selectedDate.toLocaleString('default', { month: 'long' });
    const selectedYear = selectedDate.getFullYear();

    const handleChange = (event, index) => {
        if (!(dataYear === selectedDate.getFullYear() && dataMonth === selectedDate.getMonth() + 1)) {
            fetchProduction();
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
                updatedProduction.push({ jour: updatedIndex, quantite: index % 2 === 0 ? updatedValue : '', prix: index % 2 !== 0 ? updatedValue : '' });
            }

            setProduction(updatedProduction);
        } else {
            setProduction([]);
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
                updatedProduction.push({ jour: updatedIndex, quantite: index % 2 === 0 ? updatedValue : '', prix: index % 2 !== 0 ? updatedValue : '' });
            }

            setProduction(updatedProduction);  
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const getTotalProduction = () => {
                let t = 0;
                production.map((item) => (
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
                    day: index + 1,
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
            if (response) {
                alert("Production Laitière ajoutée avec succès");
                fetchProduction();
            }
        } catch (error) {
            console.error('Error saving daily data:', error);
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/AlimentsAnimal/${idAgriculteur}`);
            if (Array.isArray(response.data.data)) {
                setAlimentsData(response.data.data);
            } else {
                console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const calculateTotalPrice = () => {
        let total = 0;
        alimentsData.forEach(item => {
            total += item.total;
        });
        return total;
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
                 
                <h2>Production production laitiraire Par Mois : {selectedMonth} {selectedYear}</h2>
                
              
                    
                    <Form onSubmit={handleSubmit} id="form"> </Form>
                    
                    <Table responsive className="tableRes">
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
                                                form="form"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan='15' style={{textAlign:'right',backgroundColor:'#38c609',color:'white'}}> 
                                    <b> Production Total en DT: <span>{(dataYear === selectedDate.getFullYear() && dataMonth === selectedDate.getMonth() + 1) ? prodTotal : 0}</span></b>
                                </td>
                            </tr>
                        </tfoot>
                    </Table>
                    <div style={{float:"right"}}><button className="btn" form="form" type="submit">Ajouter</button></div>
                    
            </div>
          
            <h2>Aliments pour animaux</h2>
            <AddAliments onCreate={fetchData} />
           
                <Table  responsive>
                    <thead>
                        <th>ID no.</th>
                        <th>Date d'Achat</th>
                        <th>Aliments</th>
                        <th>Quantite</th>
                        <th>Prix en DT</th>
                        <th>Total</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {alimentsData.map((item, index) => (
                            <tr key={item._id} className="alert" role="alert">
                                <td>{index}</td>
                                <td className='td-title'>{new Date(item.dateAchat).toLocaleDateString()}</td>
                                <td>{item.aliments}</td>
                                <td>{item.quantite} {item.unite}</td>
                                <td>{item.prix}</td>
                                <td>{item.total}</td>
                                <td>
                                    <div className='action' style={{marginLeft:'100px'}}>
                                        <EditAliment alimentId={item._id} aliment={item} onUpdate={fetchData} /> 
                                        <DeleteAliment alimentId={item._id} onDelete={fetchData} />  
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot >
                        <tr >
                            <td colSpan='6' style={{textAlign:'right',backgroundColor:'#38c609',color:'white'}}> 
                                <b> Prix Total en DT: <span>{calculateTotalPrice()}</span></b>
                            </td>
                        </tr>
                    </tfoot>
                </Table>
           

            <div className="statLitiraire" >
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default PageProductionLaitiere;
