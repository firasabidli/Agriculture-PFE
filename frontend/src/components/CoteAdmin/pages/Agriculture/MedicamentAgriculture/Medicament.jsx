import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Sidebar';
import Header from '../../../Header';
import './Medicament.css'
import TextField from '@mui/material/TextField';
import { FaRegEdit } from "react-icons/fa";
import { FcFullTrash } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import MyModelMedicament from './MyModelMedicament';
import { Button } from '@mui/material';
//import image from '.../../../src/assets/images/Medicaments'
const Medicament = () => {
	const [editMode, setEditMode] = useState(false);

	const [data, setData] = useState([]);
	const [formData, setFormData] = useState(null);
	const [modalShow, setModalShow] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [page] = useState('Medicament');
	const [isActive] = useState(true);
    
    const [query, setQuery] = useState('');
    //const [results, setResults] = useState([]);
	const [displayedData, setDisplayedData] = useState([]);
    const handleSearch = () => {
        const filteredData = data.filter(item =>
            item.nomMedicament.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedData(filteredData);
    };
//fetchdata
      const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/MedicamentCulture/ListMedicament');
            setData(response.data);
            setDisplayedData(response.data);
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };
	  useEffect(() => {
		fetchData();
	  }, []);
	//   delete
	const handleDelete = async (id) => {
		try {
			// Afficher une alerte pour demander confirmation
			const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
			if (!confirmDelete) {
				return;
			}
	
			const updatedData = data.filter(item => item._id !== id);
            setData(updatedData);
	
			await axios.delete(`http://localhost:3001/MedicamentCulture/delete/${id}`);
				fetchData();
				
		} catch (error) {
			console.error('Erreur lors de la suppression de l\'élément :', error);
		}
	};
	
	const handleModifier = (item) => {
		setFormData(item);
		setModalShow(true);
		setEditMode(true);
	};
	
	
	
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
				<Button className='btn-plus' onClick={() => setModalShow(true)}>
					<FcPlus className='icon-plus'/>
					<span className='btn-title'>Ajouter</span>
				</Button>
				<MyModelMedicament
   show={modalShow}
   onHide={() => setModalShow(false)}
   formData={formData}
   setFormData={setFormData}
   fetchData={fetchData}
   editMode={editMode}
				/>
			</div>
			<div className='main-title'>
				<div className='List-title'>
					<h5>La Pharmacie de la Terre: Découverte de la Liste des Engrais Agricoles</h5>
					<span className='style-line'></span>
					<TextField
						placeholder="rechercher"
						class='rechercher'
						type="search"
						variant="outlined"
						fullWidth
						size="small"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								handleSearch();
							}
						}}
					/>
				</div>
				<section className="ftco-section"> {/* Changed class to className */}
                            <div className="container-materiel"> {/* Changed class to className */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="table-wrap">
                                            {displayedData.length === 0 ? (
                                                <p>Aucune donnée disponible</p>
                                            ) : (
                                                <table className="table ">
                                                    <thead className="thead-dark text-center">
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Image</th>
                                                            <th>Nom</th>
                                                            <th>Description</th>
                                                            <th>Action</th>
															
                                                        </tr>
                                                    </thead>
                                                    <tbody>
													{Array.isArray(displayedData) && displayedData.map((item, index) => (
                                                            <tr key={item._id} className="alert" role="alert">
                                                                <td style={{width:'20px',textAlign:'center'}}>{index}</td>
                                                                <td className='td-im' >
                                                                    {item.image && (
                                                                        <img src={item.image} className='td-image' style={{width:'180px',textAlign:'center'}} alt='Engrais'/>
                                                                    )}
                                                                </td>
                                                                <td className='td-title'>{item.nomMedicament}</td> {/* Changed nom to name */}
                                                                <td>{item.description.length>50? item.description.substring(0, 50) + '...': item.description}</td>
                                                                <td >
																<div className='action ' style={{marginLeft:'100px'}}>
																<FaRegEdit className='icon-edit' style={{color:"#495057"}} onClick={()=> handleModifier(item)}></FaRegEdit>
																<FcFullTrash className='icon-trash' onClick={() => handleDelete(item._id)}></FcFullTrash>
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
{/*  */}
			</div>
		</main>
		</div>
	</div>
    );
};

export default Medicament;


