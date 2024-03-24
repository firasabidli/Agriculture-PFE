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
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
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
	
	
	
	const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
    return (
        <div className='grid-dashboard'>
        
        <Header OpenSidebar={OpenSidebar}/>
         <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
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
					<h5>La Pharmacie de la Terre: Découverte de la Liste des Médicaments Agricoles</h5>
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
				<div class="table100 ver2 m-b-110">
					<div class="table100-head">
						<table>
							<thead>
								<tr class="row100 head">
									<th class="cell100 column1">Image Medicament</th>
									<th class="cell100 column2">Nom</th>
									<th class="cell100 column3">Description</th>
									<th class="cell100 column4">modifier</th>
									<th class="cell100 column5">Supprimer</th>
								</tr>
							</thead>
						</table>
					</div>
					<div class="table100-body js-pscroll">
						<table>
							<tbody>
								{Array.isArray(displayedData) && displayedData.map((item, index) => (
									<tr key={item._id} class="row100 body">
										<td class="cell100 column1"><img  className='imagetd-' src={item.image} alt="Méthode Stock" /></td>
										<td class="cell100 column2">{item.nomMedicament}</td>
										<td class="cell100 column3">{item.description}</td>
										<td class="cell100 column4"><FaRegEdit className='icon-edit' onClick={()=> handleModifier(item)}></FaRegEdit></td>
										<td class="cell100 column5"><FcFullTrash className='icon-trash' onClick={() => handleDelete(item._id)}></FcFullTrash></td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
{/*  */}
			</div>
		</main>
	</div>
    );
};

export default Medicament;
