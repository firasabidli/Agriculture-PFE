import React, { useState } from 'react';
import Btn from 'react-bootstrap/Button';
import { Button } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FcPlus } from "react-icons/fc";
function AddAliments({ onCreate }) {
  const [show, setShow] = useState(false);
  const [dateAchat, setDateAchat] = useState('');
  const [quantite, setQuantite] = useState(0);
  const [prix, setPrix] = useState(0);
  const [total, setTotal] = useState(0);
  const [unite,setUnite] = useState('');
  const [aliments, setAliments] = useState('');
  const user = localStorage.getItem("user");
  const idAgriculteur = user ? JSON.parse(user)._id : null;

  const handleClose = () => {
    setShow(false);
    setDateAchat('');
    setAliments('');
    setQuantite(0);
    setPrix(0);
    setTotal(0);
    
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    
      const response = await axios.post('http://localhost:3001/AlimentsAnimal', {
        idAgriculteur,  
        aliments,
        dateAchat,
        quantite,
        unite,
        prix,
        total : quantite * prix
      });
      if (response.data.success) {
        
        handleClose(); 
        alert(response.data.message);
        
        onCreate(); 
      }
    } catch (error) {
      console.error('Erreur lors de la création du Categorie', error);
    }
  };

  

  return (
    <>
      <Button className='btn-plus'onClick={handleShow}>
		<FcPlus className='icon-plus'/>
		<span className='btn-title'>Ajouter</span>
	    </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter un aliment d'animaux </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="form">
            <Form.Group className="mb-3" controlId="dateAchat">
              <FloatingLabel controlId="floatingTextarea2" label="Date d'achat">
                <Form.Control
                  type="Date"
                  placeholder="Date d'achat"
                  value={dateAchat}
                  onChange={(e) => setDateAchat(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group className="mb-3" controlId="aliments">
              <Form.Label>Aliments</Form.Label>
              <Form.Control as="select" value={aliments} onChange={(e) =>{setAliments(e.target.value) ; if(e.target.value=='Balles de foins'){setUnite('Balles')} } }>
                <option value="">Sélectionnez un aliment</option>
                <option value="Balles de foins">Balles de foins</option>
                <option value="Fourrage">Fourrage</option>
                <option value="Grain">Grain</option>
              </Form.Control>
            </Form.Group>
{
   ( ((aliments=="Fourrage") || (aliments=="Grain") ) || (aliments=="") )  && (
            <Form.Group className="mb-3" controlId="aliments">
              <Form.Label> {aliments==""? " Il faut choisir un aliment " : aliments=="Balles de foins"? " Quantite de balles" :"Quantite Par Nombre de Sac ou par KG"}</Form.Label>
              <Form.Control as="select" value={unite} onChange={(e) => setUnite(e.target.value)}>
                <option value="0">Choisir</option>
                
                        <option value="Sac" disabled={aliments=="Balles de foins"|| aliments=="" }>Sac</option>
                         <option value="Kg"disabled={aliments=="Balles de foins"|| aliments==""}>Kg</option>
                
              </Form.Control>
            </Form.Group>
    )
}
            
{
    unite=="Sac" && (

<Form.Group className="mb-3" controlId="quantite">
              <FloatingLabel controlId="floatingTextarea2" label="Nombre de sac">
                <Form.Control
                  type="Number"
                  placeholder="Nombre de sac"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
    )
}
            
{
    (unite=="Kg" || aliments=="Balles de foins") && (
            <Form.Group className="mb-3" controlId="quantite">
              <FloatingLabel controlId="floatingTextarea2" label="Quantite">
                <Form.Control
                  type="Number"
                  placeholder="Quantite"
                  value={quantite}
                  onChange={(e) => setQuantite(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>

)
}
            <Form.Group className="mb-3" controlId="prix">
              <FloatingLabel controlId="floatingTextarea2" label="Prix">
                <Form.Control
                  type="Number"
                  placeholder="Prix"
                  value={prix}
                  onChange={(e) => setPrix(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
            <div>
                Total:{quantite*prix}
            </div>
            
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

export default AddAliments;