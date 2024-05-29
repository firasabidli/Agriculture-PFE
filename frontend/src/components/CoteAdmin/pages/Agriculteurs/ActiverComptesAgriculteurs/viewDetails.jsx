import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEye } from "react-icons/fa";

function ViewDetails({ Agriculteur }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <FaEye className='text-primary w-50' onClick={() => setShow(true)} />
      <Modal
        show={show}
        onHide={() => setShow(false)}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        className='modal-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Liste des informations de l'agriculteur {Agriculteur.nom}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className='text-center'>
            <img src={Agriculteur.image} alt="Image profil" className="img-fluid mb-3 text-center w-25" />
            </div>
            
            <p><strong>CIN:</strong> {Agriculteur.cin}</p>
            <p><strong>Nom:</strong> {Agriculteur.nom}</p>
            <p><strong>Adresse:</strong> {Agriculteur.adresse}</p>
            <p><strong>Email:</strong> {Agriculteur.email}</p>
            <p><strong>Date de Naissance:</strong> {new Date(Agriculteur.dateNaissance).toLocaleDateString()}</p>
            <p><strong>Numéro de Téléphone:</strong> {Agriculteur.numeroTelephone}</p>
            <p><strong>Gouvernorat:</strong> {Agriculteur.gouvernorat.nom}</p>
            <p><strong>Coordonnées du Gouvernorat:</strong> Latitude: {Agriculteur.gouvernorat.latitude}, Longitude: {Agriculteur.gouvernorat.longitude}</p>
            <p><strong>Nom d'utilisateur:</strong> {Agriculteur.username}</p>
            <p><strong>Role:</strong> {Agriculteur.role}</p>
            
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary"  className="bg-secondary eviteHover" onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ViewDetails;
