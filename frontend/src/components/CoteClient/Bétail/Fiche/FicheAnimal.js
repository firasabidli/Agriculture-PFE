import React, { useState } from 'react';
import axios from 'axios';

const AnimalForm = () => {
  const [formData, setFormData] = useState({
    categorie_betail: '',
    Race: '',
    date_naissance: '',
    IdantifiantsAnimal: '',
    sexe: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem('authToken');
      console.log('Token:', authToken);
console.log(formData)
      const response = await axios.post('http://localhost:3001/FicheAnimal/', formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        alert(response.data.message);
        setFormData({
          categorie_betail: '',
          race: '',
          date_naissance: '',
          identifiantAnimal: '',
          sexe: '',
        });
      } else {
        console.error('Invalid response:', response);
        alert('Une erreur s\'est produite lors de la soumission du formulaire.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
      //alert('Une erreur s\'est produite lors de la soumission du formulaire.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Catégorie de Bétail:
          <input
            type="text"
            name="categorie_betail"
            value={formData.categorie_betail}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Race:
          <input
            type="text"
            name="Race"
            value={formData.Race}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Date de Naissance:
          <input
            type="date"
            name="date_naissance"
            value={formData.date_naissance}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Identifiant de l'Animal:
          <input
            type="text"
            name="IdantifiantsAnimal"
            value={formData.IdantifiantsAnimal}
            onChange={handleInputChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Sexe:
          <select
            name="sexe"
            value={formData.sexe}
            onChange={handleInputChange}
            required
          >
            <option value="masculin">Masculin</option>
            <option value="féminin">féminin</option>
          </select>
        </label>
      </div>
      <button type="submit">Enregistrer</button>
    </form>
  );
};

export default AnimalForm;
