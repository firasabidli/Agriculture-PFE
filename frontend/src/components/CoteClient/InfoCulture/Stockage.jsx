import React from 'react';
const Stockage = ({ cultureData }) => {
    if (!cultureData || !cultureData.MethodesStock || cultureData.MethodesStock.length === 0) {
        return <p>Aucune donnée à afficher.</p>
      }
    
      const methodesStock = cultureData.MethodesStock;
    return (
      <article class="blog-post" style={{marginLeft:"5%"}}>
            <div>
                <h2 class="blog-post-title mb-4">Techniques de gestion des stocks agriculture</h2>
                <p>améliorez l'efficacité de votre exploitation agricole en mettant en œuvre des techniques de gestion des stocks optimisées. Réduisez les gaspillages, assurez-vous d'une disponibilité constante des fournitures essentielles et maximisez votre rentabilité grâce à une gestion proactive des stocks.</p>
            </div>

            <div class="row row-cols-1 row-cols-md-3 g-4" style={{marginRight:'2%'}}>
              {methodesStock.map((methode, index) => (

          <div key={index} class="col">
          <div class="card h-100 ">
          <div class="card-body">
              <h5 class="card-title text-center"><img src={methode.image_MethodStock} alt=''class="card-img-top" /></h5>
              <h6 class="card-title">{methode.title}</h6>
              <p class="card-text">{methode.description}</p>
              </div>
              </div>
              </div>
                
              ))}
          </div>
        </article>
      );
}
export default Stockage;