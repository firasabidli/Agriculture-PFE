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
  const [errors, setErrors] = useState({});
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
      setFrequenceSurveillance(data.frequence_surveillance)
      setQuantiteEauIrrigation(data.quantite_eau_irrigation)
      setDateDerniereSurveillance(data.date_derniere_surveillance)
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
      
   
  }, );

 
  
  
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
// select engrais
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
// validation 
  const validateFormUpdate = () => {
    const newErrors = {};

    if (!agriculture.nom_agriculture.trim()) {
      newErrors.nom_agriculture = "Le nom de l'agriculture est requis";
    }
    if (agriculture.nom_agriculture.length<4) {
      newErrors.nom_agriculture = 'La taille du nom de la catégorie doit etre superieur ou égale à 4';
    }
    if (/\d/.test(agriculture.nom_agriculture))  {
      newErrors.nom_agriculture = 'Le nom de la catégorie ne doit pas contenir de chiffres';
    }
    if (!agriculture.description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (agriculture.description.length<6) {
      newErrors.description = 'La taille du la description doit etre superieur ou égale à 6';
    }
    if (/\d/.test(agriculture.description))  {
      newErrors.description = 'La description ne doit pas contenir de chiffres';
    }

    if (!agriculture.remarques.trim()) {
      newErrors.remarques = 'La remarque est requise';
    }
    if (agriculture.remarques.length<6) {
      newErrors.remarques = 'La taille du la remarque doit etre superieur ou égale à 6';
    }
    if (methode_irrigation==='') {
      newErrors.methodeIrrigation = "Il faut choisir une méthode d'irrigation";
    }else{
    if (methode_irrigation!=="irrigation gravitaire"){
      if (quantite_eau_irrigation===""){
        newErrors.quantite_eau_irrigation = "la quantité d'eau d'irrigation est requise kkkkkkkkkk";
      }
      if (frequence_surveillance===""){
        newErrors.frequence_surveillance = "il faut choisir le nombre des jours d'irrigation par semaine kkkkkkkkkkk";
      }

      if(date_derniere_surveillance===""){
        newErrors.date_derniere_surveillance = "il faut choisir une date correcte";
      }
      if(agriculture.date_recolte<date_derniere_surveillance )
  {
    newErrors.date_derniere_surveillance = "la date dernier d'irrigation  doit etre avant la date de recolte jjjjjjjjjj ";
  }
  if(date_derniere_surveillance<agriculture.date_plantation )
  {
    newErrors.date_derniere_surveillance = "la date dernier d'irrigation  doit etre après la date de plantation ";
  }


    }
  }
  
  if(agriculture.date_plantation===""){
    newErrors.date_plantation = "il faut choisir une date de plantation correcte";
  }
  if(agriculture.date_recolte===""){
    newErrors.date_recolte = "il faut choisir une date de recolte correcte";
  }

  if(agriculture.date_recolte<agriculture.date_plantation)
  {
    newErrors.date_recolte = "la date de recolte doit etre apres la date de plantation ";
  }
  
    if (selectedSaison==='') {
      newErrors.saison = 'Il faut choisir une saison';
    }
    if (selectedCategorie==='') {
      newErrors.categorie = 'Il faut choisir une catégorie';
    }

    if (Object.keys(selectedMaterials).length === 0) {
      newErrors.materials = 'Au moins un équipement doit être sélectionné';
    }
    if (Object.keys(selectedStocks).length === 0) {
      newErrors.stocks = 'Au moins une méthode de stockage doit être sélectionnée';
    }
    if (Object.keys(selectedMedicaments).length === 0) {
      newErrors.medicaments = 'Au moins un engrais doit être sélectionné';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // function submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFormUpdate()) {
      return;
    }
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
      <FaRegEdit type='button' className='icon-edit' style={{color:"#495057"}} onClick={handleShow} />

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
                {errors.categorie && <div className="text-danger">{errors.categorie}</div>}
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
                {errors.nom_agriculture && <div className="text-danger">{errors.nom_agriculture}</div>}
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
                {errors.description && <div className="text-danger">{errors.description}</div>}
              </Form.Group>

              <Form.Group className="mb-3" controlId="saison">
                <Form.Label>Saison</Form.Label>
                <Form.Control as="select" value={selectedSaison} onChange={(e) => setSelectedSaison(e.target.value)}>
                  <option value="">Sélectionnez une saison</option>
                  {saisons && saisons.map(saison => (
                    <option key={saison._id} value={saison._id}>{saison.nom_saison}</option>
                  ))}
                </Form.Control>
                {errors.saison && <div className="text-danger">{errors.saison}</div>}
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
                {errors.date_plantation && <div className="text-danger">{errors.date_plantation}</div>}
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
                {errors.date_recolte && <div className="text-danger">{errors.date_recolte}</div>}
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
              {errors.methodeIrrigation && <div className="text-danger">{errors.methodeIrrigation}</div>}
            </Form.Group>
            {showQuantity && (
              <Form.Group className="mb-3" controlId="quantite_eau_irrigation">
                <FloatingLabel controlId="floatingTextarea2" label="Quantité Eau Irrigation">
                  <Form.Control
                    type='Number'
                    placeholder="quantite_eau_irrigation"
                    defaultValue={agriculture.quantite_eau_irrigation}
                    onChange={(e) => setQuantiteEauIrrigation(e.target.value)}
                  />
                </FloatingLabel>
                {errors.quantite_eau_irrigation && <div className="text-danger">{errors.quantite_eau_irrigation}</div>}
              </Form.Group>
            )}

            {showFrequency && (
              <>
               <Form.Group controlId="frequence_surveillance" className="mb-3">
              <Form.Label>Fréquence d'irrigation par semaine</Form.Label>
              <Form.Select defaultValue={agriculture.frequence_surveillance}  onChange={(e) => setFrequenceSurveillance(e.target.value)}>
                <option  disabled value="">Choisir nombre des jours</option>
                <option selected={agriculture.frequence_surveillance==="1 Jours"} value="1 Jours">1 Jour</option>
                <option selected={agriculture.frequence_surveillance==="2 Jours"} value="2 Jours">2 Jours</option>
                <option selected={agriculture.frequence_surveillance==="3 Jours"} value="3 Jours">3 Jours </option>
                <option selected={agriculture.frequence_surveillance==="4 Jours"} value="4 Jours">4 Jours</option>
                <option selected={agriculture.frequence_surveillance==="5 Jours"} value="5 Jours">5 Jours</option>
                <option  selected={agriculture.frequence_surveillance==="6 Jours"}value="6 Jours">6 Jours</option>
                <option  selected={agriculture.frequence_surveillance==="Toutes les jours"}value="Toutes les jours">Toutes les jours</option>
              </Form.Select>
              {errors.frequence_surveillance && <div className="text-danger">{errors.frequence_surveillance}</div>}
            </Form.Group>
              
              
              <Form.Group className="mb-3" controlId="date_derniere_surveillance">
              <FloatingLabel controlId="floatingTextarea2" label="Date Derniere d'irrigation">
                <Form.Control
                  type='date'
                  placeholder="Date Derniere d'irrigation"
                  defaultValue={agriculture.date_derniere_surveillance}
                  onChange={(e) => setDateDerniereSurveillance(e.target.value)}
                />
              </FloatingLabel>
              {errors.date_derniere_surveillance && <div className="text-danger">{errors.date_derniere_surveillance}</div>}
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
                {errors.remarques && <div className="text-danger">{errors.remarques}</div>}
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
               {errors.materials && <div className="text-danger">{errors.materials}</div>}
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
               {errors.stocks && <div className="text-danger">{errors.stocks}</div>}
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
                {errors.medicaments && <div className="text-danger">{errors.medicaments}</div>}
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
