import React from 'react';
const Stockage = ({ cultureData }) => {
    if (!cultureData || !cultureData.MethodesStock || cultureData.MethodesStock.length === 0) {
        return null; // Retourne null si la donnée cultureData ou la propriété MethodesStock est undefined ou vide
      }
    
      const methodesStock = cultureData.MethodesStock;
    return (
        <div>
            <div>
                <h1 className='title-stock'>Methode de stock</h1>
            </div>
            <div>
            <div>
  {methodesStock.map((methode, index) => (
    <div key={index} className={`row featurette cader-featurette${index % 2 === 0 ? '' : ' flex-md-row-reverse'}`} style={{marginLeft:'auto',marginRight:'auto'}}>
      <div className="col-md-7">
        <h2 className="featurette-heading fw-normal lh-1 title-stock">{methode.title}</h2>
        <p className="lead title-stock">{methode.description}</p>
      </div>
      <div className="col-md-5">
        <img src={methode.image_MethodStock} alt='' className={`image-featurette bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid${index % 2 === 1 ? '' : ' image-left'}`}/>
      </div>
    </div>
  ))}
</div>

                {/* // <div class="row featurette cader-featurette">
                // <div class="col-md-7 cader-col">
                //     <h2 class="featurette-heading fw-normal lh-1">First featurette heading. <span class="text-muted">It’ll blow your mind.</span></h2>
                //     <p class="lead">Some great placeholder content for the first featurette here. Imagine some exciting prose here.</p>
                // </div>
                // <div class="col-md-5">
                //     <img src={pommeTerre} alt='' class="image-featurette bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid" style={{marginLeft:' 45%'}}/>
                // </div>
                // </div> */}

                {/* // <div class="row featurette cader-featurette">
                // <div class="col-md-7 order-md-2 cader-col">
                //     <h2 class="featurette-heading fw-normal lh-1">Oh yeah, it’s that good. <span class="text-muted">See for yourself.</span></h2>
                //     <p class="lead">Another featurette? Of course. More placeholder content here to give you an idea of how this layout would work with some actual real-world content in place.</p>
                // </div>
                // <div class="col-md-5 order-md-1">
                //     <img src={pommeTerre} alt='' class="image-featurette bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid"/>
                // </div>
                // </div> */}

        
           
        </div>
      </div>
    // design 
        //   <div className="container">
        //   {features.map((feature, index) => (
        //     <div key={index}>
        //       <hr className="featurette-divider" />
        //       <div className={`row featurette${index % 2 === 0 ? '' : ' flex-md-row-reverse'}`}>
        //         <div className="col-md-7">
        //           <h2 className="featurette-heading fw-normal lh-1">{feature.heading} <span className="text-muted">{feature.subHeading}</span></h2>
        //           <p className="lead">{feature.content}</p>
        //         </div>
        //         <div className="col-md-5">
        //           {/* Vous pouvez ajouter une image ici si vous avez une URL d'image dans vos données */}
        //           {/* <img src={feature.imageUrl} className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" alt="Featurette" /> */}
        //           <svg className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" width="500" height="500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 500x500" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#eee"/><text x="50%" y="50%" fill="#aaa" dy=".3em">500x500</text></svg>
        //         </div>
        //       </div>
        //     </div>
        //   ))}
        // </div>
      );
}
export default Stockage;