import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../../Sidebar';
import Header from '../../../Header';
import './Stock.css'
import TextField from '@mui/material/TextField';
import { FaRegEdit } from "react-icons/fa";
import { FcFullTrash } from "react-icons/fc";
import { FcPlus } from "react-icons/fc";
import MyModelAjouterStock from './MyModelAjouterStock';
import { Button } from '@mui/material';

const MethodeStock = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
	const [page, setPage] = useState('Stock');
	const [isActive, setIsActive] = useState(true);
	const [query, setQuery] = useState('');
    //const [results, setResults] = useState([]);
	const [displayedData, setDisplayedData] = useState([]);

    const handleSearch = () => {
        const filteredData = data.filter(item =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        );
        setDisplayedData(filteredData);
    };

    // fetchData function
	const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/MethodeStock/ListStock');
            setData(response.data);
            setDisplayedData(response.data); // Afficher les données complètes initialement
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Delete function
    const handleDelete = async (id) => {
        try {
            const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cet élément ?");
            if (!confirmDelete) {
                return;
            }
            await axios.delete(`http://localhost:3001/MethodeStock/deletStock/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleModifier = (item) => {
        setFormData(item);
        setModalShow(true);
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
				<MyModelAjouterStock
					show={modalShow}
					onHide={() => setModalShow(false)}
					formData={formData}
					setFormData={setFormData}
					fetchData={fetchData}
				/>
			</div>
			<div className='main-title'>
				<div className='List-title'>
					<h5>Liste Methode du Stock</h5>
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
					<div class="container">
						<div class="row">
							<div class="col-md-12">
								<div class="table-wrap">
									<table class="table">
										<thead class="thead-dark">
											<tr>
												<th>ID no.</th>
												<th>image_MethodStock</th>
												<th>Title</th>
												<th>description</th>
												<th>Action</th>
											</tr>
										</thead>
										<tbody>
											{displayedData.map((item, index) => (
												<tr key={item._id} className="alert" role="alert">
													<td>{index}</td>
													<td className='td-im'><img  className='td-image' src={item.image_MethodStock} alt="Méthode Stock" /></td>
													<td className='td-title'>{item.title}</td>
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
	</div>
    );
};

export default MethodeStock;
