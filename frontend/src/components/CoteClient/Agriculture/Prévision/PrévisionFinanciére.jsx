import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../UserContext';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

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
    <div className="App">
      <h1>Prévision Financière</h1>
      <div>
        <label>Choisir une année: </label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <button onClick={fetchFinancialData}>Calculer et Prédire</button>
      {financialData && (
        <div style={{ maxHeight: '400px' }}>
          <p>Total Revenu: {financialData.totalRevenu}</p>
          <p>Total Coût: {financialData.totalCout}</p>
          <p>Gains: {financialData.gains}</p>
          <p>Revenu Prédit: {financialData.predictedRevenu}</p>
          <p>Dépenses Prédites: {financialData.predictedExpenses}</p>
          <p>Gains Prévus: {financialData.predictedGains}</p>
          <div style={{ height: '300px' }}>
            <Line data={createChartData()} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PrevisionFinanciere;
