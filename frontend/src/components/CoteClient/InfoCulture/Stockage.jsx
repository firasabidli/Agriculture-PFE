import React from 'react';
const Stockage = ({ cultureData }) => {
    if (!cultureData || !cultureData.MethodesStock || cultureData.MethodesStock.length === 0) {
        return <p>Aucune donnée à afficher.</p>
      }
    
      const methodesStock = cultureData.MethodesStock;
    return (
        <div style={{marginLeft:"5%",marginTop:"2%"}} >
            <div>
                <h2 class="blog-post-title mb-4">Techniques de gestion des stocks agriculture</h2>
                <p>améliorez l'efficacité de votre exploitation agricole en mettant en œuvre des techniques de gestion des stocks optimisées. Réduisez les gaspillages, assurez-vous d'une disponibilité constante des fournitures essentielles et maximisez votre rentabilité grâce à une gestion proactive des stocks.</p>
            </div>

            <div class="row mb-2" style={{marginRight:"auto",marginLeft:"auto"}}>
              {methodesStock.map((methode, index) => (
                <div class="col-md-6" key={index}>
                  <div class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative" style={{width:'90%'}}>
                    <div class="col p-4 d-flex flex-column position-static">
                      <strong class="d-inline-block mb-2 text-primary"></strong>
                      <h3 class="mb-0">{methode.title}</h3>
                      <div class="mb-1 text-muted"></div>
                      <p class="card-text mb-auto">{methode.description}</p>
                      {/* <a href="/" class="stretched-link"></a> */}
                    </div>
                    <div class="col-auto d-none d-lg-block">
                      {/* <svg class="bd-placeholder-img" width="200" height="250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg> */}
                      <img src={methode.image_MethodStock} alt=''class="bd-placeholder-img" width="200" height="200"/>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      );
}
export default Stockage;