import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Chart as ChartJS, defaults  } from "chart.js/auto";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import Chart from "react-apexcharts";
import "./Chart.css";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

const Charts = ({agricultures, betails}) => {
    const [categories, setCategories] = useState([]);
    const [saisons, setSaisons] = useState([]);
    const [categorieBetails, setCategorieBetail] = useState([]);
    const [agriculteursParGouvernorat, setAgriculteursParGouvernorat] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Agriculteur/nbAgriculteursParGouvernaurat');
                setAgriculteursParGouvernorat(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des données :', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/Categorie');
                if (Array.isArray(response.data.data)) {
                    setCategories(response.data.data);
                } else {
                    console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        };

        const fetchSaisons = async () => {
            try {
                const response = await axios.get("http://localhost:3001/Saison");
                setSaisons(response.data.data);
            } catch (error) {
                console.error("Error fetching saisons:", error);
            }
        };

        const fetchCategoriesBetail = async () => {
            try {
                const response = await axios.get('http://localhost:3001/CategorieBetail');
                if (Array.isArray(response.data)) {
                    setCategorieBetail(response.data);
                } else {
                    console.error('La réponse de l\'API ne contient pas de tableau de données:', response.data);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des données:', error);
            }
        };

        fetchCategories();
        fetchSaisons();
        fetchCategoriesBetail();
    }, []);

    if (!agriculteursParGouvernorat) {
        return <div>Chargement en cours...</div>;
    }

    const series = [
        {
            name: "Utilisateurs",
            data: Object.values(agriculteursParGouvernorat),
        },
    ];
    const cat = Object.keys(agriculteursParGouvernorat);

    const options = {
        colors: ["#E91E63"],
        chart: {
            id: "basic-bar",
            marginLeft: 600,
            marginTop: 20
        },
        xaxis: {
            categories: cat,
        },
        markers: {
            size: 10,
        },
    };

    const buildAgricultureCategoriesData = () => {
        return categories.map(category => ({
            label: `Catégorie: ${category.nom_categorie}`,
            value: category.Agricultures.length === 0 ? 0 : category.Agricultures.length
        }));
    };

    const AgricultureCultureData = buildAgricultureCategoriesData();

    const buildAgricultureSaisonData = () => {
        return saisons.map(saison => ({
            label: saison.nom_saison,
            value: saison.Agricultures.length === 0 ? 0 : saison.Agricultures.length
        }));
    };

    const AgricultureSaisonData = buildAgricultureSaisonData();

    const buildCategorieBetailData = () => {
        return categorieBetails.map(cat => ({
            label: cat.nom_categorieBetail,
            value: cat.betails.length === 0 ? 0 : cat.betails.length
        }));
    };

    const CategorieBetailData = buildCategorieBetailData();

    const generateRandomColor = () => {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    };

    const generateRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(generateRandomColor());
        }
        return colors;
    };

    const numColorsCategorieNeeded = AgricultureCultureData.length;
    const numColorsSaisonNeeded = AgricultureSaisonData.length;
    const numColorsCatBetailNeeded = CategorieBetailData.length;
    const randomColorsCategorie = generateRandomColors(numColorsCategorieNeeded);
    const randomColorsSaison = generateRandomColors(numColorsSaisonNeeded);
    const randomColorsCatBetail = generateRandomColors(numColorsCatBetailNeeded);

    return (
        <>
            <div className="Cont row row-cols-1 mb-3">
                <div className="dataCard barCard col-sm-12 col-md-3   mb-3 ">
                    <Bar
                        data={{
                            labels: AgricultureCultureData.map((data) => `${data.label}`),
                            datasets: [
                                {
                                    label: "Nombre de culture",
                                    data: AgricultureCultureData.map((data) => data.value),
                                    backgroundColor: randomColorsCategorie,
                                    borderColor: randomColorsCategorie,
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Culture / Catégories",
                                },
                            },
                        }}
                    />
                </div>

                <div className="dataCard doughnutCard col-sm-12 col-md-3  mb-3" >
                    <Doughnut
                        data={{
                            labels: AgricultureSaisonData.map((data) => `Saison: ${data.label}`),
                            datasets: [
                                {
                                    label: "Nombre de culture",
                                    data: AgricultureSaisonData.map((data) => data.value),
                                    backgroundColor: randomColorsSaison,
                                    borderColor: randomColorsSaison,
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: "Culture / Saison",
                                },
                            },
                        }}
                    />
                </div>
            </div>
            <div className=" row row-cols-1 mb-3">
            <div className="m-3 col-sm-12 col-md-9  mb-3">
                <h4>Nombre d'Agriculteur par gouvernaurat</h4>
                <div>
                    <Chart
                        options={options}
                        series={series}
                        type="scatter"
                        
                    />
                </div>
            </div>

            <div className="dataCard pieCard col-sm-12 col-md-2  mb-3" >
                <Pie
                    data={{
                        labels: CategorieBetailData.map((data) => data.label),
                        datasets: [
                            {
                                label: "Nombre de bétail",
                                data: CategorieBetailData.map((data) => data.value),
                                backgroundColor: randomColorsCatBetail,
                                borderColor: randomColorsCatBetail,
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                text: "Bétails / Catégories",
                            },
                        },
                    }}
                />
            </div>
            </div>
        </>
    );
};

export default Charts;
