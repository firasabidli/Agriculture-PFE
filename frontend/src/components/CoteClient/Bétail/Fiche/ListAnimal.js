import React, { useEffect, useRef, useState } from 'react';
import './ListAnimal.css'
import { AccordionButton, Dropdown } from 'react-bootstrap';
import Navbar from '../../Navbar';
import CarouselBetail from './CarouselBetail.jsx';
import Filtre from './Filtre.jsx';
import Activity from './Activity.jsx';
//import $ from 'jquery';
const ListAnimal = () => {


  return (
    <div>
<Navbar textColor="black" />
<CarouselBetail></CarouselBetail>
    <div class="containerList" style={{marginTop:"3%"}}>
      <div class="row">
      
    {/* <!-- Main content --> */}
        <div class="col-lg-9 mb-3">
          <Filtre/>
          
          {/* <!-- Main content --> */}
    <div className="page-content page-container" id="page-content">
      <div className="padding">
        <div className="row" style={{marginLeft:"-15%"}}>
          <div className="col-sm-8">
            <div className="container-fluid d-flex justify-content-center">
              <div className="list list-row card" style={{width:"75%"}}>
                  <div className="list-item"  data-id="">
                    <div><a href="x"><span className="w-40 avatar gd-primary">A</span></a></div>
                    <div className="flex">
                      <a href="x" className="item-author text-color">Num:</a>
                      <div className="item-except text-muted text-sm h-1x">Date de Naissanc</div>
                    </div>
                    <div className="no-wrap">
                      <div className="item-date text-muted text-sm d-none d-md-block"></div>
                      </div>
                      <div>
         <Dropdown align="end">
          <Dropdown.Toggle variant="link" id="dropdown-basic">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-more-vertical"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg> */}
          
          <Dropdown.Menu>
            <Dropdown.Item href="x">Suivi Sante</Dropdown.Item>
            <Dropdown.Item href="x">Suivi Mouvement</Dropdown.Item>
            <Dropdown.Item href="x">Edit</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="x" className="text-danger">
              Delete item
            </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown.Toggle>
        </Dropdown>
      </div>
                    
                  </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    {/*  */}
    {/* <!-- Sidebar content --> */}
        <div class="col-lg-3 mb-4 mb-lg-0 px-lg-0 mt-lg-0" style={{marginLeft:"-3%"}}>
          <Activity/>
    </div>
    {/*  */}
    </div>
    </div>
    </div>
  );
};

export default ListAnimal;
