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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <Routes>
          <Route path="/" element={<App />} />
          <Route path="/accueil" element={<Accueil />} />
                {/* Admin Routes */}
          <Route path="/home" element={<Home/>} />
          <Route path="/culture" element={<Culture/>} />
          <Route path="/betail" element={<Betail />} />
          <Route path="/agriculteurs" element={<Agriculteurs />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/facture" element={<Facture />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
