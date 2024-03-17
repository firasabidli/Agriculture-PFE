import React from 'react';
import { Link } from 'react-router-dom';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { FcMoneyTransfer, FcSettings, FcCloseUpMode, FcTodoList } from 'react-icons/fc';
import { GiCow, GiFarmer } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import { FcAcceptDatabase,FcAddDatabase } from "react-icons/fc";
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
        <li className="mb-1">
            <div className='sidebar-list-item' >
            <div className="icon-square">
              <FcAcceptDatabase className='icon2' />
            </div><button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed title"
            data-bs-toggle="collapse" data-bs-target="#stock-collapse" aria-expanded="false">
            Stock
          </button>
            </div>
          
          <div className="collapse" id="stock-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <Link to="/admin/MethodeStock" className='link sidebar-list-item' >
                  <div className="icon-square-stock">
                    <FcTodoList className='icon' style={{ fontSize: '20px' }} />
                  </div>
                  <span className='title-stock'>Liste Stock</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/AjouterStock" className='link sidebar-list-item'>
                  <div className="icon-square-stock">
                    <FcAddDatabase className='icon' style={{ fontSize: '20px' }} />
                  </div>
                  <span className='title-stock'>Ajouter Stock</span>
                </Link>
              </li>
            </ul>
          </div>
        </li>
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
