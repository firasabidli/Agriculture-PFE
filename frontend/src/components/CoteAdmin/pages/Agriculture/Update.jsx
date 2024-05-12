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
  const [methode_irrigation, setMethodeIrrigation] = useState("");
  const [quantite_eau_irrigation, setQuantiteEauIrrigation] = useState('');
  const [frequence_surveillance, setFrequenceSurveillance] = useState('');
  const [date_derniere_surveillance, setDateDerniereSurveillance] = useState('');
  const [showQuantity, setShowQuantity] = useState(true);
  const [showFrequency, setShowFrequency] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const fetchAgriculture = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/Agriculture/${agricultureId}`);
      const data = response.data.data;
      console.log("agri",data);
      setAgriculture(data);
      setMethodeIrrigation(data.methode_irrigation);
      setShowQuantity(data.methode_irrigation !== 'irrigation gravitaire');
      setShowFrequency(data.methode_irrigation !== 'irrigation gravitaire');
      fetchEquipStockEngraisByCategorie(agriculture.categorie)
      setSelectedSaison(data.saison._id);
      await fetchEquipStockEngraisByCategorie(data.categorie._id);
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


  useEffect(() => {
    
      fetchAgriculture();
      fetchEquipStockEngraisByCategorie(agriculture.categorie)
      fetchSaisons();
      fetchCategories();
      
   
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
      formData.append('methode_irrigation', methode_irrigation);
      if(methode_irrigation==='irrigation gravitaire') {
        formData.append('quantite_eau_irrigation', 0);
        formData.append('frequence_surveillance', "Cette méthode d'irrigation ne nécessite pas une fréquence d'irrigation !");
        formData.append('date_derniere_surveillance', "Cette méthode d'irrigation ne nécessite pas une date dernier de fréquence d'irrigation !");
      }
      else{
        formData.append('quantite_eau_irrigation', quantite_eau_irrigation);
        formData.append('frequence_surveillance', frequence_surveillance);
        formData.append('date_derniere_surveillance', date_derniere_surveillance);
      }
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
      window.location.reload();
    } catch (error) {
      console.error('Error updating culture:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const fetchEquipStockEngraisByCategorie = async (categorieId) => {
    try {
      const response = await axios.get(`http://localhost:3001/Categorie/${categorieId}`);
      setMaterials(response.data.data.Equipements);
      setStocks(response.data.data.MethodeStockage);
      setMedicaments(response.data.data.Engrais);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
 
 
  const handleCategoryChange = async (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategorie(selectedCategoryId);
    // Assurez-vous que la catégorie sélectionnée n'est pas vide
    if (selectedCategoryId) {
      await fetchEquipStockEngraisByCategorie(selectedCategoryId);
    }
  };

  

  const handleMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setMethodeIrrigation(selectedMethod);
    setShowQuantity(selectedMethod !== 'irrigation gravitaire');
    setShowFrequency(selectedMethod !== 'irrigation gravitaire');
  };

  
 
 
  return (
    <>
      <FaRegEdit type='button' className='icon-edit' onClick={handleShow} />

      <Modal show={show} onHide={handleClose} className='modal-lg'>
  <Modal.Header closeButton>
    <Modal.Title>Modifier Agriculture</Modal.Title>
  </Modal.Header>
  <Form onSubmit={handleSubmit} id="updateForm">
  <Modal.Body className='w-100'>
          {agriculture && (
            <div>
              <Form.Group className="mb-3" controlId="categorie">
                <Form.Label>Catégorie</Form.Label>
                <Form.Control as="select" value={selectedCategorie} onChange={handleCategoryChange}>
                  <option value="">Sélectionnez une catégorie</option>
                  {categories && categories.map(categorie => (
                    <option key={categorie._id} value={categorie._id}>{categorie.nom_categorie}</option>
                  ))}
                </Form.Control>
              </Form.Group>

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

              <Form.Group className="mb-3" controlId="saison">
                <Form.Label>Saison</Form.Label>
                <Form.Control as="select" value={selectedSaison} onChange={(e) => setSelectedSaison(e.target.value)}>
                  <option value="">Sélectionnez une saison</option>
                  {saisons && saisons.map(saison => (
                    <option key={saison._id} value={saison._id}>{saison.nom_saison}</option>
                  ))}
                </Form.Control>
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

              

              <Form.Group controlId="methodeIrrigation" className="mb-3">
              <Form.Label>Methode Irrigation</Form.Label>
              <Form.Select value={methode_irrigation} onChange={handleMethodChange}>
                <option value="">Choisir une méthode d'irrigation</option>
                <option value="goutte à goutte">Goutte à goutte</option>
                <option value="aspersion">Aspersion</option>
                <option value="irrigation par pivot">Irrigation par pivot</option>
                <option value="irrigation gravitaire">Irrigation gravitaire</option>
              </Form.Select>
            </Form.Group>
            {showQuantity && (
              <Form.Group className="mb-3" controlId="quantite_eau_irrigation">
                <FloatingLabel controlId="floatingTextarea2" label="Quantité Eau Irrigation">
                  <Form.Control
                    type='Number'
                    placeholder="quantite_eau_irrigation"
                    defaultValue={methode_irrigation===agriculture.methode_irrigation? agriculture.quantite_eau_irrigation : ''}
                    onChange={(e) => setQuantiteEauIrrigation(e.target.value)}
                  />
                </FloatingLabel>
              </Form.Group>
            )}

            {showFrequency && (
              <>
               <Form.Group controlId="frequence_surveillance" className="mb-3">
              <Form.Label>Fréquence d'irrigation par semaine</Form.Label>
              <Form.Select defaultValue={methode_irrigation===agriculture.methode_irrigation? agriculture.frequence_surveillance :''}  onChange={(e) => setFrequenceSurveillance(e.target.value)}>
                <option value="">Choisir nombre des jours</option>
                <option value="1 Jours">1 Jour</option>
                <option value="2 Jours">2 Jours</option>
                <option value="3 Jours">3 Jours </option>
                <option value="4 Jours">4 Jours</option>
                <option value="5 Jours">5 Jours</option>
                <option value="6 Jours">6 Jours</option>
                <option value="Toutes les jours">Toutes les jours</option>
              </Form.Select>
            </Form.Group>
              
              
              <Form.Group className="mb-3" controlId="date_derniere_surveillance">
              <FloatingLabel controlId="floatingTextarea2" label="Date Derniere Surveillance">
                <Form.Control
                  type='date'
                  placeholder="Date Derniere Surveillance"
                  defaultValue={methode_irrigation===agriculture.methode_irrigation? agriculture.date_derniere_surveillance :''}
                  onChange={(e) => setDateDerniereSurveillance(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            </>
            )}

              

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

             

              
              
              <Form.Group className="mb-3" controlId="materiels">
              <Form.Label>Equipements</Form.Label>
              {materials && materials.map(material => (
                <Form.Check
                  key={material._id}
                  type="checkbox"
                  id={material._id}
                  label={material.nom}
                  checked={selectedMaterials.includes(material._id)}
                  onChange={(e) => handleMaterialChange(e, material._id)}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3" controlId="stocks">
              <Form.Label>Metode de stockage</Form.Label>
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
              <Form.Label>Engrais agricole</Form.Label>
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

            </div> 
           
          )}
        </Modal.Body>
    <Modal.Footer>
      <Button className="bg-secondary" onClick={handleClose}>Fermer</Button>
      <Button className="btn" type="submit" form="updateForm"> Modifier </Button>
    </Modal.Footer>
  </Form>
</Modal>
    </>
  );
}

export default Update;
