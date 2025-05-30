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
import MotDePasseOublie from './MotDePasseOublié'; 

const LoginForm = () => {
  const history=useNavigate()
  const { updateUser } = useUser();
 
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
        } else if(userRole === 'Agriculteur') {
          // Redirection pour l'agriculteur
          history('/accueil');
        } else {
        alert("erreur")
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
               
              }
            });
  };
  
 
  
  return (
    <div className={`containerr ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-containerr">
        <div className="signin-signup">
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Se Connecter</h2>
            
            <Form.Floating className='mb-4 mt-3 input-login'>
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
            
            <Form.Floating className='mb-4 input-login'>
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
            <MotDePasseOublie/>
            <img src={userGif} alt="ImageLogin" className='ImageGif'  />
          </form>

          {/* Sign up */}
          <RegistreForm />
        </div>
      </div>

      <div className="panels-containerr">
        <div className="panel left-panel">
          <div className="content in">
            <h6 className='colorleft'>Vous n'avez pas de compte ? Inscrivez-vous ici !</h6>
            <button className="btnn transparent mb-3" id="sign-up-btn" onClick={handleSignUpClick} style={{pointerEvents:"all"}}>
              Sign up
            </button>
          </div>
          <img src={LogoSignIn} className="image" alt="" style={{marginRight:"64%"}} />
        </div>
        <div className="panel right-panel">
          <div className="content up">
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