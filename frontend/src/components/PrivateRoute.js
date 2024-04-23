import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ element, allowedRoles }) => {
  // Vérifier si l'utilisateur est authentifié
  const isAuthenticated = localStorage.getItem('authToken');

  if (!isAuthenticated) {
    // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/" />;
  }

  // Récupérer le rôle de l'utilisateur à partir du localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user && user.role;

  // Vérifier si l'utilisateur a le rôle requis pour accéder à la route
  if (allowedRoles && allowedRoles.includes(userRole)) {
    // Si l'utilisateur a le bon rôle, afficher le composant de la route
    return <Outlet />;
  } else {
    // Rediriger l'utilisateur en fonction du rôle non autorisé
    if (userRole === 'Admin') {
      // Rediriger l'administrateur vers le tableau de bord
      return <Navigate to="/admin/dashboard" />;
    } else {
      // Rediriger les autres utilisateurs vers la page d'accueil
      return <Navigate to="/accueil" />;
    }
  }
};

export default PrivateRoute;
