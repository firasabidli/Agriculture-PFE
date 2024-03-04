import React from 'react'
import { BsGrid1X2Fill, BsListCheck, BsFillGearFill} from 'react-icons/bs'
 import { Link } from 'react-router-dom';
 import { MdAgriculture } from "react-icons/md";
 import { GiCow } from "react-icons/gi";
 import { GiFarmer } from "react-icons/gi";
 import { FaFileInvoiceDollar } from "react-icons/fa";
 import { GrClose } from "react-icons/gr";
 import logo from '../../assets/images/logo.png';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
             <Link to="/" >  <img className='logo' src={logo} alt="" /> </Link>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}><GrClose /></span>
        </div>

        <ul className='sidebar-list'>
        <Link to="/admin/dashboard" className='link'>
            <li className='sidebar-list-item'>
                
                    <BsGrid1X2Fill className='icon'/> Dashboard
                
            </li>
            </Link>
            <Link to="/admin/culture" className='link'>
            <li className='sidebar-list-item'>
                
                <MdAgriculture className='icon2'/> Culture
                
            </li>
            </Link>
            <Link to="/admin/betail" className='link'>
            <li className='sidebar-list-item'>
               
                    <GiCow className='icon2'/> Betail
                
            </li>
            </Link>
            <Link to="/admin/Agriculteurs" className='link'>
            <li className='sidebar-list-item'>
                
                <GiFarmer  className='icon2'/> Agriculteurs
                
            </li>
            </Link>
            <Link to="/admin/stock" className='link'>
            <li className='sidebar-list-item'>
                
                    <BsListCheck className='icon' style={{fontSize:'28px'}}/> Stock
                
            </li>
            </Link>
            <Link to="/admin/facture" className='link'>
            <li className='sidebar-list-item'>
                
                <FaFileInvoiceDollar  className='icon'/> Facture
                
            </li>
            </Link>
            <Link to="/admin/profile" className='link'>
            <li className='sidebar-list-item'>
                
                    <BsFillGearFill className='icon'/> Profile
                
            </li>
            </Link>
        </ul>
    </aside>
    
  )
}

export default Sidebar