import React, { useState, useEffect } from 'react';
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import axios from 'axios';
import { FaRegEdit } from 'react-icons/fa';
import { TbClockEdit } from "react-icons/tb";
function EditAliment({ aliment, onUpdate }) {
  const [show, setShow] = useState(false);
  const [dateAchat, setDateAchat] = useState(aliment.dateAchat);
  const [quantite, setQuantite] = useState(aliment.quantite);
  const [prix, setPrix] = useState(aliment.prix);
  const [unite,setUnite] = useState(aliment.unite);
  const [aliments, setAliments] = useState(aliment.aliments);
  const [updateDateAchat, setUpdateDateAchat] = useState(false);

  const handleClose = () => {
    setShow(false);
   
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/AlimentsAnimal/${aliment._id}`, {
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
        onUpdate(); // Appeler la fonction onUpdate fournie par le parent
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie', error);
    }
  };

  const editDateAchat = () =>{
    setUpdateDateAchat(!updateDateAchat)
  }

  

  return (
    <>
      <FaRegEdit type="button" className="icon-edit" onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier un aliment d'animaux</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} id="form">
          <div className='mb-3'>
          <Form.Label> Date d'achat:</Form.Label>
         <div ><span className=' m-1 p-2 border border-primary'>{new Date(dateAchat).toLocaleDateString()}</span>  <TbClockEdit className='fs-4 text-primary dateAchat' onClick={editDateAchat}/> </div> 
          </div>
          {updateDateAchat && (
            <Form.Group className="mb-3" controlId="dateAchat">
            <FloatingLabel controlId="floatingTextarea2" label="Date d'achat">
            <Form.Control
                type="Date"
                placeholder="Date d'achat"
                defaultValue={new Date(dateAchat).toLocaleDateString()}
                onChange={(e) => setDateAchat(e.target.value)}
            />
            </FloatingLabel>
            </Form.Group>
          )}
          
            <Form.Group className="mb-3" controlId="aliments">
              <Form.Label>Aliments</Form.Label>
              <Form.Control as="select" defaultValue={aliments} onChange={(e) =>{setAliments(e.target.value) ; if(e.target.value=='Balles de foins'){setUnite('Balles')} } }>
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
              <Form.Control as="select" defaultValue={unite} onChange={(e) => setUnite(e.target.value)}>
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
                  defaultValue={quantite}
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
                  defaultValue={quantite}
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
                  defaultValue={prix}
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
          <Btn variant="secondary" onClick={handleClose}>
            Annuler
          </Btn>
          <Btn variant="primary" type="submit" form="form">
            Enregistrer
          </Btn>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditAliment;