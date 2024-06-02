import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import axios from 'axios';

const UpdateStock = ({ stockId, onClose }) => {
  const [formData, setFormData] = useState({
    libellé: '',
    date: '',
    quantitéGénérale:'',
    entrées: [],
    sortie: [],
    emplacement: '',
    ville: '',
    typeStocks: []
  });

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/GestionStocks/stock/${stockId}`);
        const stockData = response.data.stocks;
//console.log("ss",stockData)
        setFormData({
          libellé: stockData.libellé,
          date: formatDate(stockData.date),
          entrées: stockData.entrées,
          sortie: stockData.sortie,
          emplacement: stockData.emplacement,
          ville: stockData.ville,
          typeStocks: stockData.typeStocks
        });
      } catch (error) {
        console.error('Error fetching stock:', error);
      }
    };

    if (stockId) {
      fetchStock();
    }
  }, [stockId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    const calculateQuantiteGenerale = () => {
      let totalEntree = 0;
      let totalSortie = 0;
    
      formData.entrées.forEach((entrée) => {
        totalEntree += parseFloat(entrée.quantitéEntrée);
      });
    
      formData.sortie.forEach((sortie) => {
        totalSortie += parseFloat(sortie.quantitéSortie);
      });
    
      const quantiteGenerale = totalEntree - totalSortie;
      console.log("qq",quantiteGenerale)
      return quantiteGenerale;
    };
  
    const newQuantiteGenerale = calculateQuantiteGenerale();
    setFormData((prevFormData) => ({
      ...prevFormData,
      quantitéGénérale: newQuantiteGenerale,
    }));
  }, [formData.entrées, formData.sortie]);
  
  
  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };
    if (type === 'entrée') {
      updatedData.entrées[index][name] = value;
    } else if (type === 'sortie') {
      updatedData.sortie[index][name] = value;
    }
    setFormData(updatedData);
  };

  const handleAddEntry = () => {
    setFormData({
      ...formData,
      entrées: [...formData.entrées, { dateEntrée: '', quantitéEntrée: '', uniteEntrée: '', raisonEntrée: '', prix: '' }]
    });
  };

  const handleAddExit = () => {
    setFormData({
      ...formData,
      sortie: [...formData.sortie, { dateSortie: '', quantitéSortie: '', uniteSortie: '', raisonSortie: '', prix: '',nomClient: '' ,adresseClient: ''}]
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData) 
           const response = await axios.put(`http://localhost:3001/GestionStocks/${stockId}`, formData);
      console.log('Update successful:', response.data);
      alert('Stock modifié avec succès');
      onClose();
      window.location.reload()
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  return (
    <Modal show={!!stockId} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="libellé" className="mb-3" style={{width:"116%"}}>
            <FloatingLabel controlId="floatingInput" label="Libellé">
              <Form.Control
                type="text"
                name="libellé"
                value={formData.libellé}
                onChange={(e) => setFormData({ ...formData, libellé: e.target.value })}
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group controlId="date" className="mb-3" style={{width:"116%"}}>
            <FloatingLabel controlId="floatingInput" label="Date">
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </FloatingLabel>
          </Form.Group>
          <Button onClick={handleAddEntry} className="mb-3 gd-primary eviteHover" style={{width:"116%"}}>Ajouter Entrée</Button>
          {Array.isArray(formData.entrées) && formData.entrées.map((entrée, index) => (
            <div key={index}>
             <Form.Group controlId={`dateEntrée${index}`} className="mb-3">
                <FloatingLabel controlId={`floatingInput${index}`} label="Date d'entrée">
                  <Form.Control
                    type="date"
                    name={`dateEntrée`}
                    //value={entrée.dateEntrée}
                    defaultValue={formatDate(entrée.dateEntrée)}
                    onChange={(e) => handleInputChange(e, index, 'entrée')}
                  />
                </FloatingLabel>
              </Form.Group>
              <div style={{display:"flex" }}>
              <Form.Group controlId={`quantitéEntrée${index}`} className="mb-3" style={{ width: "104%" }}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Quantité d'entrée">
                  <Form.Control
                    type="number"
                    name={`quantitéEntrée`}
                    value={entrée.quantitéEntrée}
                    onChange={(e) => handleInputChange(e, index, 'entrée')}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId={`uniteEntrée${index}`} className="mb-3" style={{ width: "104%" }}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Unité d'entrée">
                  <Form.Select
                    name={`uniteEntrée`}
                    value={entrée.uniteEntrée}
                    onChange={(e) => handleInputChange(e, index, 'entrée')}
                  >
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              </div>
              <Form.Group controlId={`raisonEntrée${index}`} className="mb-3" style={{width:"116%"}}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Raison d'entrée">
                  <Form.Select
                    name={`raisonEntrée`}
                    value={entrée.raisonEntrée}
                    onChange={(e) => handleInputChange(e, index, 'entrée')}
                  >
                    <option value="Achat">Achat</option>
                    <option value="Production">Production</option>
                    <option value="Don">Don</option>
                    <option value="Autre">Autre</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId={`prix${index}`} className="mb-3" style={{width:"116%"}}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Prix">
                  <Form.Control
                    type="number"
                    name={`prix`}
                    value={entrée.prix}
                    onChange={(e) => handleInputChange(e, index, 'entrée')}
                  />
                </FloatingLabel>
              </Form.Group>
            </div>
          ))}
          <Button onClick={handleAddExit} className="mb-3 gd-primary eviteHover" style={{width:"116%"}}>Ajouter Sortie</Button>
          {Array.isArray(formData.sortie) && formData.sortie.map((sortie, index) => (
            <div key={index}>
              <Form.Group controlId={`dateSortie`} className="mb-3" style={{width:"116%"}}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Date de sortie">
                  <Form.Control
                    type="date"
                    name={`dateSortie`}
                    defaultValue={formatDate(sortie.dateSortie)}
                    //value={sortie.dateSortie}
                    onChange={(e) => handleInputChange(e, index, 'sortie')}
                  />
                </FloatingLabel>
              </Form.Group>
              <div style={{display:"flex" }}>
              <Form.Group controlId={`quantitéSortie${index}`} className="mb-3" style={{ width: "104%" }}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Quantité de sortie">
                  <Form.Control
                    type="number"
                    name={`quantitéSortie`}
                    value={sortie.quantitéSortie}
                    onChange={(e) => handleInputChange(e, index, 'sortie')}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId={`uniteSortie=`} className="mb-3" style={{ width: "104%" }}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Unité de sortie">
                  <Form.Select
                    name={`uniteSortie`}
                    value={sortie.uniteSortie}
                    onChange={(e) => handleInputChange(e, index, 'sortie')}
                  >
                    <option value=""></option>
                    <option value="kg">kg</option>
                    <option value="g">g</option>
                    <option value="L">L</option>
                    <option value="ml">ml</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              </div>
              <Form.Group controlId={`raisonSortie`} className="mb-3" style={{width:"116%"}}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Raison de sortie">
                  <Form.Select
                    name={`raisonSortie`}
                    value={sortie.raisonSortie}
                    onChange={(e) => handleInputChange(e, index, 'sortie')}
                  >
                    <option value=""></option>
                    <option value="Vente">Vente</option>
                    <option value="Production">Production</option>
                    <option value="Don">Don</option>
                    <option value="Autre">Autre</option>
                  </Form.Select>
                </FloatingLabel>
              </Form.Group>
              <Form.Group controlId={`prixSortie`} className="mb-3" style={{width:"116%"}}>
                <FloatingLabel controlId={`floatingInput${index}`} label="Prix">
                  <Form.Control
                    type="number"
                    name={`prix`}
                    value={sortie.prix}
                    onChange={(e) => handleInputChange(e, index, 'sortie')}
                  />
                </FloatingLabel>
              </Form.Group>
              {sortie && sortie.raisonSortie === "Vente" && (
            <div>
                <Form.Group controlId={`nomClient${index}`} className="mb-3" style={{ width: "116%" }}>
                    <FloatingLabel controlId={`floatingInput${index}`} label="nom du Client">
                        <Form.Control
                            type="text"
                            name={`nomClient`}
                            value={sortie.nomClient}
                            onChange={(e) => handleInputChange(e, index, 'sortie')}
                        />
                    </FloatingLabel>
                </Form.Group>
                <Form.Group controlId={`adresseClient${index}`} className="mb-3" style={{ width: "116%" }}>
                    <FloatingLabel controlId={`floatingInput${index}`} label="Adresse du Client">
                        <Form.Control
                            type="text"
                            name={`adresseClient`}
                            value={sortie.adresseClient}
                            onChange={(e) => handleInputChange(e, index, 'sortie')}
                        />
                    </FloatingLabel>
                </Form.Group>
            </div>
        )}
            </div>
          ))}
          <Button variant="primary" type="submit">
            Modifier
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateStock;
