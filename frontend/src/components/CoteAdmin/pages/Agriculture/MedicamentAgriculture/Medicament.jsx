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
				return; // Annuler la suppression si l'utilisateur a cliqué sur "Annuler" dans l'alerte
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
	};
	
	
	
	const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
// Ajoutez cette fonction pour récupérer les images
// const fetchImage = (imageName) => {
//     return `http://localhost:3001/images/${imageName}`; // Construire correctement l'URL de l'image
// }

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
				<section class="ftco-section">
					<div class="container-table">
						<div class="row">
							<div class="col-md-12">
								<div class="table-wrap">
									<table class="table">
										<thead class="thead-dark">
											<tr>
												<th>ID no.</th>
												<th>Image</th>
												<th>NomMedicament</th>
												<th>Description</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
										{Array.isArray(displayedData) && displayedData.map((item, index) => (
												<tr key={item._id} className="alert" role="alert">
													<td>{index}</td>
													<td className='td-im'><img  className='td-image' src={item.image} alt="Méthode Stock" /></td>
													{/* <td className='td-im'><img  className='td-image' src={require(`../../../../../assets/Medicaments/${item.image}`)} alt="Medicament" /></td> */}
													<td className='td-title'>{item.nomMedicament}</td>
													<td>{item.description}</td>
													<td>
														<div className='action'>
															<FaRegEdit type='button' className='icon-edit' onClick={()=> handleModifier(item)} />
															<FcFullTrash type='button' className='icon-trash' onClick={() => handleDelete(item._id)}  />
														</div>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	</div>
    );
};

export default Medicament;
