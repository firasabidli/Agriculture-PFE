import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../Sidebar';
import Header from '../../Header';
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
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
	//const [selectedItems, setSelectedItems] = useState([]);
    //fetchData
	const fetchData = async () => {
		try {
			axios.get('http://localhost:3001/MethodeStock/ListStock')
			.then(response => setData(response.data))
			.catch(error => console.error('Erreur de chargement des Cultures', error));
		  } catch (error) {
			console.error('Une erreur s\'est produite lors de la récupération des données:', error);
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
	
			await axios.delete(`http://localhost:3001/MethodeStock/deletStock/${id}`);
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
			<MyModelAjouterStock
        show={modalShow}
        onHide={() => setModalShow(false)}
        formData={formData}
    setFormData={setFormData}
    // handleSubmit={handleSubmit}
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
						  {data.map((item, index) => (
							<tr key={index} className="alert" role="alert">
								<th scope="row">{index}</th>
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
    );
};

export default MethodeStock;
