import { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function MotDePasseOublie() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setEmail('');
    setMessage('');
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/Agriculteur/mot-de-passe-oublie', { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response ? error.response.data.error : 'Erreur lors de l\'envoi de l\'e-mail');
    }
  };

  return (
    <>
      <b onClick={handleShow} style={{ cursor: 'pointer' }}>
        Mot de passe Oublié
      </b>

      <Modal show={show} onHide={handleClose} className='modal-md'>
        <Modal.Header closeButton>
          <Modal.Title>Mot de passe Oublié</Modal.Title>
        </Modal.Header>
        <Form  id='FormRécuption'>
          <Modal.Body>
            {message && <p>{message}</p>}
            <p>Veuillez saisir votre adresse e-mail. Nous vous enverrons un nouveau mot de passe.</p>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Adresse Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className="bg-secondary eviteHover" onClick={handleClose}>
              Fermer
            </Button>
            <Button variant="success"  form='FormRécuption'onClick={handleSubmit}>
              Envoyer
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default MotDePasseOublie;
