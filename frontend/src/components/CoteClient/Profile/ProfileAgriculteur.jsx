import React from 'react';
import Navbar from '../Navbar.js';


import '../../../assets/CoteClient/css/style.css';
import './Profile.css'
import { useState } from 'react';

import { BsFillCameraFill } from 'react-icons/bs';
import { useUser } from '../../UserContext.js';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const ProfileAgriculteur = () => {

  const { user, updateUser } = useUser();
  const Name = user?.nom;
  const userName = user?.username;
  const userRole = user?.role;
  const userCin = user?.cin;
  const userDateNaissance = user?.dateNaissance;
  const userImage = user?.image;
  const [imageProfile, setImageProfile] = useState(null)
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedImage, setSelectedImage] = useState(''); // État local pour l'URL de l'image sélectionnée


  
 

  // Fonction pour basculer le formulaire de mot de passe
  const togglePasswordForm = () => {
    setShowPasswordForm(!showPasswordForm);
  };

  // Gestion du changement d'image
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageProfile(file);
    console.log(imageProfile)
    const reader = new FileReader();
    reader.onloadend = () => {
     setSelectedImage(reader.result); 
    
    };
    if (file) {
      reader.readAsDataURL(file); // Lecture du fichier comme URL data
      
    }
    
  };

  // Fonction pour formater la date de naissance
  const formatDateOfBirth = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
  };

  // Fonction pour mettre à jour le profil
  const EditProfil = async (event) => {
    event.preventDefault();
  
    try {
      const formData = new FormData(event.target); // Créez un nouveau FormData
  
      
  
      // Ajoutez l'image sélectionnée s'il y en a une
      if (imageProfile instanceof File) {
        formData.append('image', imageProfile);
      }
  
      // Envoyez la requête PUT avec formData
    const response =  await axios.put(`http://localhost:3001/UserProfile/${user._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     
			const updatedUser = response.data.agriculteur;
        updateUser(updatedUser);
				
      
      alert('Profil mis à jour avec succès!');
      window.location.reload()
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil :', error);
      alert('Échec de la mise à jour du profil. Veuillez réessayer.');
    }
  };
  
  
     
  const handleSubmitPassword = async (event) => {
    event.preventDefault();
  
    // Vérifications des conditions
    if (currentPassword.length < 6) {
      alert('Le mot de passe actuel doit avoir au moins 6 caractères.');
      return;
    }
  
    if (newPassword.length < 6) {
      alert('Le nouveau mot de passe doit avoir au moins 6 caractères.');
      return;
    }
  
    if (newPassword !== confirmPassword) {
      alert('Le nouveau mot de passe et la confirmation ne correspondent pas.');
      return;
    }
  
    try {
      // Envoyer la requête avec les données de mot de passe
      await axios.put(
        `http://localhost:3001/UserProfile/editPassword/${user._id}`,
        { currentPassword, newPassword, confirmPassword },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
        alert('Mot de passe mis à jour avec succès!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      
    } catch (error) {
      console.error('Erreur lors de la mise à jour du mot de passe :', error);
      alert('Mot de passe actuel incorrect');
    }
  };
  




  return (
    <div className='back'>
   
     <Navbar />
   
     
     <main className="container padd">
          <div className="row flex-lg-nowrap">
            <div className="col">
              <div className="row">
                <div className="col mb-3">
                  <div className="card">
                    <div className="card-body">
                      <div className="e-profile">
                        <div className="row">
                          <div className="col-12 col-sm-auto mb-3">
                            <div className="mx-auto">
                              <div className="d-flex justify-content-center align-items-center rounded avatar">
                                <div className="upload">
                                  <img src={ selectedImage || (userImage && userImage.startsWith('http') ? userImage : `http://localhost:3001/images/Utilisateur/Agriculteur/${userImage}`) } className='im' alt="Profil"/>
                                  <div className="round">
                                    <input type="file" onChange={handleImageChange} />
                                    <BsFillCameraFill className="fs-4 padding" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                              <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">{Name}</h4>
                              <p className="mb-0">@{userName}</p>
                            </div>
                            <div className="text-center text-sm-right">
                              <span className="badge text-secondary">{userRole}</span>
                              <div className="text-muted">
                                <button className="btn fs-6" onClick={togglePasswordForm}>
                                  {!showPasswordForm ? 'Changer Mot de passe' : 'Modifier profil'}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <ul className="nav nav-tabs pt-5">
                          <li className="nav-item">
                            <Link className="active nav-link">
                              Paramètres
                            </Link>
                          </li>
                        </ul>
                        <div className="tab-content pt-3">
                          <div className="tab-pane active">
                            {!showPasswordForm ? (
                              <form className="form" onSubmit={EditProfil}>
                                <div className="col-6 resp">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Nom</label>
                                        <div className="form-control bg-secondary text-light size">{Name}</div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>CIN</label>
                                        <div className="form-control bg-secondary text-light size">{userCin}</div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group ">
                                        <label>Date de Naissance</label>
                                        <div className="form-control bg-secondary text-light size">{formatDateOfBirth(userDateNaissance)}</div>
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group ">
                                        <label>Email</label>
                                        <div className="form-control bg-secondary text-light size">{ user?.email}</div>
                                      </div>
                                    </div>
                                  </div>
                                 
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Téléphone</label>
                                        <input className="form-control" type="text" 
                                          id="numeroTelephone"
                                          name="numeroTelephone"
                                          defaultValue={ user?.numeroTelephone}
                                         
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col mb-3">
                                      <div className="form-group">
                                        <label>Adresse</label>
                                        <textarea className="form-control" rows="5"
                                          id="adresse"
                                          name="adresse"
                                          defaultValue={ user?.adresse}
                                         
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col d-flex justify-content-end">
                                    <button className="btn btn-primary" type="submit">Enregistrer les modifications</button>
                                  </div>
                                </div>
                              </form>
                            ) : (
                              <form className="form" onSubmit={handleSubmitPassword}>
                              <div className="col-6">
                                <div className="mb-2"><b>Changer le mot de passe</b></div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Mot de passe actuel</label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        placeholder="••••••"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Nouveau mot de passe</label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        placeholder="••••••"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Confirmer le mot de passe</label>
                                      <input
                                        className="form-control"
                                        type="password"
                                        placeholder="••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col d-flex justify-content-end">
                                  <button className="btn btn-primary" type="submit">Enregistrer</button>
                                </div>
                              </div>
                            </form>

                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
     

    
      
    </div>
  );
};

export default ProfileAgriculteur;
