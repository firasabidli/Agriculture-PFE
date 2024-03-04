import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import { Link } from 'react-router-dom';
 import { MdAgriculture } from "react-icons/md";
 import { GiCow } from "react-icons/gi";
 import { GiFarmer } from "react-icons/gi";
 import { FaFileInvoiceDollar } from "react-icons/fa";
 import { GrClose } from "react-icons/gr";
 import logo from '../../assets/CoteClient/images/logo.png';

function Sidebar({openSidebarToggle, OpenSidebar,children}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
             <Link to="/" >  <img className='logo' src={logo} alt="" /> </Link>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}><GrClose /></span>
        </div>

        <ul className='sidebar-list'>
        <Link to="/home">
            <li className='sidebar-list-item'>
                
                    <BsGrid1X2Fill className='icon'/> Dashboard
                
            </li>
            </Link>
            <li className='sidebar-list-item'>
                <Link to="/culture">
                <MdAgriculture className='icon2'/> Culture
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/betail">
                    <GiCow className='icon2'/> Betail
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/Agriculteurs">
                <GiFarmer  className='icon2'/> Agriculteurs
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/stock">
                    <BsListCheck className='icon' style={{fontSize:'28px'}}/> Stock
                </Link>
            </li>
           
            <li className='sidebar-list-item'>
                <Link to="/facture">
                <FaFileInvoiceDollar  className='icon'/> Facture
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/profile">
                    <BsFillGearFill className='icon'/> Profile
                </Link>
            </li>
        </ul>
    </aside>
    
  )
}

export default Sidebar