import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Tilt } from 'react-tilt';
import '../../assets/Authentification/main.css';
import '../../assets/Authentification/util.css';
import image from '../../assets/Authentification/image/img-01.png';
const LoginForm = () => {


  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <Tilt className="login100-pic js-tilt" options={{ scale: 1.2 }}>
            <img src={image} alt="IMG" />
          </Tilt>
          {/* <span className="login100-form-title">Member Login</span> */}
         <form class=" row login100-form validate-form">
					<span class="login100-form-title">
						Se Connecter
					</span>
          <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" placeholder="Email"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
          <div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="pass" placeholder="Password"/>
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn">
							Login
						</button>
					</div>

					<div class="text-center p-t-12">
						<span class="txt1">
							Forgot
						</span>
						<a class="txt2" href="/">
							Username / Password?
						</a>
					</div>

					<div class="text-center p-t-136">
						<a class="txt3" href="/">
							Create your Account
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
