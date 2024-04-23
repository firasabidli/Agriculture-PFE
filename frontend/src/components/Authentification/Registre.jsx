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

            <Form.Floating className='mb-4 input'>
              <Form.Control
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                placeholder="Confirmer le mot de passe"
                onChange={handleChange}
              />
              <label htmlFor="confirmPassword"><FaLock /> Confirmer le mot de passe</label>
            </Form.Floating>
            <input type="submit" className="btnn btn-form-signup mb-4" value="Inscription" />

          </form>
  )};
  export default RegistreForm;