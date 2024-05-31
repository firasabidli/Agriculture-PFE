import React, { useState, useEffect } from "react";
import Navbar from '../../Navbar';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'; 
import { useParams } from "react-router-dom";
import './PageProductionLaitiere.css';
import Form from 'react-bootstrap/Form';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Table } from "react-bootstrap";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbReportMoney } from "react-icons/tb";
import { Link } from "react-router-dom";
import Edit from "./edit";
defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const PageProductionLaitiere = () => {
    const [production, setProduction] = useState([]);
    const [idProduction, setIdProduction] = useState('');
    const [switchInput, setSwitchInput] = useState(false);
    const [stat, setStat] = useState([]);
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
        }
    }, [selectedDate, idAgriculteur]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleLinkRClick = (idAgriculteur,id,year,month) => {
        return `/Betail/FactureLaitiere/${idAgriculteur}/${id}/${month}/${year}`;
      };

      const handleLinkRClickRapport = (idAgriculteur,id,year,month) => {
        return `/Betail/RapportProductivite/${idAgriculteur}/${id}/${month}/${year}`;
      };

    const fetchProduction = async () => {
        try {            
            const response = await axios.get(`http://localhost:3001/ProductionBetail/${idAgriculteur}/${id}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear()}`);            
            if (response.data != null) {
                setProduction(response.data.data);
                setIdProduction(response.data._id);
                setProd(response.data.data);
                setDataMonth(response.data.month);
                setDataYear(response.data.year);
                setProdTotal(response.data.productionTotal);
                fetchStatistique();
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
                text: 'Statistique de production laitière',
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

   


    const handleAddButtonClick = (event) => {
        if (window.confirm('Êtes-vous sûr de vouloir ajouter cette production laitière ?')) {
            handleSubmit(event);
        }
    };

   const handleSwitch =()=>{
    setSwitchInput(!switchInput);
   }

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
                 <div>
                 <input type="checkbox" id="check1" class="toggle" onClick={handleSwitch}/>
                 <label for="check1">{switchInput? 'Ajouter':'Modifier'}</label>
                
                 </div>
                 {!switchInput && (

                <>
                <h2>Production laitière Par Mois : {selectedMonth} {selectedYear}</h2>
                
              
                    
                    <Form  id="form"> </Form>
                    
                    <Table responsive className="tableRes text-center">
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
                    <div className="d-flex " style={{float:"right"}}>
                    <Link className="dropdown-item" to={handleLinkRClick(idAgriculteur,id,selectedDate.getFullYear(),selectedDate.getMonth() + 1)} > Facture <LiaFileInvoiceDollarSolid style={{ fontSize: "30px",marginLeft:"10%" }}/></Link>
                    <Link className="dropdown-item" to={handleLinkRClickRapport(idAgriculteur,id,selectedDate.getFullYear(),selectedDate.getMonth() + 1)} style={{marginLeft:"10%"}}> Rapport <TbReportMoney  style={{ fontSize: "30px",marginLeft:"10%" }}/></Link>
                        <button className="btn" form="form"  onClick={handleAddButtonClick} style={{marginLeft:"10%"}}>Ajouter</button></div>
                   </>
                   )}


{switchInput && (

<>
<h2>Production laitière Par Mois : {selectedMonth} {selectedYear}</h2>


    
    <Form  id="form"> </Form>
    
    <Table responsive className="tableRes text-center">
        <thead>
            <tr>
                <th rowSpan="2" scope='col'>N° Semaine</th>
                {daysOfWeek.map((day, index) => (
                    <React.Fragment key={index}>
                        <th colSpan="3" scope='col'>{day}</th>
                    </React.Fragment>
                ))}
            </tr>
            <tr>
                {[...Array(daysOfWeek.length)].map((_, index) => (
                    <React.Fragment key={index}>
                        <th scope='col'>Quantité</th>
                        <th scope='col'>Prix</th>
                        <th scope='col'>Modifier</th>
                    </React.Fragment>
                ))}
            </tr>
        </thead>
        <tbody>
        {[...Array(weeksInMonth)].map((_, semaineIndex) => (
    <tr key={semaineIndex} style={{ textAlign: 'center' }}>
        <td style={{ border: 'solid white', color: 'grey' }}>{semaineIndex + 1}</td>
        {[...Array(Math.min(7 * 3, (daysInMonth - semaineIndex * 7) * 3))].map((_, jourIndex) => {
            const index = semaineIndex * 7 + Math.floor(jourIndex / 3);
            const dayData = production[index];
            const quantite = dayData ? dayData['quantite'] : '';
            const prix = dayData ? dayData['prix'] : '';
            const idJour = dayData ? dayData._id : null;
           const editMod = dayData ? true: false;

            return (
                <td key={jourIndex} style={{ border: 'solid 0.5px white', color: 'grey' }}>
                    {jourIndex % 3 === 2 ? editMod?<Edit idJour={idJour} idProduction={idProduction} quantite={quantite} prix={prix} onUpdate={fetchProduction} /> :"" : jourIndex % 3 === 0 ? quantite : prix}
                </td>
            );
        })}
    </tr>
))}

                                            
                                        </tbody>
        <tfoot>
            <tr>
                <td colSpan='24' style={{textAlign:'right',backgroundColor:'#38c609',color:'white'}}> 
                    <b> Production Total en DT: <span>{(dataYear === selectedDate.getFullYear() && dataMonth === selectedDate.getMonth() + 1) ? prodTotal : 0}</span></b>
                </td>
            </tr>
        </tfoot>
    </Table>
    <div className="d-flex " style={{float:"right"}}>
    <Link className="dropdown-item" to={handleLinkRClick(idAgriculteur,id,selectedDate.getFullYear(),selectedDate.getMonth() + 1)} > Facture <LiaFileInvoiceDollarSolid style={{ fontSize: "30px",marginLeft:"10%" }}/></Link>
    <Link className="dropdown-item" to={handleLinkRClickRapport(idAgriculteur,id,selectedDate.getFullYear(),selectedDate.getMonth() + 1)} style={{marginLeft:"10%"}}> Rapport <TbReportMoney  style={{ fontSize: "30px",marginLeft:"10%" }}/></Link>
        <button className="btn" form="form"  onClick={handleAddButtonClick} style={{marginLeft:"10%"}}>Ajouter</button></div>
   </>
   )}
            </div>
          
           
           
                
           

            <div className="statLitiraire mt-4" >
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default PageProductionLaitiere;
