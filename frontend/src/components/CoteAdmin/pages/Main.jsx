
import {React, useEffect, useState} from 'react';
import axios from 'axios';
import { GiCow, GiFarmer } from 'react-icons/gi';
import { GiWheat } from "react-icons/gi";
import  Charts  from './Chart';
const Main = () => {
    const [betail, setBetail] = useState([]);
    const [agriculteurs, setAgriculteurs] = useState([]);
    const [agricultures, setAgricultures] = useState([]);
    const fetchBetail = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Betail');
            if (Array.isArray(response.data.data)) {
                setBetail(response.data.data);
               
            } else {
                console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    const fetchAgriculteurs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Agriculteur/user');
            if (Array.isArray(response.data)) {
                setAgriculteurs(response.data);
              
            } else {
                console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    const fetchAgricultures = async () => {
        try {
            const response = await axios.get('http://localhost:3001/Agriculture');
            if (Array.isArray(response.data.data)) {
                setAgricultures(response.data.data);
                
            } else {
                console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };
    
    useEffect(() => {
        fetchBetail();
        fetchAgriculteurs();
        fetchAgricultures();
    }, []);
    return (
        <main className='main-container p-3 m-5 resCont'>
        <div class="row row-cols-1 mb-3 ">
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3 "  >
                <div class="card" style={{borderRadius:'5%'}}>
                <div class="card-body"style={{color:'white',backgroundColor:'#e91e63',borderRadius:'5%'}}>
                    <h2 class="card-title text-center text-light"> <GiFarmer style={{fontSize:'50px'}}/></h2>
                    <h5 class="card-title text-center text-light"> Agriculteurs</h5>
                    
                    <h5 className='text-center'>{agriculteurs.length}</h5>
                </div>
                {/* <div class="card-body"style={{color:'white',backgroundColor:'#38c609',borderRadius:'5%'}}>
                    <h2 class="card-title text-center text-light"> <GiFarmer style={{fontSize:'50px'}}/></h2>
                    <h5 class="card-title text-center text-light"> Agriculteurs</h5>
                    
                    <h5 className='text-center'>{agriculteurs.length}</h5>
                </div> */}
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3 "  >
                <div class="card" style={{borderRadius:'5%'}}>
                <div class="card-body"style={{color:'white',backgroundColor:'#7b809a',borderRadius:'5%'}}>
                    <h2 class="card-title text-center text-light"> <GiCow style={{fontSize:'50px'}}/></h2>
                    <h5 class="card-title text-center text-light"> Bétails</h5>
                    
                    <h5 className='text-center'>{betail.length}</h5>
                </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 col-lg-4 mb-3 "  >
                <div class="card" style={{borderRadius:'5%'}}>
                <div class="card-body"style={{color:'white',backgroundColor:'#4caf50',borderRadius:'5%'}}>
                    <h2 class="card-title text-center text-light"> <GiWheat  style={{fontSize:'50px'}}/></h2>
                    <h5 class="card-title text-center text-light"> cultures</h5>
                    
                    <h5 className='text-center'>{agricultures.length}</h5>
                </div>
                </div>
            </div>
          
            </div>
            <Charts agricultures={agricultures.length} betails={betail}/>
        </main>
    );
};

export default Main;