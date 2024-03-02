import React from 'react';
import argileux from '../../assets/CoteClient/images/TypeSol/argileux.jpeg'
import humifere from '../../assets/CoteClient/images/TypeSol/humifere.jpeg'
import limoneux from '../../assets/CoteClient/images/TypeSol/limoneux.jpeg'
import '../../assets/CoteClient/lib/animate/animate.min.css';
import '../../assets/CoteClient/lib/owlcarousel/assets/owl.carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CoteClient/css/style.css';
const TypeSol = () => {
    return (
        <div>
             <div class="container-xxl py-5">
        <div class="container">
            <div class="section-header text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" >
                <h1 class="display-5 mb-3">Type SOL</h1>
                <p>Les sols en fonction des régions et de leur histoire géologique ont des natures très différentes</p>
            </div>
            <div class="row g-4">
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <img class="img-fluid" src={argileux} alt=""/>
                    <div class="bg-light p-4">
                        <h1 class="d-block  h5 lh-base mb-4" >Sol argileux</h1>
                        <div class="text-muted border-top pt-4">
                            <p className='paraghraphe-Terre'>Un sol argileux est composé d’une grande quantité de particules fines de roches de diamètre inférieur à 2 microns. 
                                La finesse de ces particules en fait un sol lourd et compact qui laisse difficilement passer l’eau. En période de sécheresse, 
                                il devient très dur et laisse apparaître des crevasses.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <img class="img-fluid" src={humifere} alt=""/>
                    <div class="bg-light p-4">
                        <h1 class="d-block h5 lh-base mb-4">Sol humifère</h1>
                        <div class="text-muted border-top pt-4">
                            <p className='paraghraphe-Terre'>Un sol humifère est un sol communément appelé « terre végétale ». 
                                Il est riche en matières organiques, de couleur brune à noire. 
                                Il se travaille facilement et accueille une végétation spontanée.Il est spongieux, ne colle pas et s’aère facilement.</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <img class="img-fluid" src={ limoneux } alt=""/>
                    <div class="bg-light p-4">
                        <h1 class="d-block h5 lh-base mb-4" >Sol limoneux</h1>
                        <div class="text-muted border-top pt-4">
                            <p className='paraghraphe-Terre'>​On appelle « sol limoneux » un sol riche en limons. C’est un sol dont les grains sont de taille intermédiaire entre les argiles et les sables. 
                                Ce sol s’est constitué par dépôts sédimentaires le long d’un cours d’eau. 
                                On le trouve donc à proximité des fleuves.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        </div>
        );
    };
    
    export default TypeSol;