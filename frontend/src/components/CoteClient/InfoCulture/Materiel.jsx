import React from 'react';
//import pommeTerre from '../../../assets/CoteClient/images/pommes-de-terre.png';
const Materiel = ({ cultureData }) => {
    if (!cultureData || !cultureData.materiels|| cultureData.materiels.length === 0) {
        return null; 
      }
      const materiels = cultureData.materiels;
    return(
        <div>
            <div>
                <h1 className='title-stock'>Materiel</h1>
            </div>
            {/* card */}
            <div class="row row-cols-1 row-cols-md-3 g-4" style={{marginLeft:'2%',marginRight:'2%'}}>
            {materiels.map((materiel, index) => (
                <div key={index} class="col">
                    <div class="card h-100 card-hover">
                    <div class="card-body">
                        <h5 class="card-title"><img src={materiel.image_materiel} class="card-img-top" alt="..."/></h5>
                        <h6 class="card-text">{materiel.nom}</h6>
                        <p class="card-text">{materiel.description}</p>
                    </div>
                    </div>
                </div>
            ))}
  </div>

  </div>
    );
}
export default Materiel;