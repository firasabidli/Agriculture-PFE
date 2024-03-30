import React from 'react';
//import pommeTerre from '../../../assets/CoteClient/images/pommes-de-terre.png';
const Materiel = () => {
    return(
        <div>
            <div>
                <h1 className='title-stock'>Materiel</h1>
            </div>
            {/* card */}
            <div class="row row-cols-1 row-cols-md-3 g-4" style={{marginLeft:'2%',marginRight:'2%'}}>
                <div class="col">
                    <div class="card h-100 card-hover">
                    <div class="card-body">
                        <h5 class="card-title"><img src="..." class="card-img-top" alt="..."/></h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="..." class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a short card.</p>
                    </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card h-100">
                    <img src="..." class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a short card.</p>
                    </div>
                    </div>
                </div>
  </div>

  </div>
    );
}
export default Materiel;