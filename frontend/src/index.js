import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import PageAccueil from './components/CoteClient/PageAccueil.jsx';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';


import MethodeStock from './components/CoteAdmin/pages/Agriculture/MethodeStock/MethodeStock.jsx';
import Materiel from './components/CoteAdmin/pages/Agriculture/Materiel/Materiel.jsx';
import Medicament from './components/CoteAdmin/pages/Agriculture/MedicamentAgriculture/Medicament.jsx';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import InfoCulture from './components/CoteClient/InfoCulture/InfoCulture.jsx';
import Categories from './components/CoteAdmin/pages/Agriculture/CategoriesAgriculture/Categories.jsx';
import Agricultures from './components/CoteAdmin/pages/Agriculture/Agricultures.jsx';
import Dashboard from './components/CoteAdmin/Dashboard.jsx';
import PrivateRoute from './components/PrivateRoute.js';
import { UserProvider } from './components/UserContext.js';
import Profile from './components/CoteAdmin/pages/Profile/Profile.jsx';
import ActiverCompte from './components/CoteAdmin/pages/Agriculteurs/ActiverComptesAgriculteurs/ActiverCompte.jsx';
import ProfileAgriculteur from './components/CoteClient/Profile/ProfileAgriculteur.jsx';
import CategorieBetail from './components/CoteAdmin/pages/Bétail/CategoriesBetail/CategoriesBetail.jsx';
import Betail from './components/CoteAdmin/pages/Bétail/GestionBetail/betail.jsx';
//import FicheAnimal from './components/CoteClient/Bétail/Fiche/FicheAnimal.js';
import ListAnimal from './components/CoteClient/Bétail/Fiche/ListAnimal.js';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes>
          <Route element={<PrivateRoute />} >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/accueil" element={<PageAccueil />} />
          </Route>
                <Route path="/" element={<App />} />
                {/* User Routes */}
                {/* <Route path="/accueil" element={<PageAccueil />} /> */}
                <Route  path="/culture/:cultureId" component={InfoCulture} element={<InfoCulture />} />
                      {/* Admin Routes */}
                {/* <Route path="/admin/dashboard" element={<Dashboard/>} /> */}
                <Route path="/profileAgriculteur" element={<ProfileAgriculteur />} />
                {/* Admin Routes Agriculture */}
                <Route path="/admin/Methodestock" element={<MethodeStock />} />
                <Route path="/admin/MedicamentCulture" element={<Medicament />} />
                <Route path="/admin/Materiel" element={<Materiel />} />
                <Route path="/admin/Categories" element={<Categories />} />
                <Route path="/admin/Agricultures" element={<Agricultures />} />
                <Route path="/admin/Profile" element={<Profile />} />
                <Route path="/admin/ActiverCompte" element={<ActiverCompte />} />
                <Route path="/agriculteur/FicheAnimal" element={<ListAnimal/>}/>
                {/* Admin Routes Bétail */}
                <Route path="/admin/CategorieBetail" element={<CategorieBetail/>}></Route>
                <Route path="/admin/Betail" element={<Betail/>}></Route>
          </Routes>
      </UserProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
