import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Accueil from './components/CoteClient/PageAccueil.jsx';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Home from './components/CoteAdmin/pages/Home.jsx';
import Culture from './components/CoteAdmin/pages/Culture.jsx';
import Betail from './components/CoteAdmin/pages/Betail.jsx';
import Agriculteurs from './components/CoteAdmin/pages/Agriculteurs.jsx';
import Stock from './components/CoteAdmin/pages/Stock.jsx';
import Facture from './components/CoteAdmin/pages/Facture.jsx';
import Profile from './components/CoteAdmin/pages/Profile.jsx';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import InfoCulture from './components/CoteClient/InfoCulture/InfoCulture.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
          <Route path="/" element={<App />} />
          {/* User Routes */}
          <Route path="/accueil" element={<Accueil />} />
          <Route path="/culture" element={<InfoCulture />} />
                {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Home/>} />
          <Route path="/admin/culture" element={<Culture/>} />
          <Route path="/admin/betail" element={<Betail />} />
          <Route path="/admin/agriculteurs" element={<Agriculteurs />} />
          <Route path="/admin/stock" element={<Stock />} />
          <Route path="/admin/facture" element={<Facture />} />
          <Route path="/admin/profile" element={<Profile />} />
        </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
