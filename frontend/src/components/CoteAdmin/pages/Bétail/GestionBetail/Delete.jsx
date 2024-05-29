import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { FcFullTrash } from "react-icons/fc";

function Delete({ betailId, onDelete  }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/Betail/${betailId}`);
      onDelete(); 
      handleClose(); 
    } catch (error) {
      console.error("Erreur lors de la suppression du betail", error);
      
    }
  };

  return (
    <>
      
      <FcFullTrash type='button' className='icon-trash' onClick={handleShow} />

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>Êtes-vous sûr de vouloir supprimer cette betail  ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  className="bg-secondary eviteHover" onClick={handleClose}>
            Annuler
          </Button>
          <Button variant="success" onClick={confirmDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Delete;