import React from 'react';
const Medicament = ({ cultureData }) => {
  if (!cultureData || !cultureData.MedicamentsCulture|| cultureData.MedicamentsCulture.length === 0) {
    return <p>Aucune donnée à afficher.</p>
  }
  const MedicamentsCulture = cultureData.MedicamentsCulture;
    return(
        <div>
          <div class="p-4">
            <h3 class="fs-italic mb-4" style={{color:"black"}}>Articles de soins pour les végétaux et substances nourrissantes</h3>
            <p className='mb-0'>Produits de santé et nutrition pour les plantes, favorisant leur croissance et leur vitalité.</p>
              <div class="list-group w-auto">
                {MedicamentsCulture.map((medicament, index) => (
                  <div key={index} class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
                    <img src={medicament.image} alt="twbs" width="65" height="65" class="rounded-circle flex-shrink-0"/>
                    <div class="d-flex gap-2 w-100 justify-content-between">
                      <div>
                        <h6 class="mb-0">{medicament.nomMedicament}</h6>
                        <p class="mb-0 opacity-75">{medicament.description}</p>
                      </div>
                      <small class="opacity-50 text-nowrap">1 ans</small>
                    </div>
                  </div>
                  ))}
            </div>

        </div>
        </div>
    );

}
export default Medicament;