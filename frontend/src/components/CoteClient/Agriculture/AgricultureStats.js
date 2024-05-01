// StatistiquesAgricoles.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

const renderBars = (context) => {
  const { chart, ctx, data } = context;

  data.datasets.forEach((dataset, datasetIndex) => {
    const meta = chart.getDatasetMeta(datasetIndex);

    meta.data.forEach((bar, index) => {
      const rendement = dataset.data[index];
      const quantite = dataset.quantities[index];
      const x = bar.x;
      const y = bar.y;

      ctx.fillStyle = dataset.backgroundColor;
      ctx.fillRect(x - 10, y, 20, -rendement * chart.scales.y.getValueForPixel(1));

      ctx.fillStyle = dataset.quantiteColor || 'rgba(192, 75, 192, 0.2)';
      ctx.fillRect(x - 10, y - quantite * chart.scales.y.getValueForPixel(1) - 5, 20, -quantite * chart.scales.y.getValueForPixel(1));
    });
  });
};

const StatistiquesAgricoles = () => {
  const [donneesStatistiques, setDonneesStatistiques] = useState({});
  const [years, setYears] = useState([]);
  const [lastYearValue, setLastYear] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:3001/ListeAgriculture/', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const donnees = response.data;
        const availableYears = [...new Set(donnees.map(item => new Date(item.recoltes[0].date).getFullYear()))];
        availableYears.sort((a, b) => b - a);
        setYears(availableYears);
        const lastYearValue = Math.max(...donnees.map(item => new Date(item.recoltes[0].date).getFullYear()));
        setLastYear(lastYearValue);

        const yearToFetch = selectedYear || lastYearValue; // Utiliser selectedYear s'il est défini, sinon utiliser lastYearValue

        const filteredData = donnees.filter((item) => {
          if (item.recoltes.length > 0) {
            const year = new Date(item.recoltes[0].date).getFullYear();
            return year.toString() === yearToFetch.toString();
          }
          return false;
        });

        const groupedData = {};
        filteredData.forEach((item) => {
          const year = new Date(item.recoltes[0].date).getFullYear();
          const cultureName = item.culture.titre.toLowerCase();
          const key = `${cultureName}-${year}`;
          if (!groupedData[key]) {
            groupedData[key] = {
              label: `${cultureName} (${year})`,
              revenuTotal: item.recoltes[0].revenuTotal,
              quantite: item.recoltes[0].quantites[0].quantite,
              quantiteBalles: item.recoltes[0].balles[0].nombreBalles,
            };
          } else {
            groupedData[key].revenuTotal += item.recoltes[0].revenuTotal;
            groupedData[key].quantite += item.recoltes[0].quantites[0].quantite;
            groupedData[key].quantiteBalles += item.recoltes[0].balles[0].nombreBalles;
          }
        });

        const labels = Object.values(groupedData).map((item) => item.label);
        const rendements = Object.values(groupedData).map((item) => item.revenuTotal);
        const quantites = Object.values(groupedData).map((item) => item.quantite);
        const quantitesBalles = Object.values(groupedData).map((item) => item.quantiteBalles);
        setDonneesStatistiques({
          labels: labels,
          datasets: [
            {
              label: 'Revenus Total',
              data: rendements,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Quantité',
              data: quantites,
              backgroundColor: 'rgba(192, 75, 192, 0.2)',
              borderColor: 'rgba(192, 75, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'QuantitéBalles',
              data: quantitesBalles,
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const options = {
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      customBarRender: renderBars,
    },
  };

  useEffect(() => {
    if (!selectedYear) {
      setSelectedYear(lastYearValue);
    }
  }, [lastYearValue]);

  return (
    <div>
      <h2>Statistiques agricoles</h2>
      <div>
        <label htmlFor="year">Année :</label>
        <select id="year" onChange={(e) => setSelectedYear(e.target.value)} value={selectedYear}>
          <option value="">Sélectionnez une année</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      {selectedYear && donneesStatistiques.labels && donneesStatistiques.datasets ? (
        <Bar data={donneesStatistiques} options={options} />
      ) : (
        <p>Chargement des statistiques...</p>
      )}
    </div>
  );
};

export default StatistiquesAgricoles;
