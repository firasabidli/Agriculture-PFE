import React from 'react';
//import pommeTerre from '../../../assets/CoteClient/images/pommes-de-terre.png';
const Materiel = ({ cultureData }) => {
    if (!cultureData || !cultureData.materiels|| cultureData.materiels.length === 0) {
        return <p>Aucune donnée à afficher.</p>
      }
      const materiels = cultureData.materiels;
    return(
        <article class="blog-post" style={{marginLeft:"5%"}}>
            <div>
                <h2 class="blog-post-title mb-4">Équipements pour l'agriculture</h2>
                <p>Les équipements pour l'agriculture facilitent les tâches quotidiennes des agriculteurs, augmentant ainsi leur efficacité et leur productivité sur le terrain.</p>
            </div>
            {/* card */}
            <div class="row row-cols-1 row-cols-md-3 g-4" style={{marginRight:'2%'}}>
            {materiels.map((materiel, index) => (
                <div key={index} class="col">
                    <div class="card h-100 card-hover">
                    <div class="card-body">
                        <h5 class="card-title"><img src={materiel.image_materiel} class="card-img-top" alt="..."/></h5>
                        <h6 class="card-title">{materiel.nom}</h6>
                        <p class="card-text">{materiel.description}</p>
                    </div>
                    </div>
                </div>
            ))}
  </div>

  </article>
    );
}
export default Materiel;