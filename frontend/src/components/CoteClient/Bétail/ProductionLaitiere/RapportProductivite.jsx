import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../Navbar';
import { Line } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ImPrinter } from "react-icons/im";
import { LiaFileDownloadSolid } from "react-icons/lia";

const RapportProductivite = () => {
  const { idAgriculteur, id, year, month } = useParams();
  const [productionData, setProductionData] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [totalProduction, setTotalProduction] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const printButtonRef = useRef(null);
  const exportButtonRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productionResponse = await axios.get(`http://localhost:3001/ProductionBetail/Rapport/${idAgriculteur}/${id}/${month}/${year}`);
        const statsResponse = await axios.get(`http://localhost:3001/ProductionBetail/stat/Rapport/${idAgriculteur}/${id}/${year}/${month}`);

        setProductionData(productionResponse.data.data);
        setTotalProduction(productionResponse.data.productionTotal);
        setTotalRevenue(productionResponse.data.revenueTotal); // Assuming API returns this
        setWeeklyStats(statsResponse.data.weeks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idAgriculteur, id, year, month]);

  const aggregateWeeklyData = () => {
    const weeklyChartData = {
      labels: [],
      datasets: [{
        label: 'Quantité de lait (litres)',
        data: [],
        borderColor: 'blue',
        fill: false,
      }, {
        label: 'Revenus (DT)',
        data: [],
        borderColor: 'green',
        fill: false,
      }]
    };

    weeklyStats.forEach((week, index) => {
      const totalQuantity = week.totalQuantity;
      const totalRevenue = week.totalRevenue;
      weeklyChartData.datasets[0].data.push(totalQuantity);
      weeklyChartData.datasets[1].data.push(totalRevenue);
      weeklyChartData.labels.push(`Semaine ${index + 1}`);
    });

    return weeklyChartData;
  };

  const weeklyChartData = aggregateWeeklyData();

  const exportPDF = () => {
    const input = document.getElementById('rapport');
    const buttons = document.querySelectorAll('.no-print');

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

        pdf.save(`rapport_productivite_${id}.pdf`);

        buttons.forEach(button => {
          button.classList.remove('hidden');
        });
      });
  };

  const handlePrint = () => {
    const buttons = document.querySelectorAll('.no-print');

    buttons.forEach(button => {
      button.classList.add('hidden');
    });

    window.print();

    buttons.forEach(button => {
      button.classList.remove('hidden');
    });
  };

  return (
    <>
      <Navbar textColor="black" />
      <div className='container' id='rapport' style={{ marginTop: '150px' }}>
        <h2 style={{ textAlign: 'left' }}>Rapport de Production Laitière - {month}/{year}</h2>
        <h4 style={{ textAlign: 'right' }}>Production Totale: {totalProduction} litres</h4>
        <h4 style={{ textAlign: 'right' }}>Revenus Totaux: {totalRevenue} DT</h4>
        <div className='d-flex' style={{ float: 'right' }}>
          <ImPrinter ref={printButtonRef} onClick={handlePrint} className='no-print' style={{ marginLeft: '10px', fontSize: '40px', color: 'blue' }} />
          <LiaFileDownloadSolid ref={exportButtonRef} onClick={exportPDF} className='no-print' style={{ marginLeft: '10px', fontSize: '40px', color: 'red' }} />
        </div>
        <div className='row'>
          <div className='col-12 col-sm-12 col-md-6'>
            <h3>Données de Production Quotidienne</h3>
            <ol className="list-group">
              {productionData.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-start w-100">
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">Jour {item.jour}</div>
                    <p>Quantité: {item.quantite} litres à {item.prix} DT/litre</p>
                  </div>
                  <span className="badge text-primary rounded-pill">{item.quantite}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className='col-12 col-sm-12 col-md-6'>
            <h3>Statistiques Hebdomadaires</h3>
            <div className="list-group">
              {weeklyStats.map((week, index) => (
                <a href="#" className="list-group-item list-group-item-action w-100" key={index}>
                  <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Semaine {index + 1}</h5>
                    <b className='text-primary'>
                      Quantité: {week.totalQuantity} litres <br /> Revenus: {week.totalRevenue} DT
                    </b>
                  </div>
                  <ul>
                    {week.days.map((day, dayIndex) => (
                      <li key={dayIndex}>{day.jour}: {day.quantite} litres</li>
                    ))}
                  </ul>
                </a>
              ))}
            </div>
          </div>
          <div className='col-6 pt-4'>
            <div className='Stat' style={{ height: '400px', margin: '0 auto' }}>
              <h3>Graphique de Production Hebdomadaire</h3>
              <Line data={weeklyChartData} />
            </div>
          </div>
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
      </div>
    </>
  );
};

export default RapportProductivite;
