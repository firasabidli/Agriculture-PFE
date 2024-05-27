import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './RapportSante.css';
import Navbar from '../../Navbar';
import { ImPrinter } from 'react-icons/im';
import { LiaFileDownloadSolid } from 'react-icons/lia';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const RapportSante = () => {
  const { id } = useParams();
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    const fetchSanteByAgriculteur = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/SanteBetail/${id}`);
        setHealthData(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données de santé de l\'agriculteur:', error);
      }
    };

    fetchSanteByAgriculteur();
  }, [id]);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return dateObject.toISOString().split('T')[0];
  };

  const exportPDF = () => {
    const input = document.getElementById('rapportSante');
    const buttons = document.querySelectorAll('.no-print');

    // Masquer les boutons
    buttons.forEach(button => {
      button.classList.add('hidden');
    });

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

        pdf.save(`rapport_sante_${id}.pdf`);

        // Réafficher les boutons
        buttons.forEach(button => {
          button.classList.remove('hidden');
        });
      });
  };

  const handlePrint = () => {
    const buttons = document.querySelectorAll('.no-print');

    // Masquer les boutons
    buttons.forEach(button => {
      button.classList.add('hidden');
    });

    window.print();

    // Réafficher les boutons
    buttons.forEach(button => {
      button.classList.remove('hidden');
    });
  };

  if (healthData.length === 0) {
    return (
      <>
        <Navbar textColor="black" />
        <div className="rapport-sante-container">
          <h2>Rapport de Santé du Bétail</h2>
          <p>Aucune donnée de santé disponible pour cet animal.</p>
        </div>
      </>
    );
  }

  const animal = healthData[0].AnimalId;

  return (
    <>
      <Navbar textColor="black" />
      <div className="rapport-sante-container" id="rapportSante">
        <h2>Rapport de Santé du Bétail</h2>
        <div className="d-flex" style={{ float: 'right', marginBottom: '20px' }}>
          <ImPrinter id="printButton" onClick={handlePrint} className="no-print" style={{ marginLeft: '10px', fontSize: '30px', color: 'blue' }} />
          <LiaFileDownloadSolid id="exportButton" onClick={exportPDF} className="no-print" style={{ marginLeft: '10px', fontSize: '30px', color: 'red' }} />
        </div>
        <div className="rapport-sante-card animal-info">
          <p><strong>Référence animal:</strong> {animal.IdantifiantsAnimal}</p>
          <p><strong>Catégorie Bétail:</strong> {animal.categorieBetail}</p>
          <p><strong>Race:</strong> {animal.Race}</p>
          <p><strong>Sub Catégorie:</strong> {animal.subCategorieBetail}</p>
          <p><strong>Date de Naissance:</strong> {formatDate(animal.date_naissance)}</p>
          <p><strong>Sexe:</strong> {animal.sexe}</p>
        </div>
        {healthData.map((item) => (
          <div key={item._id} className="rapport-sante-card health-info">
            <h3>État de Santé: {item.etatSante}</h3>
            <p><strong>Date d'Enregistrement:</strong> {formatDate(item.dateEnregistrement)}</p>
            <p><strong>Maladies et Symptômes:</strong> {item.maladiesSymptomes}</p>
            <p><strong>Observations Générales:</strong> {item.observationsGenerales}</p>
            {item.traitements.length > 0 && (
              <div className="traitements-section">
                <h4>Traitements:</h4>
                <ul>
                  {item.traitements.map((traitement, index) => (
                    <li key={index}>
                      <strong>Médicament:</strong> {traitement.medicament}, <strong>Prix:</strong> {traitement.prixMedicament}, <strong>Dose:</strong> {traitement.dose}, <strong>Fréquence:</strong> {traitement.frequence}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {item.vaccinations.length > 0 && (
              <div className="vaccinations-section mt-5">
                <h4>Vaccinations:</h4>
                <ul>
                  {item.vaccinations.map((vaccination, index) => (
                    <li key={index}>
                      <strong>Nom:</strong> {vaccination.nomVaccin}, <strong>Prix:</strong> {vaccination.prixVaccin}, <strong>Date:</strong> {formatDate(vaccination.dateAdministration)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      <style>
        {`
          @media print {
            body {
              margin: 10px 10px 10px;
            }
            .hidden {
              display: none !important;
            }
          }
          .hidden {
            display: none !important;
          }
        `}
      </style>
    </>
  );
};

export default RapportSante;
