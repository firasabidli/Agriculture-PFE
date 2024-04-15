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
  const [nom_betail, setNomBetail] = useState("");
  const [date_naissance, setDateNaissance] = useState("");
  const [IdantifiantsAnimal, setIdantifiantsAnimal] = useState("");
  const [sexe, setSexe] = useState("");
  const [image_betail, setImageBetail] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState('');

  useEffect(() => {

    fetchCategories();
  }, []);

 

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/CategorieBetail");
      
      setCategories(response.data);
     
     
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

 


 

  const handleClose = () => {
    setShow(false);
    resetForm();
  };

  const handleShow = () => setShow(true);

  const resetForm = () => {
    setNomBetail('');
    setDateNaissance('');
    setIdantifiantsAnimal('');
    setSexe('');
    setImageBetail(null);
    
    setSelectedCategorie('');
    
  };

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("categorie_betail", selectedCategorie);
    formData.append("nom_betail", nom_betail);
    formData.append("date_naissance", date_naissance);
    formData.append("IdantifiantsAnimal", IdantifiantsAnimal);
    formData.append("sexe", sexe);
    formData.append("image_betail", image_betail);
    try {
      const result = await axios.post(
        "http://localhost:3001/Betail",
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
      console.error("Error uploading betail:", error);
    }
  };

  const onInputChange = (e) => {
    setImageBetail(e.target.files[0]);
  };

 

 

  

  return (
    <>
      <Button className='btn-plus' onClick={handleShow}>
        <FcPlus className='icon-plus' />
        <span className='btn-title'>Ajouter</span>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une betail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submit} id="form">

          <Form.Group className="mb-3" controlId="categorie">
              <Form.Label>Catégorie</Form.Label>
              <Form.Control as="select" value={selectedCategorie} onChange={(e) => setSelectedCategorie(e.target.value)}>
                <option value="">Sélectionnez la catégorie</option>
                {categories && categories.map(categorie => (
                  <option key={categorie._id} value={categorie._id}>{categorie.nom_categorieBetail}</option>
                ))}
              </Form.Control>
            </Form.Group>


          <Form.Group className="mb-3" controlId="nom_betail">
              <FloatingLabel controlId="floatingTextarea2" label="Nom Betail:">
                <Form.Control
                  type="text"
                  placeholder="Nom Betail"
                  value={nom_betail}
                  onChange={(e) => setNomBetail(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

           

            <Form.Group className="mb-3" controlId="date_naissance">
              <FloatingLabel controlId="floatingTextarea2" label="Date De Naissance">
                <Form.Control
                  type='date'
                  placeholder="Date De Naissance"
                  value={date_naissance}
                  onChange={(e) => setDateNaissance(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

            
            <Form.Group className="mb-3" controlId="IdantifiantsAnimal">
              <FloatingLabel controlId="floatingTextarea2" label="Idantifiant Animale">
                <Form.Control
                  type='text'
                  placeholder="Idantifiant Animale"
                  value={IdantifiantsAnimal}
                  onChange={(e) => setIdantifiantsAnimal(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            

            

            

            <Form.Group className="mb-3" controlId="title">
              <FloatingLabel controlId="floatingTextarea2" label="Image Betail:">
                <Form.Control
                  type="file"
                  onChange={onInputChange}
                />
              </FloatingLabel>
            </Form.Group>

          
           

            <Form.Group className="mb-3" controlId="saison">
              <Form.Label>sex</Form.Label>
              <Form.Control as="select" value={sexe} onChange={(e) => setSexe(e.target.value)}>
                <option value="">Sélectionnez la genre du betail</option>
                <option value="masculin">masculin</option>
                <option value="féminin">féminin</option>
              </Form.Control>
            </Form.Group>

            
            

            

            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Btn className="bg-secondary" onClick={handleClose}>Close</Btn>
          <Btn className="btn" type="submit" form="form"> Submit </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Add;