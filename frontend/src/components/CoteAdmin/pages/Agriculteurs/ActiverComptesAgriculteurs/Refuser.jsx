import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FcFullTrash } from "react-icons/fc";
import { TiDelete } from "react-icons/ti";
function Refuser({ userId, onrefuse  }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmDelete = async () => {
    try {
        await axios.delete(`http://localhost:3001/ActiverCompte/Refuser/${userId}`);
        onrefuse();
      handleClose(); 
    } catch (error) {
      console.error('Erreur lors de la suppression du Materiel', error);
      
    }
  };

  return (
    <>
      
      <TiDelete type='button' className='icon-trash text-danger w-100' onClick={handleShow} />

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation du refus</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir Refuser cette Agriculteur  ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  className="bg-secondary eviteHover" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="success" onClick={confirmDelete}>
            Refuser
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Refuser;