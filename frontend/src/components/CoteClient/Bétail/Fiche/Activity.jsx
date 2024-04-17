import React from 'react';
import './ListAnimal.css'

const Activity = ({ animaux }) => {
  let countVaches = 0;
  let countMoutons = 0;
  let countChevres = 0;
  let countVolailles = 0;
  let countTaureau =0;
  let countDinde=0;

  // Parcourir les animaux pour compter chaque espèce
  animaux.forEach((animal) => {
    switch (animal.subCategorieBetail) {
      case 'Vache':
        countVaches++;
        break;
      case 'Mouton':
        countMoutons++;
        break;
      case 'chévre':
        countChevres++;
        break;
      case 'Poulet':
        countVolailles++;
        break;
        case 'Dinde':
          countDinde++;
          break;
      case 'Taureau':
        countTaureau++;
        break;
      default:
        break;
    }
  });
  return (
    <div>
            <div class="bg-white mb-3">
              <h4 class="px-3 py-4 op-5 m-0">
                Active Topics
              </h4>
              <hr class="m-0"/>
              <div class="pos-relative px-3 py-3">
                <h6 class="text-primary">
                  <a href="x" class="text-primary filter-text">Alimentation et Abreuvement </a>
                </h6>
                <p class="mb-0 filter-text">Donner à manger et à boire aux animaux.</p>
              </div>
              <hr class="m-0"/>
              <div class="pos-relative px-3 py-3">
                <h6 class="text-primary filter-text">
                  <a href="x" class="text-primary">Soins de Santé</a>
                </h6>
                <p class="mb-0 filter-text">Contrôler la santé des animaux.</p>
                <p class="mb-0 filter-text">Assurer la vaccination régulière et le suivi médical.</p>
              </div>
              <hr class="m-0"/>
              <div class="pos-relative px-3 py-3">
                <h6 class="text-primary filter-text">
                  <a href="x" class="text-primary">Gestion de la Production </a>
                </h6>
                <p class="mb-0 filter-text">Surveiller la croissance et le développement des animaux.</p>
                <p class="mb-0 filter-text">Planifier la vente des animaux adultes ou des produits dérivés (viande, lait, œufs, etc.).</p>
              </div>
              <hr class="m-0"/>
            </div>
            <div class="bg-white text-sm">
              <h4 class="px-3 py-4 op-5 m-0 roboto-bold">
                Stats
              </h4>
              <hr class="my-0"/>
             
              <div class="row text-center d-flex flex-row op-7 mx-0">
                <div class="col-sm-6 flex-ew text-center py-3 border-bottom border-right"> <a class="d-block lead font-weight-bold" href="x">{countVaches}</a> Vaches </div>
                <div class="col-sm-6 col flex-ew text-center py-3 border-bottom mx-0"> <a class="d-block lead font-weight-bold" href="x">{countTaureau}</a> Taureau </div>
              </div>
              <div class="row d-flex flex-row op-7">
               <div class="col-sm-6 flex-ew text-center py-3 border-right mx-0"> <a class="d-block lead font-weight-bold" href="x">{countChevres}</a> chévre </div>
               <div class="col-sm-6 flex-ew text-center py-3 mx-0"> <a class="d-block lead font-weight-bold" href="x">{countMoutons}</a> Moutons </div>
               </div>
               <div class="row d-flex flex-row op-7">
               <div class="col-sm-6 flex-ew text-center py-3 border-right mx-0"> <a class="d-block lead font-weight-bold" href="x">{countVolailles}</a> Poulet </div>
               <div class="col-sm-6 flex-ew text-center py-3 mx-0"> <a class="d-block lead font-weight-bold" href="x">{countDinde}</a> Dinde </div>
               </div>
            </div>
         </div>
        
  );
};

export default Activity;
