import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './Medicament.css';

function MyModelMedicament(props) {
    const { editMode } = props;
    const [nomMedicament, setNomMedicament] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [newImage, setNewImage] = useState(null);
    useEffect(() => {
        if (props.formData) {
            setNomMedicament(props.formData.nomMedicament || '');
            setDescription(props.formData.description || '');
            setImage(props.formData.image || '');
        }
    }, [props.formData]);

    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nomMedicament', nomMedicament);
            formData.append('description', description);
            formData.append('image', newImage || image);
            if (props.formData) {
                // Modifier
                console.log(formData)
                // await axios.put(`http://localhost:3001/MedicamentCulture/UpdateMedicament/${props.formData._id}`, { nomMedicament, description, image });
                     await axios.put(`http://localhost:3001/MedicamentCulture/UpdateMedicament/${props.formData._id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                  });
            } else {
                // Ajouter
                await axios.post('http://localhost:3001/MedicamentCulture/AjouterMedicament', formData);
                alert('Médicament ajouté avec succès');
            }

            setNomMedicament('');
            setDescription('');
            setImage(null);
            setNewImage(null);
            props.onHide();
            props.fetchData();
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            console.log(error.response.data.error);
        }
    };

    return (
        <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                {props.editMode ? 'Modifier données' : 'Ajouter données'}
            </Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <form className="form-container">
                    <div>
                        <label htmlFor="nomMedicament">Nom du médicament :</label>
                        <input type="text" id="nomMedicament" value={nomMedicament} onChange={(e) => setNomMedicament(e.target.value)} className="form-input" required />
                    </div>
                    <div>
                        <label htmlFor="description">Description :</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="form-textarea" required />
                    </div>
                    <div>
                        <label htmlFor="image">Image :</label>
                        {image && <img src={image} alt="" className="current-image" />} 
                        <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} className="submit-button" style={{backgroundColor:'#b4afaf'}}>Fermer</Button>
                <Button type="submit" className="form-button" style={{fontSize:'14px'}} onClick={handleSubmit}>{editMode ? 'Modifier' : 'Ajouter'}</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModelMedicament;
