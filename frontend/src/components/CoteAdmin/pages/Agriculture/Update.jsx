import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
function Update({ onUpdate, agricultureId }) {
  const [show, setShow] = useState(false);
  const [agriculture, setAgriculture] = useState([]);
  const [saisons, setSaisons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedSaison, setSelectedSaison] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [selectedMedicaments, setSelectedMedicaments] = useState([]);
  const [image, setImage] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchAgriculture = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Agriculture/${agricultureId}`);
      const data = response.data.data;
      setAgriculture(data);
      setSelectedSaison(data.saison._id);
      setSelectedCategorie(data.categorie._id);
      setSelectedMaterials(data.materiels.map(material => material._id));
      setSelectedStocks(data.MethodesStock.map(stock => stock._id));
      setSelectedMedicaments(data.MedicamentsCulture.map(medicament => medicament._id));
    } catch (error) {
      console.error('Error fetching culture:', error);
    }
  };

  const fetchSaisons = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Saison");
      setSaisons(response.data.data);
    } catch (error) {
      console.error("Error fetching saisons:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Categorie");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const response = await axios.get("http://localhost:3001/Materiel");
      setMaterials(response.data.data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    }
  };

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/MethodeStock/ListStock");
      setStocks(response.data);
      
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };
  const fetchMedicaments = async () => {
    try {
      const response = await axios.get("http://localhost:3001/MedicamentCulture/ListMedicament");
      setMedicaments(response.data);
      
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };
  useEffect(() => {
    
      fetchAgriculture();
      fetchSaisons();
      fetchCategories();
      fetchMaterials();
      fetchStocks();
      fetchMedicaments();
   
  }, []);


  
  
  const handleMaterialChange = (e, materialId) => {
    const isChecked = e.target.checked;
    setSelectedMaterials(prevSelectedMaterials => {
      if (isChecked) {
        return [...prevSelectedMaterials, materialId];
      } else {
        return prevSelectedMaterials.filter(id => id !== materialId);
      }
    });
  };
  
  const handleStockChange = (e, stockId) => {
    const isChecked = e.target.checked;
    setSelectedStocks(prevSelectedStocks => {
      if (isChecked) {
        return [...prevSelectedStocks, stockId];
      } else {
        return prevSelectedStocks.filter(id => id !== stockId);
      }
    });
  };

  const handleMedicamentChange = (e, medicamentId) => {
    const isChecked = e.target.checked;
    setSelectedMedicaments(prevSelectedMedicaments => {
      if (isChecked) {
        return [...prevSelectedMedicaments, medicamentId];
      } else {
        return prevSelectedMedicaments.filter(id => id !== medicamentId);
      }
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      formData.append('saisonId', selectedSaison);
      formData.append('categorieId', selectedCategorie);
      selectedMaterials.forEach(material => {
        formData.append('materials', material);
      });
      selectedStocks.forEach(stock => {
        formData.append('MethodesStock', stock);
      });
      selectedMedicaments.forEach(medicament => {
        formData.append('MedicamentsCulture', medicament);
      });
      formData.append('image_agriculture', image);
      const result = await axios.put(`http://localhost:3001/Agriculture/${agricultureId}`,
       formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      handleClose();
      alert(result.data.message);
      onUpdate();
      
    } catch (error) {
      console.error('Error updating culture:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  return (
    <>
      <FaRegEdit type='button' className='icon-edit' onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier Culture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {agriculture && (
            <Form onSubmit={handleSubmit} id="updateForm">
             <Form.Group className="mb-3" controlId="nom_culture">
                <FloatingLabel controlId="floatingTextarea2" label="Nom Culture:">
                  <Form.Control
                    type="text"
                    placeholder="Nom Culture"
                    defaultValue={agriculture.nom_agriculture}
                    name="nom_culture"
                  />
                </FloatingLabel>
              </Form.Group>


              <Form.Group className="mb-3" controlId="description">
                <FloatingLabel controlId="floatingTextarea2" label="Description">
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    defaultValue={agriculture.description}
                    style={{ height: '100px' }}
                    name="description"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="date_plantation">
                <FloatingLabel controlId="floatingTextarea2" label="Date Plantation">
                  <Form.Control
                    type='date'
                    placeholder="Date Plantation"
                    defaultValue={agriculture.date_plantation}
                    name="date_plantation"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="date_recolte">
                <FloatingLabel controlId="floatingTextarea2" label="Date Recolte">
                  <Form.Control
                    type='date'
                    placeholder="Date Recolte"
                    defaultValue={agriculture.date_recolte}
                    name="date_recolte"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="methode_irrigation">
                <FloatingLabel controlId="floatingTextarea2" label="Methode Irrigation">
                  <Form.Control
                    type='text'
                    placeholder="Methode Irrigation"
                    defaultValue={agriculture.methode_irrigation}
                    name="methode_irrigation"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="quantite_eau_irrigation">
                <FloatingLabel controlId="floatingTextarea2" label="Quantité Eau Irrigation">
                  <Form.Control
                    type='number'
                    placeholder="Quantité Eau Irrigation"
                    defaultValue={agriculture.quantite_eau_irrigation}
                    name="quantite_eau_irrigation"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="frequence_surveillance">
                <FloatingLabel controlId="floatingTextarea2" label="Fréquence Surveillance">
                  <Form.Control
                    type="text"
                    placeholder="Fréquence Surveillance"
                    defaultValue={agriculture.frequence_surveillance}
                    name="frequence_surveillance"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="date_derniere_surveillance">
                <FloatingLabel controlId="floatingTextarea2" label="Date Derniere Surveillance">
                  <Form.Control
                    type='date'
                    placeholder="Date Derniere Surveillance"
                    defaultValue={agriculture.date_derniere_surveillance}
                    name="date_derniere_surveillance"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="image_culture">
                <Form.Label>Image Agriculture:</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>

              <Form.Group className="mb-3" controlId="remarques">
                <FloatingLabel controlId="floatingTextarea2" label="Remarques">
                  <Form.Control
                    as="textarea"
                    placeholder="Remarques"
                    defaultValue={agriculture.remarques}
                    style={{ height: '100px' }}
                    name="remarques"
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group className="mb-3" controlId="saison">
                <Form.Label>Saison</Form.Label>
                <Form.Control as="select" value={selectedSaison} onChange={(e) => setSelectedSaison(e.target.value)}>
                  <option value="">Sélectionnez une saison</option>
                  {saisons && saisons.map(saison => (
                    <option key={saison._id} value={saison._id}>{saison.nom_saison}</option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" controlId="categorie">
                <Form.Label>Catégorie</Form.Label>
                <Form.Control as="select" value={selectedCategorie} onChange={(e) => setSelectedCategorie(e.target.value)}>
                  <option value="">Sélectionnez une catégorie</option>
                  {categories && categories.map(categorie => (
                    <option key={categorie._id} value={categorie._id}>{categorie.nom_categorie}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="materiels">
              <Form.Label>Matériaux</Form.Label>
              {materials && materials.map(material => (
                <Form.Check
                  key={material._id}
                  type="checkbox"
                  id={material._id}
                  label={material.name}
                  checked={selectedMaterials.includes(material._id)}
                  onChange={(e) => handleMaterialChange(e, material._id)}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3" controlId="stocks">
              <Form.Label>Stocks</Form.Label>
              {stocks && stocks.map(stock => (
                <Form.Check
                  key={stock._id}
                  type="checkbox"
                  id={stock._id}
                  label={stock.title}
                  checked={selectedStocks.includes(stock._id)}
                  onChange={(e) => handleStockChange(e, stock._id)}
                />
              ))}
            </Form.Group>


            <Form.Group className="mb-3" controlId="stocks">
              <Form.Label>Medicaments</Form.Label>
              {medicaments && medicaments.map(medicament => (
                <Form.Check
                  key={medicament._id}
                  type="checkbox"
                  id={medicament._id}
                  label={medicament.nomMedicament}
                  checked={selectedMedicaments.includes(medicament._id)}
                  onChange={(e) => handleMedicamentChange(e, medicament._id)}
                />
              ))}
            </Form.Group>

              
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className="bg-secondary" onClick={handleClose}>Fermer</Button>
          <Button className="btn" type="submit" form="updateForm"> Modifier </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Update;
