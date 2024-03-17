import React from 'react';
import { Link } from 'react-router-dom';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { FcMoneyTransfer, FcSettings, FcCloseUpMode} from 'react-icons/fc';
import { GiCow, GiFarmer } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { FcAcceptDatabase } from "react-icons/fc";
import logo from '../../assets/images/logo.jpg';
import './Dashboard.css';

function Sidebar({ openSidebarToggle, setOpenSidebar }) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <Link to="/">
            <img className='logo' src={logo} alt="" />
          </Link>
        </div>
        <div className="close-button-small-screen">
          <span className='icon close_icon' onClick={() => setOpenSidebar(false)}>
            <GrClose />
          </span>
        </div>
      </div>
      <ul className='sidebar-list list-unstyled ps-0'>
        <Link to="/" className='link'>
          <li className='sidebar-list-item'>
            <div className="icon-square bg-blue">
              <BsGrid1X2Fill className='icon icon-blue' />
            </div>
            <span className='title'>Dashboard</span>
          </li>
        </Link>
        <Link to="/" className='link'>
          <li className='sidebar-list-item'>
            <div className="icon-square">
              <FcCloseUpMode className='icon2' />
            </div>
            <span className='title'>Culture</span>
          </li>
        </Link>
        <Link to="/" className='link'>
          <li className='sidebar-list-item'>
            <div className="icon-square">
              <GiCow className='icon2' />
            </div>
            <span className='title'>Bétail</span>
          </li>
        </Link>
        <Link to="/" className='link'>
          <li className='sidebar-list-item'>
            <div className="icon-square">
              <GiFarmer className='icon2' />
            </div>
            <span className='title'>Agriculteurs</span>
          </li>
        </Link>

        <Link to="/admin/MethodeStock" className='link'>
          <li className='sidebar-list-item'>
            <div className="icon-square">
              <FcAcceptDatabase className='icon' />
            </div>
            <span className='title'>Methode de Stock</span>
          </li>
        </Link>
        <Link to="/" className='link'>
          <li className='sidebar-list-item'>
            <div className="icon-square">
              <FcMoneyTransfer className='icon' />
            </div>
            <span className='title'>Facture</span>
          </li>
        </Link>
        <Link to="/" className='link'>
          <li className='sidebar-list-item'>
            <div className="icon-square">
              <FcSettings className='icon' />
            </div>
            <span className='title'>Profil</span>
          </li>
        </Link>
      </ul>
    </aside>
  );
}

export default Sidebar;
