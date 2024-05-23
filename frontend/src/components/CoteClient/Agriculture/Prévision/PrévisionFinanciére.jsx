import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../UserContext';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const PrevisionFinanciere = () => {
  const [financialData, setFinancialData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const { user } = useUser();
  const userId = user?._id;

  const fetchFinancialData = () => {
    axios.get(`http://localhost:3001/Prevision/calculateAndPredict/${userId}/${selectedYear}`)
      .then(response => setFinancialData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const createChartData = () => {
    if (!financialData || !financialData.historicalData) return null;

    const years = Object.keys(financialData.historicalData.revenus).map(year => parseInt(year));
    const revenues = Object.values(financialData.historicalData.revenus);
    const expenses = Object.values(financialData.historicalData.expenses);

    return {
      labels: [...years, selectedYear + 1], // Ajouter l'année suivante pour la prédiction
      datasets: [
        {
          label: 'Revenus Historiques',
          data: revenues,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        },
        {
          label: 'Dépenses Historiques',
          data: expenses,
          fill: false,
          borderColor: 'rgba(255,99,132,1)',
          tension: 0.1
        },
        {
          label: 'Prévision de Revenu',
          data: [...revenues, financialData.predictedRevenu],
          fill: false,
          borderColor: 'rgba(153,102,255,1)',
          borderDash: [5, 5],
          tension: 0.1
        },
        {
          label: 'Dépenses Prédites',
          data: [...expenses, financialData.predictedExpenses],
          fill: false,
          borderColor: 'rgba(255,159,64,1)',
          borderDash: [5, 5],
          tension: 0.1
        }
      ]
    };
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Container className="App">
      <h1 style={{color:'rgba(121,169,197,.92)'}}>Prévision Financière</h1>
      <div>
        <label>Choisir une année: </label>
        <Form.Select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </Form.Select>
      </div>
      <Button variant="primary" style={{marginTop:'5%'}} onClick={fetchFinancialData}>Calculer et Prédire</Button>
      {financialData && (
        <Row>
          <Col md={6}>
            
          <div className="row mt-4">
          <div className="col-md-6">
            <div className="row text-600 text-white bgc-default-tp1 py-25" style={{width: "150%" }}>
              <div className="col-12" style={{ marginLeft: "16%" }}>Données Financières de l'Année Actuelle {selectedYear}</div>
            </div>
            <div className="text-95 text-secondary-d3" style={{width: "140%" }}>
              {[
                { label: 'Revenu', value: financialData.totalRevenu },
                { label: 'Total Coût', value: financialData.totalCout },
                { label: 'Gains', value: financialData.gains },
              ].map((item, index) => (
                <div className={`row mb-2 mb-sm-0 py-25 ${index % 2 === 0 ? 'bgc-default-l4' : ''}`} key={index}>
                  <div className="col-6 text-left" style={{ fontWeight: "bold" }}>{item.label}</div>
                  <div className="col-6 text-right">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
            </div>
            <div className="row mt-4">
          <div className="col-md-6">
            <div className="row text-600 text-white bgc-default-tp1 py-25" style={{width: "150%" }}>
              <div className="col-12" style={{ marginLeft: "16%" }}>Données Financières de l'Année {selectedYear+1} </div>
            </div>
            <div className="text-95 text-secondary-d3" style={{width: "140%" }}>
              {[
                { label: 'Revenu Prédit', value: financialData.predictedRevenu },
                { label: 'Dépenses Prédites', value: financialData.predictedExpenses },
                { label: 'Gains Prévus', value: financialData.predictedGains },
              ].map((item, index) => (
                <div className={`row mb-2 mb-sm-0 py-25 ${index % 2 === 0 ? 'bgc-default-l4' : ''}`} key={index}>
                  <div className="col-6 text-left" style={{ fontWeight: "bold" }}>{item.label}</div>
                  <div className="col-6 text-right">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
    
            </div>
          </Col>
          <Col md={6}>
            <div style={{ height: '300px' }}>
              <Line data={createChartData()} options={options} />
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default PrevisionFinanciere;
