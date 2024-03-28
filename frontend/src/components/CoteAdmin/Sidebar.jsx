import React from 'react';
import { Link } from 'react-router-dom';
import { BsGrid1X2Fill } from 'react-icons/bs';
import { FcMoneyTransfer, FcSettings, FcCloseUpMode,FcMindMap} from 'react-icons/fc';
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
          <img className='logo-Admin' src={logo} alt="" />
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
      {/* <Link to="/" className='link'>
        <li className='sidebar-list-item'>
          <div className="icon-square">
            <FcCloseUpMode className='icon2' />
          </div>
          <span className='title'>Culture</span>
        </li>
      </Link> */}
      <li className="mb-1">
          <div className='sidebar-list-item' >
          <div className="icon-square">
            <FcCloseUpMode className='icon2' />
          </div><button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed title"
          data-bs-toggle="collapse" data-bs-target="#stock-collapse" aria-expanded="false">
          <span className='title' style={{ fontSize:'120%' }}>Agriculture</span>
        </button>
          </div>
        
        <div className="collapse" id="stock-collapse">
          <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
          <li>
              <Link to="/admin/Agricultures" className='link sidebar-list-item' >
                <div className="icon-square-stock">
                  <FcAcceptDatabase className='icon' style={{ fontSize: '30px' }} />
                </div>
                <span className='title-stock'> Agricultures</span>
              </Link>
            </li>
          <li>
              <Link to="/admin/Categories" className='link sidebar-list-item' >
                <div className="icon-square-stock">
                  <FcAcceptDatabase className='icon' style={{ fontSize: '30px' }} />
                </div>
                <span className='title-stock'>Categoris Agriculture</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/MethodeStock" className='link sidebar-list-item' >
                <div className="icon-square-stock">
                  <FcAcceptDatabase className='icon' style={{ fontSize: '30px' }} />
                </div>
                <span className='title-stock'>Methode de Stock</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/Materiel" className='link sidebar-list-item' >
                <div className="icon-square-stock">
                  <FcAcceptDatabase className='icon' style={{ fontSize: '30px' }} />
                </div>
                <span className='title-stock'>Materiel Agriculture</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/MedicamentCulture" className='link sidebar-list-item'>
                <div className="icon-square-stock">
                  <FcMindMap className='icon' style={{ fontSize: '30px' }} />
                </div>
                <span className='title-stock'>Médicament Agriculture</span>
              </Link>
            </li>
          </ul>
        </div>
      </li>
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
