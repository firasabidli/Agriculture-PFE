import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import './Auth.css'
import LogoSignIn from '../../assets/images/log.png'
import LogoSignUp from '../../assets/images/register.png'
import { FaLock } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const LoginForm = () => {

	const [isSignUpMode, setIsSignUpMode] = useState(false);

	const handleSignInClick = () => {
	  setIsSignUpMode(false);
	};
  
	const handleSignUpClick = () => {
	  setIsSignUpMode(true);
	};
  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Se Connecter</h2>
            
			<Form.Floating className='mb-4 mt-3 input' >
        	<Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInputCustom"><MdEmail /> Adresse e-mail</label>
      </Form.Floating>
      <Form.Floating className='mb-4 input'>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
        />
        <label htmlFor="floatingPasswordCustom"><FaLock /> Mot de passe</label>
      </Form.Floating>

            <input type="submit" value="Connexion" className="btnn solid mb-4" />
            
          </form>

          
          {/* Sign up */}
          <form action="#" className="sign-up-form">

            <h2 className="title">Inscription</h2>
            <Form.Floating className='mb-4 mt-3 input' >
        	<Form.Control
          id="floatingInputCustom"
          type="text"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInputCustom"><FaUser /> Nom d'utilisateur</label>
      </Form.Floating>
			
			<Form.Floating className='mb-4  input' >
        	<Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
        />
        <label htmlFor="floatingInputCustom"><MdEmail /> Adresse e-mail</label>
      </Form.Floating>
            
           

			
      <Form.Floating className='mb-4 input'>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
        />
        <label htmlFor="floatingPasswordCustom"><FaLock /> Mot de passe</label>
      </Form.Floating>
			
            <input type="submit" className="btnn mb-4" value="Inscription" />
            
            
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <p>
            Vous n'avez pas de compte ? Inscrivez-vous ici !
            </p>
            <button className="btnn transparent mb-3" id="sign-up-btn" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={LogoSignIn} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <p>Vous avez déjà un compte ? Connectez-vous ici !</p>
            
            <button className="btnn transparent mb-2" id="sign-in-btn" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src={LogoSignUp} className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
