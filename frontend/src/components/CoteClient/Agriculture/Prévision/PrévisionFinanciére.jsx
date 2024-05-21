import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../../UserContext';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const PrevisionFinanciere = () => {
  const [gainsData, setGainsData] = useState(null);
  const { user } = useUser();
  const userId = user?._id;

  const fetchGainsAndPrediction = () => {
    axios.get(`http://localhost:3001/Prevision/calculateAndPredict/${userId}`)
      .then(response => setGainsData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const createChartData = () => {
    if (!gainsData || !gainsData.historicalData.length) return null;

    const dates = gainsData.historicalData.map(item => new Date(item.date).toLocaleDateString());
    const revenus = gainsData.historicalData.map(item => item.revenu);

    return {
      labels: dates,
      datasets: [
        {
          label: 'Revenus Historiques',
          data: revenus,
          fill: false,
          borderColor: 'rgba(75,192,192,1)',
          tension: 0.1
        },
        {
          label: 'Prévision de Revenu',
          data: [...revenus, gainsData.predictedRevenu],
          fill: false,
          borderColor: 'rgba(153,102,255,1)',
          borderDash: [5, 5],
          tension: 0.1
        }
      ]
    };
  };

  const options = {
    maintainAspectRatio: false, // Pour empêcher le graphique de conserver un rapport hauteur/largeur fixe
    scales: {
      y: {
        beginAtZero: true // Pour commencer l'échelle y à zéro
      }
    }
  };

  return (
    <div className="App">
      <h1>Gains Financiers et Prévisions</h1>
      <button onClick={fetchGainsAndPrediction}>Fetch Gains and Predict Future Revenu</button>
      {gainsData && (
        <div style={{ maxHeight: '400px' }}> {/* Hauteur maximale du conteneur */}
          <p>Total Revenu: {gainsData.totalRevenu}</p>
          <p>Total Coût: {gainsData.totalCout}</p>
          <p>Gains: {gainsData.gains}</p>
          <p>Predicted Revenu: {gainsData.predictedRevenu}</p>
          <div style={{ height: '300px' }}> {/* Hauteur du graphique */}
            <Line data={createChartData()} options={options} />
          </div>
        </div>
      )}
    </div>
  );
}

export default PrevisionFinanciere;
