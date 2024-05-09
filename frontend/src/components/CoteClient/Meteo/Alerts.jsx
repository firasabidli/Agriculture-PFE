import React, { useState, useEffect } from 'react';

const Alerts = ({ weatherData }) => {
  const [adviceList, setAdviceList] = useState([]);

  useEffect(() => {
    if (weatherData) {
      const newAdviceList = [];

      // Gestion des maladies des plantes
      if (weatherData.current.temp > 25 && weatherData.current.humidity > 70) {
        newAdviceList.push({
          concernant:"Maladies des plantes",  
          title: "Risque élevé de mildiou ",
          description: "Traitez les plantes avec un fongicide recommandé."
        });
      } else if (weatherData.current.pressure > 20) {
        newAdviceList.push({
          concernant:"Maladies des plantes", 
          title: "Conditions favorables à la propagation des maladies fongiques",
          description: "Appliquez un traitement préventif."
        });
      }

      // Gestion des ravageurs
      if (weatherData.current.temp > 30 && weatherData.current.humidity > 60) {
        newAdviceList.push({
            concernant:"Ravageurs", 
          title: "Risque accru d'infestation de ravageurs",
          description: "Utilisez des méthodes de lutte biologique ou des traitements insecticides si nécessaire."
        });
      }

      // Conservation des sols
      if (weatherData.current.pressure > 30 && weatherData.current.wind_speed < 10) {
        newAdviceList.push({
          concernant:"Conservation des sols", 
          title: "Risque d'érosion du sol en raison de fortes précipitations",
          description: "Envisagez d'adopter des techniques de conservation des sols telles que la plantation de cultures de couverture."
        });
      }

      // Planification des récoltes
      if (weatherData.current.temp < 20 && weatherData.current.pressure < 10) {
        newAdviceList.push({
          concernant:"Planification des récoltes", 
          title: "Conditions favorables pour semer des cultures d'hiver",
          description: "Planifiez vos récoltes en fonction de ces conditions."
        });
      }

      setAdviceList(newAdviceList);
    }
  }, [weatherData]);

  return (
    <div>
      <h2>Conseils agricoles</h2>
      {adviceList.length > 0 ? (
        adviceList.map((advice, index) => (
          <div key={index} className="alert bg-danger w-50 m-5 text-light " role="alert">
            <h4 className="alert-heading text-center "> {advice.concernant}</h4>
            <h5 >{advice.title}</h5>
            <p>{advice.description}</p>
          </div>
        ))
      ) : (
        <p>Aucun conseil spécifique pour le moment.</p>
      )}
    </div>
  );
};

export default Alerts;
