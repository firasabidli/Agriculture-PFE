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
import InfoBetail from './components/CoteClient/InfoBetail/InfoBetail.jsx';
import PageSanté from './components/CoteClient/Bétail/SanteBétail/PageSanté.jsx';
import HistoriqueProduction from './components/CoteClient/Bétail/Fiche/HistoriqueProduction/HistoriqueProduction.jsx';
import PageMouvement from './components/CoteClient/Bétail/Mouvement/PageMouvement.jsx';
import PageProductionLaitiere from './components/CoteClient/Bétail/ProductionLaitiere/PageProductionLaitiere.jsx';
import ListAgriculture from './components/CoteClient/Agriculture/Fiche/ListAgriculture.jsx';
import PageEquipement from './components/CoteClient/Agriculture/HistoriqueEquipement/PageEquipement.jsx';
import PageMainOeuvre from './components/CoteClient/Agriculture/HistoriqueMainOeuvre/PageMainOeuvre.jsx';
import PageIrrigation from './components/CoteClient/Agriculture/historiqueIrrigation/PageIrrigation.jsx';
import PageEngrais from './components/CoteClient/Agriculture/HistoriqueEngrais/PageEngrais.jsx';
import GestionStock from './components/CoteClient/Agriculture/GestionStocks/GestionStock.jsx';
import PageRecolte from './components/CoteClient/Agriculture/HistoriqueRecolte/PageRecolte.jsx';
import Meteo from './components/CoteClient/Meteo/Meteo.jsx';
import ConsulterAgriculteur from './components/CoteAdmin/pages/Agriculteurs/ConsulterAgriculteur.js';
import FactureRecolte from './components/CoteClient/Agriculture/HistoriqueRecolte/FactureRecolte.jsx';
import FactureStocks from './components/CoteClient/Agriculture/GestionStocks/FactureStocks.jsx';
import FactureProductionLaitiere from './components/CoteClient/Bétail/ProductionLaitiere/FactureProductionLaitiere.jsx';
import RapportProductivite from './components/CoteClient/Bétail/ProductionLaitiere/RapportProductivite.jsx';
import RapportSante from './components/CoteClient/Bétail/SanteBétail/RapportSante.jsx';
import PrevisionFinanciere from './components/CoteClient/Agriculture/Prévision/PrévisionFinanciére.jsx';
import PageAliment from './components/CoteClient/Bétail/Alimentation/PageAliment.jsx';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <UserProvider>
        <Routes>
        <Route element={<PrivateRoute allowedRoles={['Admin']} />}>
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/CategorieBetail" element={<CategorieBetail/>}></Route>
                <Route path="/admin/Betail" element={<Betail/>}></Route>
                <Route path="/admin/Methodestock" element={<MethodeStock />} />
                <Route path="/admin/MedicamentCulture" element={<Medicament />} />
                <Route path="/admin/Materiel" element={<Materiel />} />
                <Route path="/admin/Categories" element={<Categories />} />
                <Route path="/admin/Agricultures" element={<Agricultures />} />
                <Route path="/admin/Profile" element={<Profile />} />
                <Route path="/admin/ActiverCompte" element={<ActiverCompte />} />
                <Route path="/admin/ConsulterAgriculteur" element={<ConsulterAgriculteur/>}></Route>
         </Route>

            <Route element={<PrivateRoute allowedRoles={['Agriculteur']} />}>
                <Route path="/accueil" element={<PageAccueil />} />
                <Route path="/meteo" element={<Meteo/>} />
                <Route  path="/culture/:cultureId" component={InfoCulture} element={<InfoCulture />} />
                <Route  path="/betail/:betailId" component={InfoBetail} element={<InfoBetail />} />
                <Route path="/agriculteur/FicheAnimal" element={<ListAnimal/>}/>
                <Route path="/agriculteur/PageSante/:id" element={<PageSanté/>}></Route>
                <Route path="/agriculteur/HistoriqueProduction/:id" element={<HistoriqueProduction/>}></Route>
                <Route path="/agriculteur/PageAlimentation/:id" element={<PageAliment/>}></Route>
                <Route path="/agriculteur/PageMouvement/:id" element={<PageMouvement/>}></Route>
                <Route path="/agriculteur/PageProductionLaitiere/:id" element={<PageProductionLaitiere/>}></Route>
                <Route path="/profileAgriculteur" element={<ProfileAgriculteur />} />
                <Route path="/agriculteur/FicheAgriculture" element={<ListAgriculture/>}></Route>
                <Route path="/agriculteur/historique/Engrais/:id" element={<PageEngrais/>}></Route>
                <Route path="/agriculteur/historique/Equipement/:id" element={<PageEquipement/>}></Route>
                <Route path="/agriculteur/historique/MainOeuvre/:id" element={<PageMainOeuvre/>}></Route>
                <Route path="/agriculteur/historique/Irrigation/:id" element={<PageIrrigation/>}></Route>
                <Route path="/agriculteur/historique/Recolte/:id" element={<PageRecolte/>}></Route>
                <Route path="/agriculture/gestionStock" element={<GestionStock/>}></Route>
                <Route path="/agriculture/FactureRecolte/:id" element={<FactureRecolte/>}></Route>
                <Route path="/agriculture/FactureStocks/:id" element={<FactureStocks/>}></Route>
                <Route path="/Betail/FactureLaitiere/:idAgriculteur/:id/:month/:year" element={<FactureProductionLaitiere/>}></Route>
                <Route path="/Betail/RapportProductivite/:idAgriculteur/:id/:month/:year" element={<RapportProductivite/>}></Route>
                <Route path="/Betail/rapport-sante/:id" element={<RapportSante/>}></Route>
                <Route path='/prevision' element={<PrevisionFinanciere/>}></Route>

            </Route>
          
          <Route path="/" element={<App />} />

        
          </Routes>
      </UserProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
