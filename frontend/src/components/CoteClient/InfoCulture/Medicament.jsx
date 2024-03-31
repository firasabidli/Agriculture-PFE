import React from 'react';
const Medicament = ({ cultureData }) => {
  if (!cultureData || !cultureData.MedicamentsCulture|| cultureData.MedicamentsCulture.length === 0) {
    return null; 
  }
  const MedicamentsCulture = cultureData.MedicamentsCulture;
    return(
        <div>
            {/* <div>
            <h1 className='title-stock'>Medicment</h1>
            </div> */}
 <div class="px-4 py-5" id="featured-3">
 <h1 className='title-stock'>Medicment</h1>
<div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
{MedicamentsCulture.map((medicament, index) => (
  <div key={index} class="feature col">
    <div class="feature-icon d-inline-flex align-items-center justify-content-left bg-gradient fs-2 mb-3">
      <img src={medicament.image} alt='...' style={{width:'40%'}} />
    </div>
    <h3 class="fs-2">{medicament.nomMedicament}</h3>
    <p>{medicament.description}</p>
  </div>
))}
</div>
</div>
        </div>
    );

}
export default Medicament;