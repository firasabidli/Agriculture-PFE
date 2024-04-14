import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './Auth.css'
import userGif from '../../assets/images/User.gif'
import LogoSignIn from '../../assets/images/log.png'
import LogoSignUp from '../../assets/images/register.png'
import { FaLock} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import RegistreForm from './Registre';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext';
import AuthService from './service/AuthService';
// Supprimez les accolades autour de `onLogin`
const LoginForm = () => {
  const history=useNavigate()
  const { updateUser } = useUser();
  // const { setUser} = useUser();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };
  
  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //authService
  
  const handleSubmit = (e) => {
    e.preventDefault();
    AuthService.login(formData.email,formData.password)
    .then(({ authToken, user }) => {
      console.log("authToken :", authToken);
      console.log("use :", user);
      const userRole = user.role;
      //const userName = user.nom;
        if (userRole === 'Admin') {
          // Redirection pour l'administrateur
          history('/admin/dashboard');
        } else if (userRole === 'Agriculteur') {
          // Redirection pour l'agriculteur
          history('/accueil');
        } else {
          // Gérer les autres types d'utilisateurs ou les erreurs
        }
        // setUser(user);
        updateUser(user);
      })
      .catch(error => {
              if (error.response) {
                console.error('Login failed:', error.response.data.error);
                alert (error.response.data.error);
              } else {
                console.error('Login failed:', error.message);
                // Handle other errors
              }
            });
  };
  
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post('http://localhost:3001/auth/Login', formData)
  //     .then(response => {
  //       console.log('Login successful:', response.data);
  //       const userRole = response.data.user.role;
  //       const userName = response.data.user.nom;
  //       console.log(userName,userRole);
  //       console.log('userRole:',userRole);
  //       if (userRole === 'admin') {
  //         setUserName(userName);
  //       navigate('/Dashbord');
  //       } else if (userRole === 'agriculteur') {
  //        navigate('/accueil');
  //       } else {
  //         alert("Erreur")
  //       }

  //       //  onLogin(userName,userRole);
  //     })
  //     .catch(error => {
  //       if (error.response) {
  //         console.error('Login failed:', error.response.data.error);
  //         alert (error.response.data.error);
  //       } else {
  //         console.error('Login failed:', error.message);
  //         // Handle other errors
  //       }
  //     });
  // };
  
  return (
    <div className={`containerr ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-containerr">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Se Connecter</h2>
            
            <Form.Floating className='mb-4 mt-3 input'>
              <Form.Control
                id="floatingInputCustom"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInputCustom"><MdEmail /> Adresse e-mail</label>
            </Form.Floating>
            
            <Form.Floating className='mb-4 input'>
              <Form.Control
                id="floatingPasswordCustom"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <label htmlFor="floatingPasswordCustom"><FaLock /> Mot de passe</label>
            </Form.Floating>

            <input type="submit" value="Connexion" className="btnn solid mb-4" />
            <img src={userGif} alt="ImageLogin" className='ImageGif'  />
          </form>

          {/* Sign up */}
          <RegistreForm />
        </div>
      </div>

      <div className="panels-containerr">
        <div className="panel left-panel">
          <div className="content">
            <h6 className='colorleft'>Vous n'avez pas de compte ? Inscrivez-vous ici !</h6>
            <button className="btnn transparent mb-3" id="sign-up-btn" onClick={handleSignUpClick} style={{pointerEvents:"all"}}>
              Sign up
            </button>
          </div>
          <img src={LogoSignIn} className="image" alt="" style={{marginRight:"64%"}} />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <p>Vous avez déjà un compte ? Connectez-vous ici !</p>
            <button className="btnn transparent mb-2" id="sign-in-btn" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          
          <img src={LogoSignUp} className="image" alt="" style={{marginRight:"130%"}} />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
