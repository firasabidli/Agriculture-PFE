import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { Link } from 'react-router-dom';
import {  FcCloseUpMode} from 'react-icons/fc';
import { GiCow, GiFarmer } from 'react-icons/gi';
import { BsPersonCheck } from "react-icons/bs";
import { BsPersonFillGear } from "react-icons/bs";
import { GiWheat } from "react-icons/gi";
import { AiOutlineDashboard } from "react-icons/ai";
import { SiDatabricks } from "react-icons/si";
import { FaBuildingWheat } from "react-icons/fa6";
import { MdAgriculture } from "react-icons/md";
import { SiHappycow } from "react-icons/si";
import logo from '../../assets/images/logo.jpg';
import engrais from '../../assets/images/Engrais.png';
const Sidebar = ({ isSidebarCollapsed, page }) => {
    const [agricultureOpen, setAgricultureOpen] = useState(false);
    const [betailOpen, setBetailOpen] = useState(false);
    const [agriculteursOpen, setAgriculteursOpen] = useState(false);

    useEffect(() => {
        // Mettre à jour l'état pour ouvrir la section correspondante selon la page active
        if (page === "Agricultures" || page === "Categories" || page === "Stock" || page === "Materiel" || page === "Medicament") {
            setAgricultureOpen(true);
        } else if (page === "CategoriesBetail" || page === "Betail") {
            setBetailOpen(true);
        } else if (page === "ActiverCompte" || page === "GererAgriculteurs") {
            setAgriculteursOpen(true);
        }
    }, [page]);

   
    return (
        <aside id="sidebar" className={`bg-white ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="h-100">
                <div className="sidebar-logo">
                    <Link to="/admin/dashboard">
                        <img src={logo} alt="" />
                    </Link>
                </div>
                <ul className="sidebar-nav">
                    <li className="sidebar-item">
                        <Link to="/admin/dashboard" className={`sidebar-link ${page==="Home" ? 'item-active' : ''}`}>
                            <span className="icon"><AiOutlineDashboard /></span>
                            Dashboard
                        </Link>
                    </li>
                    <li className="sidebar-item">
                        <Link
                           
                            className={`sidebar-link ${agricultureOpen ? '' : 'collapsed'}`}
                            onClick={() => setAgricultureOpen(!agricultureOpen)}
                            aria-expanded={agricultureOpen ? 'true' : 'false'}
                            data-bs-toggle="collapse"
                            data-bs-target="#agriculture-collapse"
                        >
                            <span className="icon"><FcCloseUpMode/></span>Agriculture
                        </Link>
                        <ul
                            id="agriculture-collapse"
                            className={`sidebar-dropdown list-unstyled collapse ${agricultureOpen ? 'show' : ''}`}
                            data-bs-parent="#sidebar"
                        >
                          <li className="sidebar-item ">
                            <Link to="/admin/Agricultures" className={`sidebar-link ${page==="Agricultures" ? 'item-active' : ''}`}><span className="icon"><GiWheat /></span>{ " "}Agriculture </Link>
                            </li>
                            <li className="sidebar-item">
                            <Link to="/admin/Categories" className={`sidebar-link ${page==="Categories" ? 'item-active' : ''}`}><span className="icon"><SiDatabricks /></span>{ " "}Categories </Link>
                            </li>
                            <li className="sidebar-item">
                            <Link to="/admin/MethodeStock" className={`sidebar-link ${page==="Stock" ? 'item-active' : ''}`}><span className="icon"><FaBuildingWheat /></span>{ " "}gestion des Methode de stockage </Link>
                            </li>
                            <li className="sidebar-item">
                            <Link to="/admin/Materiel" className={`sidebar-link ${page==="Materiel" ? 'item-active' : ''}`}><span className="icon "><MdAgriculture /></span>{ " "}Equipement </Link>
                            </li>
                            <li className="sidebar-item">
                            <Link to="/admin/MedicamentCulture" className={`sidebar-link ${page==="Medicament" ? 'item-active' : ''}`}><span ><img src={engrais} alt="" className="icon-img"/></span>Engrais agricoles </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <Link
                            
                            className={`sidebar-link ${betailOpen ? '' : 'collapsed'}`}
                            onClick={() => setBetailOpen(!betailOpen)}
                            aria-expanded={betailOpen ? 'true' : 'false'}
                            data-bs-toggle="collapse"
                            data-bs-target="#betails-collapse"
                        >
                            <span className="icon"><GiCow/></span>Bétail
                        </Link>
                        <ul
                            id="betails-collapse"
                            className={`sidebar-dropdown list-unstyled collapse ${betailOpen ? 'show' : ''}`}
                            data-bs-parent="#sidebar"
                        >
                             <li className="sidebar-item">
                            <Link to="/admin/CategorieBetail" className={`sidebar-link ${page==="CategoriesBetail" ? 'item-active' : ''}`}><span className="icon"><SiDatabricks /></span>{ " "}Categorie </Link>
                            </li>

                            <li className="sidebar-item">
                            <Link to="/admin/Betail" className={`sidebar-link ${page==="Betail" ? 'item-active' : ''}`}><span className="icon"><SiHappycow /></span>{ " "}Betail </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="sidebar-item">
                        <Link
                          
                            className={`sidebar-link ${agriculteursOpen ? '' : 'collapsed'}`}
                            onClick={() => setAgriculteursOpen(!agriculteursOpen)}
                            aria-expanded={agriculteursOpen ? 'true' : 'false'}
                            data-bs-toggle="collapse"
                            data-bs-target="#agriculteurs-collapse"
                        >
                            <span className="icon"><GiFarmer/></span>Agriculteurs
                        </Link>
                        <ul
                            id="agriculteurs-collapse"
                            className={`sidebar-dropdown list-unstyled collapse ${agriculteursOpen ? 'show' : ''}`}
                            data-bs-parent="#sidebar"
                        >
                           <li className="sidebar-item ">
                            <Link to="/admin/ActiverCompte" className={`sidebar-link ${page==="ActiverCompte" ? 'item-active' : ''}`}><span className="icon"><BsPersonCheck /></span>{ " "}Activer Compte </Link>
                            </li>
                            <li className="sidebar-item">
                            <Link to="/admin/ConsulterAgriculteur" className={`sidebar-link ${page==="GererAgriculteurs" ? 'item-active' : ''}`}><span className="icon"><BsPersonFillGear /></span>{ " "}Gerer Agriculteurs </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </aside>
    );
};

export default Sidebar;


