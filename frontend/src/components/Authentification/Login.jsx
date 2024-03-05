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
        <label htmlFor="floatingInputCustom"><MdEmail /> Email address</label>
      </Form.Floating>
      <Form.Floating className='mb-4 input'>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
        />
        <label htmlFor="floatingPasswordCustom"><FaLock /> Password</label>
      </Form.Floating>
            <input type="submit" value="Login" className="btnn solid" />
          </form>

          
          {/* Sign up */}
          <form action="#" className="sign-up-form">
            <h2 className="title">Create Compte</h2>
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
        <label htmlFor="floatingInputCustom"><MdEmail /> Email address</label>
      </Form.Floating>
            
           

			
      <Form.Floating className='mb-4 input'>
        <Form.Control
          id="floatingPasswordCustom"
          type="password"
          placeholder="Password"
        />
        <label htmlFor="floatingPasswordCustom"><FaLock /> Password</label>
      </Form.Floating>
			
            <input type="submit" className="btnn" value="Sign up" />
            
            
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button className="btnn transparent" id="sign-up-btn" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src={LogoSignIn} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button className="btnn transparent" id="sign-in-btn" onClick={handleSignInClick}>
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
