import './Info.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const TableBetail = ({ betailData }) => {
  console.log("table",betailData)
  // if (!cultureData || cultureData.length === 0 || !Array.isArray(cultureData)) {
  //   return <p>Aucune donnée à afficher.</p>;
  // }

  
  return (
    <article className="blog-post" style={{ marginLeft: "5%", marginTop: "2%" }}>
      <h2 className="blog-post-title mb-1">Besoin D'alimentation et Suivi de la santé</h2>
      <p className="blog-post-meta"> </p>
      <p className="  fst-italic fw-lighter ">Gestion efficace des betails : Besoin D'alimentation et suivi.</p>
      <p className="fs-5 fw-bold ">Découvrez les informations détaillé sur votre betail par categorie et son race.</p>
     
          {betailData && (

            <div className="card mb-3 ">
                <div className="text-center"><img src={betailData.image_betail} className="card-img-top img-fluid w-50 h-50 " alt="img"/></div >
            
                <Container className=' left'>
                <Row className='mb-2 Row '  >
                        <Col  sm={6} md={6} >Nom De la Betail</Col > 
                     <Col  sm={6} md={6} className='Col' >{betailData.nom_betail }</Col > 
                    
                     </Row>
                     <Row className='mb-2 Row'  >
                     <Col  sm={6} md={6} > Categorie de la betail </Col >
                     <Col  sm={6} md={6} className='Col' >{betailData.id_categorie.nom_categorieBetail }</Col > 
                     </Row>
                     
                     <Row className='mb-2 Row'  >
                      <Col  sm={6} md={6} >Race du betail</Col > 
                     <Col  sm={6} md={6} className='Col' >{betailData.race }</Col > 
                     </Row>
                     
                     <Row className='mb-2 Row'  >
                      <Col  sm={6} md={6} >Etat du betail</Col >  
                     <Col  sm={6} md={6} className='Col' >{betailData.etat_betail }</Col > 
                     </Row>
                     
                     <Row className='mb-2 Row'  >
                    <Col  sm={6} md={6} >Sexe du bétail</Col > 
                     <Col  sm={6} md={6} className='Col' >{betailData.sexe } </Col >
                    
                     </Row>
                     <Row className='mb-2 Row'  >
                      <Col  sm={6} md={6} >Besoin Alimentation</Col > 
                     <Col  sm={6} md={6} className='Col' >{betailData.alimentation } </Col >
                     </Row>
                     
                     <Row className='mb-2 Row'  >
                     <Col  sm={6} md={6} >Quantite alimentation par jour en kg  </Col >
                     <Col  sm={6} md={6} className='Col' >{betailData.quantite_aliment_par_jour_kg }</Col > 
                     </Row>
                     
                     <Row className='mb-2 Row'  >
                     <Col  sm={6} md={6} > Suivie de la sante avec le vétérinaire</Col >
                    <Col  sm={6} md={6} className='Col' > {betailData.frequence_suivi_sante }</Col > 
                    </Row>
                     
                    <Row className='mb-2 Row'  >
                     <Col  sm={6} md={6} > commentaires sur la sante</Col >  
                     <Col  sm={6} md={6} className='Col' >{betailData.commentaires_sante }</Col > 
                     </Row>
                     </Container>
             
                
                </div >
           
           
          
           
          )}
       
      
    </article>
  );
}
export default TableBetail;

