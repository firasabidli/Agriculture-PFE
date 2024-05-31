import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FaPen } from "react-icons/fa6";
import axios from 'axios'; // Importez axios pour effectuer une requête HTTP

function Edit({ idProduction, idJour, quantite, prix, onUpdate }) {
  const [show, setShow] = useState(false);
  const [newQuantite, setNewQuantite] = useState(quantite); // État pour la nouvelle quantité
  const [newPrix, setNewPrix] = useState(prix); // État pour le nouveau prix

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveChanges = async () => {
    try {
      // Envoyez la requête de mise à jour au serveur
     const response= await axios.put(`http://localhost:3001/ProductionBetail/${idProduction}/${idJour}`, {
        quantite: newQuantite,
        prix: newPrix
      });
      alert(response.data.message);
      if (response.data.success) {
        onUpdate();
        handleClose();
      }
    } catch (error) {
      console.error('Erreur lors de la modification de  production:', error);
      // Gérez les erreurs
    }
  };
  
  return (
    <>
      <FaPen onClick={handleShow} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier production laitière</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="quantite">
              <Form.Label>Quantité</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantité"
                value={newQuantite}
                onChange={(e) => setNewQuantite(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="prix">
              <Form.Label>Prix</Form.Label>
              <Form.Control
                type="number"
                placeholder="Prix"
                value={newPrix}
                onChange={(e) => setNewPrix(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Edit;
