import React,{ useState } from 'react';
import Form from 'react-bootstrap/Form';
import './Auth.css'
import { FaLock,FaMapMarkerAlt,FaCalendarAlt,FaPhoneAlt,FaIdCard} from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
const RegistreForm = () => {
  const [formData, setFormData] = useState({
    cin: '',
    nom: '',
    gouvernorat: {
      nom: '',
      latitude: '',
      longitude: ''
    },
    adresse: '',
    email: '',
    dateNaissance: '',
    numeroTelephone:'',
    password: '',
    confirmPassword: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeGov = (e) => {
    const { name, value } = e.target;
    let gouvernoratData = gouvernorats.find((gouvernorat) => gouvernorat.nom === value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: gouvernoratData,
    }));
  };
  
  const gouvernorats = [
    
    { nom: 'Ariana', latitude: 36.9833, longitude: 10.1167 },
    { nom: 'Béja', latitude: 36.7256, longitude: 9.1817 },  
    { nom: 'Ben Arous', latitude: 36.7531, longitude: 10.2189 },  
    { nom: 'Bizerte', latitude: 37.0833, longitude: 9.5833 },
    { nom: 'Gabès', latitude: 33.8333, longitude: 9.75 },
    { nom: 'Gafsa', latitude: 34.5, longitude: 9 },  
    { nom: 'Jendouba', latitude: 36.6667, longitude: 8.75 }, 
    { nom: 'Kairouan', latitude: 35.5833, longitude: 9.8333 }, 
    { nom: 'Kasserine', latitude: 35.25, longitude: 8.7833 },
    { nom: 'Kébili', latitude: 33.5, longitude: 8.8333 }, 
    { nom: 'Le Kef', latitude: 36.0833, longitude: 8.75 }, 
    { nom: 'Mahdia', latitude: 35.3333, longitude: 10.5833 }, 
    { nom: 'La Manouba', latitude: 36.8333, longitude: 9.8333 }, 
    { nom: 'Médenine', latitude: 33.3333, longitude: 11 }, 
    { nom: 'Monastir', latitude: 35.6167, longitude: 10.75 },
    { nom: 'Nabeul', latitude: 36.6667, longitude: 10.6667 }, 
    { nom: 'Sfax', latitude: 34.75, longitude: 10.4167 }, 
    { nom: 'Sidi Bouzid', latitude: 35.0382, longitude: 9.4849 }, 
    { nom: 'Siliana', latitude: 36, longitude: 9.3333 }, 
    { nom: 'Sousse', latitude: 35.9167, longitude: 10.4167 }, 
    { nom: 'Tataouine', latitude: 32, longitude: 10 }, 
    { nom: 'Tozeur', latitude: 34, longitude: 8.0833 }, 
    { nom: 'Tunis', latitude: 36.7667, longitude: 10.1333 }, 
    { nom: 'Zaghouan', latitude: 36.3333, longitude: 10 }, 
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        formData.cin.trim() === '' ||
        formData.nom.trim() === '' ||
        formData.adresse.trim() === '' ||
        formData.email.trim() === '' ||
        formData.dateNaissance.trim() === '' ||
        formData.password.trim() === '' ||
        formData.confirmPassword.trim() === ''
      ) {
        alert("Veuillez remplir tous les champs.");
        return;
      }
      if (formData.gouvernorat.nom === '') {
        alert("Veuillez sélectionner un gouvernorat.");
        return;
      }
      const isValidCin = /^[0-9]+$/.test(formData.cin);
      const isValidPhone = /^[0-9]+$/.test(formData.numeroTelephone);
      if (!isValidCin || !isValidPhone) {
        alert("Les champs CIN et numéro de téléphone ne doivent contenir que des chiffres.");
        return;
      }
      if(formData.cin.length !==8 || formData.numeroTelephone.length !==8){
        alert("Veuillez verifier le taille le cin ou numero du telephone.");
        return;
      }
      const isValidPassword = /^[a-zA-Z0-9\s]+$/.test(formData.password);
      const isValidConfirmPassword = /^[a-zA-Z0-9\s]+$/.test(formData.confirmPassword);

    if (!isValidPassword || !isValidConfirmPassword) {
      alert('Le champ password ne doit contenir que des lettres, des chiffres et des espaces.');
      return;
    }

    // Validation de la longueur minimale du mot de passe
    if (formData.password.length < 7 || formData.confirmPassword.length < 7) {
      alert("Le mot de passe doit contenir au moins 7 caractères.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }
    axios.post('http://localhost:3001/auth/CreateCompte', formData)
      .then(response => {
        console.log('User created successfully:', response.data);
        alert("Utilisateur créé avec succès..");
              // Clear form data
      setFormData({
        cin: '',
        nom: '',
        gouvernorat: {
          nom: '',
          latitude: '',
          longitude: ''
        },
        adresse: '',
        email: '',
        dateNaissance: '',
        numeroTelephone:'',
        password: '',
        confirmPassword: '',
      });
      })
      .catch(error => {
        console.error('Error creating user:', error.response.data.error);
        alert(error.response.data.error);
      });
  };
  return (
    <form className="sign-up-form" onSubmit={handleSubmit}>
            <h2 className="title">Inscription</h2>
            <Form.Floating className='mb-4 mt-3 input'>
              <Form.Control
                name="nom"
                type="text"
                value={formData.nom}
                placeholder="Nom d'utilisateur"
                onChange={handleChange}
                
              />
              <label htmlFor="username"><FaUser /> Nom d'utilisateur</label>
            </Form.Floating>
            <Form.Floating className='mb-4  input'>
              <Form.Control
                name="cin"
                type="text"
                value={formData.cin}
                placeholder="CIN"
                onChange={handleChange}
              />
              <label htmlFor="cin"><FaIdCard /> CIN</label>
            </Form.Floating>
            <Form.Floating className='mb-4  input'>
            <select  className="form-select  " aria-label="Default select example" name="gouvernorat" value={formData.gouvernorat} onChange={handleChangeGov} >
            <option value="">Sélectionnez un gouvernorat</option>
            {gouvernorats.map((gouvernorat, index) => (
              <option key={index} value={gouvernorat.nom}>
                {gouvernorat.nom}
              </option>
            ))}
          </select>
          <label htmlFor="adresse"><FaMapMarkerAlt /> Votre Gouvernorat</label>
          </Form.Floating>
            <Form.Floating className='mb-4  input'>
              <Form.Control
                name="adresse"
                type="text"
                value={formData.adresse}
                placeholder="Adresse"
                onChange={handleChange}
              />
              <label htmlFor="adresse"><FaMapMarkerAlt /> Adresse</label>
            </Form.Floating>
              <Form.Floating className='mb-4 input'>
                <Form.Control
                  name="dateNaissance"
                  type="date"
                  value={formData.dateNaissance}
                  placeholder="Date de naissance"
                  onChange={handleChange}
                />
                <label htmlFor="dateNaissance"><FaCalendarAlt /> Date de naissance</label>
            </Form.Floating>
              
            <Form.Floating className='mb-4  input'>
              <Form.Control
                name="email"
                type="email"
                value={formData.email}
                placeholder="Adresse e-mail"
                onChange={handleChange}
              />
             <label htmlFor="email"><MdEmail /> Adresse e-mail</label>
            </Form.Floating>
            <Form.Floating className='mb-4 input'>
              <Form.Control
                name="numeroTelephone"
                type="text"
                value={formData.numeroTelephone}
                placeholder="Numéro de téléphone"
                onChange={handleChange}
              />
              <label htmlFor="numeroTelephone"><FaPhoneAlt /> Numéro de téléphone</label>
            </Form.Floating>
            <Form.Floating className='mb-4 input'>
              <Form.Control
                name="password"
                type="password"
                value={formData.password}
                placeholder="Mot de passe"
                onChange={handleChange}
              />
              <label htmlFor=""><FaLock /> Mot de passe</label>
            </Form.Floating>

            <Form.Floating className='mb-3 input'>
              <Form.Control
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                placeholder="Confirmer le mot de passe"
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword"><FaLock /> Confirmer le mot de passe</label>
            </Form.Floating>
            <input type="submit" className="btnn btn-form-signup mb-3" value="Inscription" />

          </form>
  )};
  export default RegistreForm;