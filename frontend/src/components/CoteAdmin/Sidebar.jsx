import React from 'react';
import './sidebar.css';

import { Link } from 'react-router-dom';
import {  FcCloseUpMode} from 'react-icons/fc';
import { GiCow, GiFarmer } from 'react-icons/gi';


import { GiWheat } from "react-icons/gi";
import { AiOutlineDashboard } from "react-icons/ai";
import { SiDatabricks } from "react-icons/si";
import { FaBuildingWheat } from "react-icons/fa6";
import { MdAgriculture } from "react-icons/md";
import { FaFileInvoiceDollar } from "react-icons/fa";
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
            <a href="#" className={`sidebar-link ${isActive  ? ' ' : 'collapsed'}`} data-bs-toggle="collapse" data-bs-target="#pages"
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
                <Link to="/admin/Materiel" className={`sidebar-link ${page==="Materiel" ? 'item-active' : ''}`}><span className="icon "><MdAgriculture /></span>{ " "}Materiel </Link>
                </li>
                <li className="sidebar-item">
                <Link to="/admin/MedicamentCulture" className={`sidebar-link ${page==="Medicament" ? 'item-active' : ''}`}><span ><img src={engrais} alt="" className="icon-img"/></span>Engrais agricoles </Link>
                </li>
            </ul>
        </li>
        <li className="sidebar-item">
        <Link to="/" className="sidebar-link">
           <span className="icon"> <GiCow /></span>
                betail
                </Link>
        </li>
        <li className="sidebar-item">
        <Link to="/" className="sidebar-link">
           <span className="icon"> <GiFarmer/></span>
            Agriculteurs
            </Link>
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

