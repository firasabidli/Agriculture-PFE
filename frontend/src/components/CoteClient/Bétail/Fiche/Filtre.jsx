import React from 'react';
import './ListAnimal.css'
//import $ from 'jquery';
const Filtre = () => {
  

  return (
          <div class="row text-left mb-5" style={{marginLeft:"14%"}}>
            <div class="col-lg-6 mb-3 mb-sm-0" style={{width:"30%"}}>
              <div class="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" >
              <select class="form-control form-control-lg bg-white bg-op-9 text-sm w-lg-50" data-toggle="select" tabindex="-98">
                <option> Categories </option>
                <option> Learn </option>
                <option> Share </option>
                <option> Build </option>
              </select>
              </div>
            </div>
            <div class="col-lg-6 text-lg-right" style={{width:"30%"}}>
              <div class="dropdown bootstrap-select form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50" >
                  <select class="form-control form-control-lg bg-white bg-op-9 ml-auto text-sm w-lg-50" data-toggle="select" tabindex="-98">
                    <option> Filter by </option>
                    <option> Race </option>
                    <option> Naissance </option>
                    <option> Views </option>
                  </select>
              </div>
            </div>
          </div>
       
   
  );
};

export default Filtre;
