import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
  
    // Iterate over weeklyStats to aggregate data
    weeklyStats.forEach((week, index) => {
      // Calculate total quantity and revenue for the week
      const totalQuantity = week.totalQuantity;
      const totalRevenue = week.totalRevenue;
  
      // Add total quantity and revenue to datasets
      weeklyChartData.datasets[0].data.push(totalQuantity);
      weeklyChartData.datasets[1].data.push(totalRevenue);
  
      // Add label for the week
      weeklyChartData.labels.push(`Semaine ${index + 1}`);
    });
  
    return weeklyChartData;
  };
  
  // Call the function to generate chart data
  const weeklyChartData = aggregateWeeklyData();

  const exportPDF = () => {
    const input = document.getElementById('rapport');

    // Masquer les boutons
    printButtonRef.current.style.display = 'none';
    exportButtonRef.current.style.display = 'none';

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

            pdf.save(`facture_${id}.pdf`);

            // Réafficher les boutons
            printButtonRef.current.style.display = 'block';
            exportButtonRef.current.style.display = 'block';
        });
  };

  return (
    <div className='container' id='rapport'>
      <h2 style={{textAlign:'left'}}>Rapport de Production Laitière - {month}/{year}</h2>
      <h4 style={{textAlign:'right'}}>Production Totale: {totalProduction} litres</h4>
      <h4 style={{textAlign:'right'}}>Revenus Totaux: {totalRevenue} DT</h4>
      <div className='d-flex 'style={{float:'right'}}>
       
        <ImPrinter ref={printButtonRef} onClick={() => window.print()} style={{marginLeft:'10px',fontSize:'40px', color:'blue'}}/>
        <LiaFileDownloadSolid ref={exportButtonRef} data-title="PDF" onClick={exportPDF} style={{marginLeft:'10px',fontSize:'40px', color:'red'}} />
       
      </div>
      <div className='row'>
        <div className='col-12 col-sm-12 col-md-6 '>
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
                    Quantité: {week.totalQuantity} litres <br/> Revenus: {week.totalRevenue} DT
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
        <div className='Stat' style={{height:'400px', margin:'0 auto'}}>
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
                        
                    }
                `}
            </style>
    </div>
  );
}

export default RapportProductivite;
