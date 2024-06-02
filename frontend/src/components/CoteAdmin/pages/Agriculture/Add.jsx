import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FcPlus } from "react-icons/fc";

function Add({ onCreate }) {
  const [show, setShow] = useState(false);
  const [nom_agriculture, setNomAgriculture] = useState("");
  const [description, setDescription] = useState("");
  const [date_plantation, setDatePlantation] = useState("");
  const [date_recolte, setDateRecolte] = useState("");
  const [methode_irrigation, setMethodeIrrigation] = useState("");
  const [quantite_eau_irrigation, setQuantiteEauIrrigation] = useState("");
  const [frequence_surveillance, setFrequenceSurveillance] = useState("");
  const [date_derniere_surveillance, setDateDerniereSurveillance] = useState("");
  const [image_agriculture, setImageAgriculture] = useState(null);
  const [remarques, setRemarques] = useState("");
  const [saisons, setSaisons] = useState([]);
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [medicaments, setMedicaments] = useState([]);
  const [selectedSaison, setSelectedSaison] = useState('');
  const [selectedCategorie, setSelectedCategorie] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState({});
  const [selectedStocks, setSelectedStocks] = useState({});
  const [selectedMedicaments, setSelectedMedicaments] = useState({});
  const [showQuantity, setShowQuantity] = useState(false);
  const [showFrequency, setShowFrequency] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchSaisons();
    fetchCategories();
    // fetchMaterials();
    // fetchStocks();
    // fetchMedicaments();
    
    
  }, []);
 
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
 

  

  const handleClose = () => {
    setShow(false);
    resetForm();
    setErrors({});
  };

  const handleShow = () => setShow(true);

  const validateForm = () => {
    const newErrors = {};

    if (!nom_agriculture.trim()) {
      newErrors.nom_agriculture = "Le nom de l'agriculture est requis";
    }
    if (nom_agriculture.length<4) {
      newErrors.nom_agriculture = 'La taille du nom de la catégorie doit etre superieur ou égale à 4';
    }
    if (/\d/.test(nom_agriculture))  {
      newErrors.nom_agriculture = 'Le nom de la catégorie ne doit pas contenir de chiffres';
    }
    if (!description.trim()) {
      newErrors.description = 'La description est requise';
    }
    if (description.length<6) {
      newErrors.description = 'La taille du la description doit etre superieur ou égale à 6';
    }
    if (/\d/.test(description))  {
      newErrors.description = 'La description ne doit pas contenir de chiffres';
    }

    if (!remarques.trim()) {
      newErrors.remarques = 'La remarque est requise';
    }
    if (remarques.length<6) {
      newErrors.remarques = 'La taille du la remarque doit etre superieur ou égale à 6';
    }
    if (methode_irrigation==='') {
      newErrors.methodeIrrigation = "Il faut choisir une méthode d'irrigation";
    }else{
    if (methode_irrigation!=="irrigation gravitaire"){
      if (quantite_eau_irrigation===""){
        newErrors.quantite_eau_irrigation = "la quantité d'eau d'irrigation est requise";
      }
      if (frequence_surveillance===""){
        newErrors.frequence_surveillance = "il faut choisir le nombre des jours d'irrigation par semaine";
      }

      if(date_derniere_surveillance===""){
        newErrors.date_derniere_surveillance = "il faut choisir une date correcte";
      }
      if(date_recolte<date_derniere_surveillance )
  {
    newErrors.date_derniere_surveillance = "la date dernier d'irrigation  doit etre avant la date de recolte ";
  }
  if(date_derniere_surveillance<date_plantation )
  {
    newErrors.date_derniere_surveillance = "la date dernier d'irrigation  doit etre après la date de plantation ";
  }


    }
  }
  if(image_agriculture===null){
    newErrors.image_agriculture = "Image Agriculture est requise ";
  
  }
  if(date_plantation===""){
    newErrors.date_plantation = "il faut choisir une date de plantation correcte";
  }
  if(date_recolte===""){
    newErrors.date_recolte = "il faut choisir une date de recolte correcte";
  }

  if(date_recolte<date_plantation)
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
  const resetForm = () => {
    setNomAgriculture('');
    setDescription('');
    setDatePlantation('');
    setDateRecolte('');
    setMethodeIrrigation('');
    setQuantiteEauIrrigation('');
    setFrequenceSurveillance('');
    setDateDerniereSurveillance('');
    setImageAgriculture(null);
    setRemarques('');
    setSelectedCategorie('');
    setSelectedSaison('');
    setSelectedMaterials({});
    setSelectedStocks({});
    setSelectedMedicaments({});
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formData = new FormData();
    formData.append("nom_agriculture", nom_agriculture);
    formData.append("description", description);
    formData.append("date_plantation", date_plantation);
    formData.append("date_recolte", date_recolte);
    formData.append("methode_irrigation", methode_irrigation);
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
    
    formData.append("image_agriculture", image_agriculture);
    formData.append("remarques", remarques);
    formData.append("saisonId", selectedSaison);
    formData.append("categorieId", selectedCategorie);

    Object.keys(selectedMaterials).forEach(materialId => {
      formData.append('materials[]', materialId);
    });

    Object.keys(selectedStocks).forEach(stockId => {
      formData.append('MethodesStock[]', stockId);
    });

    Object.keys(selectedMedicaments).forEach(medicamentId => {
      formData.append('MedicamentsCulture[]', medicamentId);
    });

   

    try {
      const result = await axios.post(
        "http://localhost:3001/Agriculture",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(result);
      if (result.data.success) {
        handleClose();
        alert(result.data.message);
        window.location.reload();
        onCreate();
      }
    } catch (error) {
      console.error("Error uploading agriculture:", error);
    }
  };

  const onInputChange = (e) => {
    setImageAgriculture(e.target.files[0]);
  };

  const handleMaterialChange = (e) => {
    const { id, checked } = e.target;
    setSelectedMaterials({ ...selectedMaterials, [id]: checked });
  };

  const handleStockChange = (e) => {
    const { id, checked } = e.target;
    setSelectedStocks({ ...selectedStocks, [id]: checked });
  };

  const handleMedicamentChange = (e) => {
    const { id, checked } = e.target;
    setSelectedMedicaments({ ...selectedMedicaments, [id]: checked });
  };

  const handleMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setMethodeIrrigation(selectedMethod);
   
    setShowQuantity(selectedMethod !== 'irrigation gravitaire');
    setShowFrequency(selectedMethod !== 'irrigation gravitaire');
  };

  return (
    <>
      <Button className='btn-plus' onClick={handleShow}>
        <FcPlus className='icon-plus' />
        <span className='btn-title'>Ajouter</span>
      </Button>
      <Modal show={show} onHide={handleClose} className='modal-lg'>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Agriculture</Modal.Title>
        </Modal.Header>
        <Form onSubmit={submit} id="form" >
        <Modal.Body className='w-100'>
         
          <Form.Group className="mb-3 " controlId="categorie">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" value={selectedCategorie} onChange={handleCategoryChange} >
                <option value="">Sélectionnez une catégorie</option>
                {categories && categories.map(categorie => (
                  <option key={categorie._id} value={categorie._id}>{categorie.nom_categorie}</option>
                ))}
              </Form.Control>
              {errors.categorie && <div className="text-danger">{errors.categorie}</div>}
            </Form.Group>
            <Form.Group className="mb-3 " controlId="nom_agriculture">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Agriculture:">
                <Form.Control
                  type="text"
                  
                  placeholder="Nom Agriculture"
                  value={nom_agriculture}
                  onChange={(e) => setNomAgriculture(e.target.value)}
                />
              </FloatingLabel>
              {errors.nom_agriculture && <div className="text-danger">{errors.nom_agriculture}</div>}
            </Form.Group>

            <Form.Group className="mb-3 w-100" controlId="Description">
              <FloatingLabel controlId="floatingTextarea2" label="Description">
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  value={description}
                  style={{ height: '200px'}}
                  onChange={(e) => setDescription(e.target.value)}
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
                  placeholder="date_plantation"
                  value={date_plantation}
                  onChange={(e) => setDatePlantation(e.target.value)}
                />
              </FloatingLabel>
              {errors.date_plantation && <div className="text-danger">{errors.date_plantation}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="date_recolte">
              <FloatingLabel controlId="floatingTextarea2" label="Date Recolte">
                <Form.Control
                  type='date'
                  placeholder="date_recolte"
                  value={date_recolte}
                  onChange={(e) => setDateRecolte(e.target.value)}
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
                    value={quantite_eau_irrigation}
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
              <Form.Select value={frequence_surveillance} onChange={(e) => setFrequenceSurveillance(e.target.value)}>
                <option value="">Choisir nombre des jours</option>
                <option value="1 Jours">1 Jour</option>
                <option value="2 Jours">2 Jours</option>
                <option value="3 Jours">3 Jours </option>
                <option value="4 Jours">4 Jours</option>
                <option value="5 Jours">5 Jours</option>
                <option value="6 Jours">6 Jours</option>
                <option value="Toutes les jours">Toutes les jours</option>
              </Form.Select>
              {errors.frequence_surveillance && <div className="text-danger">{errors.frequence_surveillance}</div>}
            </Form.Group>

              
              <Form.Group className="mb-3" controlId="date_derniere_surveillance">
              <FloatingLabel controlId="floatingTextarea2" label="Date Derniere d'irrigation">
                <Form.Control
                  type='date'
                  placeholder="Date Derniere d'irrigation"
                  value={date_derniere_surveillance}
                  onChange={(e) => setDateDerniereSurveillance(e.target.value)}
                />
              </FloatingLabel>
              {errors.date_derniere_surveillance && <div className="text-danger">{errors.date_derniere_surveillance}</div>}
            </Form.Group>
            </>
            )}

            

            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel controlId="floatingTextarea2" label="Image Culture:">
                <Form.Control
                  type="file"
                  onChange={onInputChange}
                />
              </FloatingLabel>
              {errors.image_agriculture && <div className="text-danger">{errors.image_agriculture}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="remarques">
              <FloatingLabel controlId="floatingTextarea2" label="Remarques:">
                <Form.Control
                  as="textarea"
                  placeholder="Remarques"
                  value={remarques}
                  style={{ height: '100px' }}
                  onChange={(e) => setRemarques(e.target.value)}
                />
              </FloatingLabel>
              {errors.remarques && <div className="text-danger">{errors.remarques}</div>}
            </Form.Group>

            

           
            <Form.Group className="mb-3" controlId="materials">
              <Form.Label>Equipements</Form.Label>
              {materials && materials.map(material => (
                <Form.Check
                  key={material._id}
                  type="checkbox"
                  id={material._id}
                  label={material.nom}
                  checked={selectedMaterials[material._id]}
                  onChange={handleMaterialChange}
                />
              ))}
               {errors.materials && <div className="text-danger">{errors.materials}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="stocks">
              <Form.Label>Methode du Stockage</Form.Label>
              {stocks && stocks.map(stock => (
                <Form.Check
                  key={stock._id}
                  type="checkbox"
                  id={stock._id}
                  label={stock.title}
                  checked={selectedStocks[stock._id]}
                  onChange={handleStockChange}
                />
              ))}
              {errors.stocks && <div className="text-danger">{errors.stocks}</div>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="engrais">
              <Form.Label>Engrais Agricole</Form.Label>
              {medicaments && medicaments.map(medicament => (
                <Form.Check
                  key={medicament._id}
                  type="checkbox"
                  id={medicament._id}
                  label={medicament.nomMedicament}
                  checked={selectedMedicaments[medicament._id]}
                  onChange={handleMedicamentChange}
                />
              ))}
              {errors.medicaments && <div className="text-danger">{errors.medicaments}</div>}
            </Form.Group>
          
        </Modal.Body>
        <Modal.Footer>
          <Btn className="bg-secondary" onClick={handleClose}>Fermer</Btn>
          <Btn className="btn" type="submit" form="form"> Ajouter </Btn>
        </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Add;
