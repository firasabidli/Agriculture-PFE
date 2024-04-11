import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FaCheckCircle } from "react-icons/fa";
function Accepter({ userId, onActivate  }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmActivate = async () => {
    try {
      await axios.put(`http://localhost:3001/ActiverCompte/Activer/${userId}`);
      onActivate();
      handleClose(); 
    } catch (error) {
      console.error("Erreur lors de l'activation de l'agriculteur", error);
      
    }
  };

  return (
    <>
      
      <FaCheckCircle type='button' className='icon-trash text-success w-50' onClick={handleShow} />

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de l'activation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir activer cette agriculteur  ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="success" onClick={confirmActivate}>
            Accepter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Accepter;