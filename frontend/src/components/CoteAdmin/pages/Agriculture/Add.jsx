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

  useEffect(() => {
    fetchSaisons();
    fetchCategories();
    fetchMaterials();
    fetchStocks();
    fetchMedicaments();
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
      console.error("Error fetching medicaments:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => setShow(true);

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

    const formData = new FormData();
    formData.append("nom_agriculture", nom_agriculture);
    formData.append("description", description);
    formData.append("date_plantation", date_plantation);
    formData.append("date_recolte", date_recolte);
    formData.append("methode_irrigation", methode_irrigation);
    formData.append("quantite_eau_irrigation", quantite_eau_irrigation);
    formData.append("frequence_surveillance", frequence_surveillance);
    formData.append("date_derniere_surveillance", date_derniere_surveillance);
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
    const isValidnom = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(nom_agriculture);
    const isValiddescription= /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/.test(description);

  if (!isValidnom || !isValiddescription) {
    alert('Le champ text ne doit contenir que des lettres, des chiffres et des espaces.');
    return;
  }
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
        window.location.reload()
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

  return (
    <>
      <Button className='btn-plus' onClick={handleShow}>
        <FcPlus className='icon-plus' />
        <span className='btn-title'>Ajouter</span>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un Agriculture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit} id="form">
          <Form.Group className="mb-3" controlId="nom_agriculture">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Agriculture:">
                <Form.Control
                  type="text"
                  placeholder="Nom Agriculture"
                  value={nom_agriculture}
                  onChange={(e) => setNomAgriculture(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="Description">
                <FloatingLabel controlId="floatingTextarea2" label="Description">
                  <Form.Control
                    as="textarea"
                    placeholder="Description"
                    value={description}
                    style={{ height: '100px' }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FloatingLabel>
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
            </Form.Group>
            <Form.Group className="mb-3" controlId="methode_irrigation">
              <FloatingLabel controlId="floatingTextarea2" label="Methode Irrigation">
                <Form.Control
                  type='text'
                  placeholder="methode_irrigation"
                  value={methode_irrigation}
                  onChange={(e) => setMethodeIrrigation(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="quantite_eau_irrigation">
              <FloatingLabel controlId="floatingTextarea2" label="Quantité Eau Irrigation">
                <Form.Control
                  type='Number'
                  placeholder="quantite_eau_irrigation"
                  value={quantite_eau_irrigation}
                  onChange={(e) => setQuantiteEauIrrigation(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="frequence_surveillance">
              <FloatingLabel controlId="floatingTextarea2" label="Fréquence Surveillance:">
                <Form.Control
                  type="text"
                  placeholder=" Fréquence Surveillance"
                  value={frequence_surveillance}
                  onChange={(e) => setFrequenceSurveillance(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date_derniere_surveillance">
              <FloatingLabel controlId="floatingTextarea2" label="Date Derniere Surveillance">
                <Form.Control
                  type='date'
                  placeholder="Date Derniere Surveillance"
                  value={date_derniere_surveillance}
                  onChange={(e) => setDateDerniereSurveillance(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel controlId="floatingTextarea2" label="Image Culture:">
                <Form.Control
                  type="file"
                  onChange={onInputChange}
                />
              </FloatingLabel>
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
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Btn className="bg-secondary" onClick={handleClose}>Fermer</Btn>
          <Btn className="btn" type="submit" form="form"> Ajouter </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;