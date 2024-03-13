import React from 'react';
//import { FaHome } from 'react-icons/fa';
import { BsGrid1X2Fill} from 'react-icons/bs';
import { FcMoneyTransfer, FcSettings, FcCloseUpMode} from "react-icons/fc";
import { FcTodoList } from "react-icons/fc";
  import { Link } from 'react-router-dom';
//  import { MdAgriculture } from "react-icons/md";
 import { GiCow } from "react-icons/gi";
 import { GiFarmer } from "react-icons/gi";
//  import {FaFileInvoiceDollar } from "react-icons/fc";
 import { GrClose } from "react-icons/gr";
 import logo from '../../assets/images/logo.jpg';
 import './Dashboard.css';
function Sidebar ({openSidebarToggle, OpenSidebar}) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                 <Link to="/" >  <img src={logo} alt="" className='logo' style={{ width: '100%' }}/> </Link>
                </div>
                <div className="close-button-small-screen">
                <span className='icon close_icon' onClick={OpenSidebar}><GrClose /></span>
            </div>
            </div>
                <ul className='sidebar-list'>
                    <Link to="/" className='link'>
                        <li className='sidebar-list-item'>
                            <div className="icon-square bg-blue">
                                <BsGrid1X2Fill className='icon icon-blue'/> 
                            </div>
                            <span className='title'>Dashboard</span>
                        </li>
                    </Link>
                    <Link to="/" className='link'>
                        <li className='sidebar-list-item'>
                            <div className="icon-square">
                                <FcCloseUpMode className='icon2'/> 
                            </div>
                            <span className='title'>Culture</span>
                        </li>
                    </Link>
                    <Link to="/" className='link'>
                        <li className='sidebar-list-item'>
                            <div className="icon-square">
                                <GiCow className='icon2'/> 
                            </div>
                            <span className='title'>Bétail</span>
                        </li>
                    </Link>
                    <Link to="/" className='link'>
                        <li className='sidebar-list-item'>
                            <div className="icon-square">
                                <GiFarmer className='icon2'/> 
                            </div>
                            <span className='title'>Agriculteurs</span>
                        </li>
                    </Link>
                    <Link to="/" className='link'>
                        <li className='sidebar-list-item'>
                            <div className="icon-square">
                                <FcTodoList className='icon' style={{fontSize:'28px'}}/> 
                            </div>
                            <span className='title'>Stock</span>
                        </li>
                    </Link>
                    <Link to="/" className='link'>
                        <li className='sidebar-list-item'>
                            <div className="icon-square">
                                <FcMoneyTransfer className='icon'/> 
                            </div>
                            <span className='title'>Facture</span>
                        </li>
                    </Link>
                    <Link to="/" className='link'>
                        <li className='sidebar-list-item'>
                            <div className="icon-square">
                                <FcSettings className='icon'/>
                            </div>
                            <span className='title'>Profil</span>
                        </li>
                    </Link>
                </ul>

        </aside>
        
      )
    }
export default Sidebar;
