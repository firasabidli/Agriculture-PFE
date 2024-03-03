import React from 'react';
import  Navbar  from './Navbar.js';
import TypeSol from './TypeSol.js';
import HeaderCarousel from './HeaderCarousel.js';
const PageAccueil = () => {
    return (
    <div>
        <Navbar></Navbar>
        <HeaderCarousel></HeaderCarousel>
        <TypeSol></TypeSol>
     </div>
  );
};

export default PageAccueil;
