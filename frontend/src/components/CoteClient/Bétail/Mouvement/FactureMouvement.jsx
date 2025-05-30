import React,{useState,useEffect,useRef} from "react";
import Btn from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { FaRegFilePdf } from "react-icons/fa";
import logo from "../../../../assets/images/logo1.png";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
const FactureMouvement =({venteData,animalId,agriculteurId})=>{
  const ButtonpdfRef = useRef(null);
    const [show, setShow] = useState(false);
    const [animalData, setAnimalData] = useState(null);
    const [agriculteurDetails, setAgriculteurDetails] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const totalAmount = venteData.priceVente;
  // Fonction pour récupérer les détails de l'agriculteur en fonction de son ID
  const fetchAgriculteurDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/auth/${agriculteurId}`);
      setAgriculteurDetails(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'agriculteur :', error);
    }
  };

  useEffect(() => {
    if (agriculteurId) {
      fetchAgriculteurDetails();
    }
  }, );
  useEffect(() => {
    const fetchAnimalData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/FicheAnimal/${animalId}`);
        setAnimalData(response.data.animal);
        
      } catch (error) {
        console.error('Erreur lors de la récupération des données de l\'animal:', error);
      }
    };

    if (animalId) {
      fetchAnimalData();
    }
  }, [animalId]);
   // Obtenir la date actuelle
   const currentDate = new Date();

   // Formatte la date au format "Mon DD, YYYY"
   const formatDate = (date) => {
     const options = { day: '2-digit', month: 'short', year: 'numeric' };
     return date.toLocaleDateString('en-US', options);
   };
   // genertePDF (Télécharger facture )
const generatePDF = () => {
  const input = document.getElementById('facture-content');

  // Masquer les boutons
  ButtonpdfRef.current.style.display = 'none';


  html2canvas(input)
      .then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgHeight = canvas.height * pdfWidth / canvas.width;
          
          let heightLeft = imgHeight;
          let position = 0;

          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
          heightLeft -= pdfHeight;

          while (heightLeft >= 0) {
              position = heightLeft - imgHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
              heightLeft -= pdfHeight;
          }

          pdf.save(`facture_${animalData.IdantifiantsAnimal}.pdf`);

          // Réafficher les boutons
          ButtonpdfRef.current.style.display = 'block';
          
      });
};
    return(
        <>
        <button variant="primary" onClick={handleShow} className="btn f-n-hover text-600" style={{backgroundColor:"#7e8d9f",border:"1px solid #7e8d9f"}} >
          Facture
        </button>
        <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Facture Vente Animaux</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-content" id="facture-content"> 
      <div class="card" >
      <div class="card-body">
        <div class="container mb-5 mt-3">
          <div class="row d-flex align-items-baseline">
            <div class="col-xl-9">
              <p style={{color: "#7e8d9f",fontSize: "20px"}}>Facture &gt;&gt; <strong>N°: #123-123</strong></p>
            </div>
          </div>
          <div class="container">
            <div class="col-md-12">
              <div class="text-center">
                <i class="far fa-building fa-4x ms-0" style={{color:"#8f8061" }}></i>
                <p class="pt-2"><img className='logo' src={ logo} alt=""/></p>
              </div>
            </div>
            <div class="row">
            {agriculteurDetails && (
              <div class="col-xl-8">
                <ul class="list-unstyled">
                  <li class="text-muted">Nom Vendeur: <span style={{color:"#8f8061" }}>{agriculteurDetails.nom}</span></li>
                  <li class="text-muted">Adresse:<span style={{color:"#8f8061" }}>{agriculteurDetails.adresse}</span></li>
                  <li class="text-muted">Email: <span style={{color:"#8f8061" }}>{agriculteurDetails.email}</span></li>
                  <li class="text-muted"><i class="fas fa-phone"></i> <span style={{color:"#8f8061" }}>{agriculteurDetails.numeroTelephone}</span></li>
                </ul>
              </div>
            )}
              <div class="col-xl-4">
                <p class="text-muted">Facteur</p>
                <ul class="list-unstyled">
                  <li class="text-muted"><i class="fas fa-circle" style={{color:"#8f8061" }}></i> <span
                      class="fw-bold">Nom Client:</span>{venteData.NomClient}</li>
                      <li class="text-muted"><i class="fas fa-circle" style={{color:"#8f8061" }}></i> <span
                      class="fw-bold">Adresse:</span>{venteData.AdresseClient}</li>
                      <li class="text-muted"><i class="fas fa-circle" style={{color:"#8f8061" }}></i> <span
                      class="fw-bold">Téléphone:</span>{venteData.NumTelClient}</li>
                  <li class="text-muted"><i class="fas fa-circle" style={{color:"#8f8061" }}></i> <span
                      class="fw-bold">Date de Creation: </span>{formatDate(currentDate)}</li>
                  
                </ul>
              </div>
            </div>
            <div class="row my-2 mx-1 justify-content-center">
              {animalData && (
              <div class="col-md-7 mb-4 mb-md-0">
                <p class="fw-bold">Identifiant: {animalData.IdantifiantsAnimal}</p>
                <p class="mb-1">
                  <span class="text-muted me-2">Sous-Categorie:</span><span>{animalData.subCategorieBetail}</span>
                </p>
                <p>
                  <span class="text-muted me-2">Race:</span><span>{animalData.Race}</span>
                </p>
              </div>
              )}
              <div class="col-md-3 mb-4 mb-md-0">
                <h5 class="mb-2">
                  <span class="text-muted me-2 small align-middle">{venteData.priceVente} DT</span>
                </h5>
              </div>
            </div>
            <hr/>
            <div class="row">
              <div class="col-xl-8">
                <p class="ms-3">Ajouter des notes supplémentaires et des informations de paiement</p>
              </div>
              <div class="col-xl-3">
                <ul class="list-unstyled">
                  <li class="text-muted ms-3"><span class="text-black me-4">Sous-total</span>{venteData.priceVente} DT</li>
                  
                </ul>
                <p class="text-black float-start"><span class="text-black me-2">Montant Total</span><span style={{fontSize: "20px"}}>{totalAmount}DT</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
  </Modal.Body>
  <Modal.Footer>
          <Btn ref={ButtonpdfRef} style={{marginTop:"1%",backgroundColor:"white" , color:"black",border: "1px solid gray"}} onClick={generatePDF}>
            <FaRegFilePdf style={{ color: "red",marginRight:"7px" }}  /> Télécharger
          </Btn>
        </Modal.Footer>
      </Modal>
  </>
  )
}
export default FactureMouvement;