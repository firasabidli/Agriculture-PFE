import React, { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; // Importez Axios pour effectuer des appels HTTP

const Update = ({ onUpdate, SanteId }) => {
    const [show, setShow] = useState(false);
    const [etatSante, setEtatSante] = useState('');
    const [maladiesSymptomes, setMaladiesSymptomes] = useState('');
    const [observationsGenerales, setObservationsGenerales] = useState('');
    const [traitements, setTraitements] = useState([]);
    const [vaccinations, setVaccinations] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchSante = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/SanteBetail/sante/${SanteId}`);
                const santeData = response.data.sante;

                setEtatSante(santeData.etatSante);
                setMaladiesSymptomes(santeData.maladiesSymptomes);
                setObservationsGenerales(santeData.observationsGenerales);
                setTraitements(santeData.traitements);
                setVaccinations(santeData.vaccinations);
            } catch (error) {
                console.error('Error fetching animal:', error);
            }
        };

        if (SanteId) {
            fetchSante();
        }
    }, [SanteId]);

    const handleAddTraitement = () => {
        setTraitements([...traitements, { medicament: "", dose: "", frequence: "" }]);
    };

    const handleTraitementChange = (index, fieldName, value) => {
        const updatedTraitements = [...traitements];
        updatedTraitements[index][fieldName] = value;
        setTraitements(updatedTraitements);
    };

    const handleAddVaccination = () => {
        setVaccinations([...vaccinations, { nomVaccin: "", dateAdministration: "" }]);
    };

    const handleVaccinationChange = (index, fieldName, value) => {
        const updatedVaccinations = [...vaccinations];
        updatedVaccinations[index][fieldName] = value;
        setVaccinations(updatedVaccinations);
    };

    const handleSubmit = () => {
        const formData = {
            etatSante,
            maladiesSymptomes,
            observationsGenerales,
            traitements,
            vaccinations
        };
        const response = axios.put(`http://localhost:3001/SanteBetail/${SanteId}`, formData);
        console.log('Update successful:', response.data);
        onUpdate(SanteId, formData);
        handleClose();
    };
    return (
        <>
            <button className="f-n-hover btn btn-success btn-raised px-4 py-2 w-75 text-600" style={{ marginRight: "30%", color: "white" }} onClick={handleShow}>
                Modifier
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier les informations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">État de santé :</label>
                        <div>
                            <input
                                type="radio"
                                id="bon"
                                name="etatSante"
                                value="bon"
                                checked={etatSante === "bon"}
                                onChange={() => setEtatSante("bon")}
                            />
                            <label htmlFor="bon">Bon</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="moyen"
                                name="etatSante"
                                value="moyen"
                                checked={etatSante === "moyen"}
                                onChange={() => setEtatSante("moyen")}
                            />
                            <label htmlFor="moyen">Moyen</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="mauvais"
                                name="etatSante"
                                value="mauvais"
                                checked={etatSante === "mauvais"}
                                onChange={() => setEtatSante("mauvais")}
                            />
                            <label htmlFor="mauvais">Mauvais</label>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="maladiesSymptomes" className="form-label">Maladies ou symptômes :</label>
                        <textarea
                            className="form-control"
                            id="maladiesSymptomes"
                            rows="3"
                            value={maladiesSymptomes}
                            onChange={(e) => setMaladiesSymptomes(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="observationsGenerales" className="form-label">Observations générales :</label>
                        <textarea
                            className="form-control"
                            id="observationsGenerales"
                            rows="3"
                            value={observationsGenerales}
                            onChange={(e) => setObservationsGenerales(e.target.value)}
                        ></textarea>
                    </div>

                    {/* Section Traitements */}
                    <div className="mb-3">
                        <h5>Traitements</h5>
                        {traitements.map((traitement, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Médicament"
                                    value={traitement.medicament}
                                    onChange={(e) => handleTraitementChange(index, "medicament", e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Dose"
                                    value={traitement.dose}
                                    onChange={(e) => handleTraitementChange(index, "dose", e.target.value)}
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Fréquence"
                                    value={traitement.frequence}
                                    onChange={(e) => handleTraitementChange(index, "frequence", e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={handleAddTraitement}>
                            Ajouter Traitement
                        </button>
                    </div>

                    {/* Section Vaccinations */}
                    <div className="mb-3">
                        <h5>Vaccinations</h5>
                        {vaccinations.map((vaccination, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Nom du vaccin"
                                    value={vaccination.nomVaccin}
                                    onChange={(e) => handleVaccinationChange(index, "nomVaccin", e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="form-control mb-2"
                                    placeholder="Date d'administration"
                                    value={vaccination.dateAdministration}
                                    onChange={(e) => handleVaccinationChange(index, "dateAdministration", e.target.value)}
                                />
                            </div>
                        ))}
                        <button type="button" className="btn btn-secondary" onClick={handleAddVaccination}>
                            Ajouter Vaccination
                        </button>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button  className="bg-secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button className="btn" type="submit" onClick={handleSubmit}>
                        Enregistrer
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Update;
