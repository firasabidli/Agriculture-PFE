// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const isAuthenticate = () => {
  const token = localStorage.getItem('authToken'); // Vérifiez la clé utilisée ici
  console.log("Stored token:", token); // Affichez le token stocké dans la console
  return !!token;
};

const PrivateRoute = () => {
  console.log(isAuthenticate());
  const isAuthenticated = localStorage.getItem('authToken'); // Replace with actual authentication logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
