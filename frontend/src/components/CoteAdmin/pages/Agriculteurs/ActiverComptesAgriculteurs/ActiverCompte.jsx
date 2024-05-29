import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Sidebar';
import Header from '../../../Header';
import { FaEye } from "react-icons/fa";
import './ActiverCompte.css'
import Accepter from './Accepter';
import Refuser from './Refuser';
import ViewDetails from './viewDetails';
const ActiverCompte = () => {
    const [data, setData] = useState([]);
   
	const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [page] = useState('ActiverCompte');
	const [isActive] = useState(true);
	const [query, setQuery] = useState('');
    //const [results, setResults] = useState([]);
	const [displayedData, setDisplayedData] = useState([]);

  

    // fetchData function
	const fetchData = async () => {
		try {
			const response = await axios.get('http://localhost:3001/ActiverCompte/');
			if (Array.isArray(response.data)) {
				setData(response.data.data);
				setDisplayedData(response.data); // Afficher les données complètes initialement
			} else {
				console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data);
			}
		} catch (error) {
			console.error('Erreur lors du chargement des données:', error);
		}
	};
	

    useEffect(() => {
        fetchData();
    }, []);

    

    
	

    const toggleSidebar = () => {
        setIsSidebarCollapsed(!isSidebarCollapsed);
    };

    return (
		<div className='wrapper'>
		
		<Sidebar isSidebarCollapsed={isSidebarCollapsed}  page={page} isActive={isActive}/>
		<div className="flex-grow-1"> 
		<Header toggleSidebar={toggleSidebar}/>
		<main className='stock-container'>
			<div className='main-ajoute'>
				
				
			</div>
			<div className='main-title'>
				<div className='List-title'>
					<h5>Activer les comptes des Agriculteurs</h5>
					<span className='style-line'></span>
					
				</div>
				<section class="ftco-section">
					<div class="container-materiel">
						<div class="row">
							<div class="col-md-12">
								<div class="table-wrap">
								{displayedData.length === 0 ? (
								<p>Aucune donnée disponible</p>
							) : (

									<table className="table text-center">
										<thead className="thead-dark">
											<tr>
												<th style={{backgroundColor:"#7b809a"}}>ID no.</th>
												<th style={{backgroundColor:"#7b809a"}}>Nom </th>
                                                <th style={{backgroundColor:"#7b809a"}}>N° de téléphone</th>
												<th style={{backgroundColor:"#7b809a"}}>email</th>
												<th style={{backgroundColor:"#7b809a"}}>Action</th>
											</tr>
										</thead>
										<tbody>
											{displayedData.map((item, index) => (
												<tr key={item._id} className="alert" role="alert">
													<td>{index}</td>
													<td className='td-im w-25' >
													{item.nom}
													</td>
													<td className='td-title'>{item.numeroTelephone}</td>
													<td>{item.email}</td>
													<td >
														<div className='action '>
															<ViewDetails  Agriculteur={item}/>
															<Accepter onActivate={fetchData()} userId={item._id} />
                                                            <Refuser onrefuse={fetchData()} userId={item._id} />
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
		</div>
	</div>
    );
};

export default ActiverCompte;
