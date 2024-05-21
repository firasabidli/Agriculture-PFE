import React from 'react';
const Medicament = ({ cultureData }) => {
  if (!cultureData || !cultureData.MedicamentsCulture|| cultureData.MedicamentsCulture.length === 0) {
    return <p>Aucune donnée à afficher.</p>
  }
  const MedicamentsCulture = cultureData.MedicamentsCulture;
    return(
      <article class="blog-post" style={{marginLeft:"5%"}}>
          <div>
            <h2 class="blog-post-title mb-4" >Articles de soins pour les végétaux et substances nourrissantes</h2>
            <p>Produits de santé et nutrition pour les plantes, favorisant leur croissance et leur vitalité.</p>
            </div>
            <div class="row row-cols-1 row-cols-md-3 g-4" style={{marginRight:'2%'}}>
                {MedicamentsCulture.map((medicament, index) => (
                 <div key={index} class="col">
                  <div class="card h-100">
                  <div class="card-body">
                        <h5 class="card-title text-center"><img src={medicament.image} alt="..." class="card-img-top" /> </h5>
                        <h6 class="card-title">{medicament.nomMedicament}</h6>
                        <p class="card-text">{medicament.description}</p>
                      </div>
                      
                    </div>
                  </div>
                  ))}
            </div>

        
        </article>
    );

}
export default Medicament;