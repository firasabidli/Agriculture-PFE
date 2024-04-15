import React from 'react';
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
import { FaFileInvoiceDollar } from "react-icons/fa";
import { SiHappycow } from "react-icons/si";
import logo from '../../assets/images/logo.jpg';
import engrais from '../../assets/images/Engrais.png';
const Sidebar = ({ isSidebarCollapsed, page, isActive }) => {
    return (
        <aside id="sidebar" className={`bg-white ${isSidebarCollapsed ? 'collapsed' : ''}`}>
         
            <div className="h-100">
                <div className="sidebar-logo">
                <Link to="/">
                   <img src={logo} alt="" />
                   </Link>
                </div>
                <ul className="sidebar-nav">
        
        <li className="sidebar-item">
        <Link to="/" className={`sidebar-link ${page==="Home" ? 'item-active' : ''}`}>
            <span className="icon"><AiOutlineDashboard /></span>
                Dashboard
                </Link>
        </li>
        <li className="sidebar-item">
            <a href="x" className={`sidebar-link ${isActive  ? ' ' : 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#pages"
                aria-expanded="false" aria-controls="pages">
               <span className="icon"><FcCloseUpMode/></span>Agriculture
            </a>
            <ul id="pages" className={`sidebar-dropdown list-unstyled collapse ${isActive ? 'show ' : ''}`} data-bs-parent="#sidebar">
                <li className="sidebar-item ">
                <Link to="/admin/Agricultures" className={`sidebar-link ${page==="Agriculture" ? 'item-active' : ''}`}><span className="icon"><GiWheat /></span>{ " "}Cultures </Link>
                </li>
                <li className="sidebar-item">
                <Link to="/admin/Categories" className={`sidebar-link ${page==="Categories" ? 'item-active' : ''}`}><span className="icon"><SiDatabricks /></span>{ " "}Categories </Link>
                </li>
                <li className="sidebar-item">
                <Link to="/admin/MethodeStock" className={`sidebar-link ${page==="Stock" ? 'item-active' : ''}`}><span className="icon"><FaBuildingWheat /></span>{ " "}gestion des stocks </Link>
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
        <a href="x" className={`sidebar-link ${isActive  ? ' ' : 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#pages"
                aria-expanded="false" aria-controls="pages">
               <span className="icon"><GiCow/></span>Bétail
            </a>
            <ul id="pages" className={`sidebar-dropdown list-unstyled collapse ${isActive ? 'show ' : ''}`} data-bs-parent="#sidebar">
                <li className="sidebar-item">
                <Link to="/admin/CategorieBetail" className={`sidebar-link ${page==="CategoriesBetail" ? 'item-active' : ''}`}><span className="icon"><SiDatabricks /></span>{ " "}Categorie </Link>
                </li>

                <li className="sidebar-item">
                <Link to="/admin/Betail" className={`sidebar-link ${page==="Betail" ? 'item-active' : ''}`}><span className="icon"><SiHappycow /></span>{ " "}Betail </Link>
                </li>
            </ul>
        </li>

        <li className="sidebar-item">
            <a href="y" className={`sidebar-link ${isActive  ? ' ' : 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#pages"
                aria-expanded="false" aria-controls="pages">
               <span className="icon"> <GiFarmer/></span>
            Agriculteurs
            </a>
            <ul id="pages" className={`sidebar-dropdown list-unstyled collapse ${isActive ? 'show ' : ''}`} data-bs-parent="#sidebar">
                <li className="sidebar-item ">
                <Link to="/admin/ActiverCompte" className={`sidebar-link ${page==="ActiverCompte" ? 'item-active' : ''}`}><span className="icon"><BsPersonCheck /></span>{ " "}Activer Compte </Link>
                </li>
                <li className="sidebar-item">
                <Link to="/" className={`sidebar-link ${page==="GererAgriculteurs" ? 'item-active' : ''}`}><span className="icon"><BsPersonFillGear /></span>{ " "}Gerer Agriculteurs </Link>
                </li>
                
            </ul>
        </li>
       
        <li className="sidebar-item">
        <Link to="/" className="sidebar-link">
           <span className="icon"> <FaFileInvoiceDollar /></span>
            Facture
            </Link>
        </li>
       
        
    </ul>
            </div>
        </aside>
    );
};

export default Sidebar;

