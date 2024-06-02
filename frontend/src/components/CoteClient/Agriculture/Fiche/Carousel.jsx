import React from "react";
import Carousel from 'react-bootstrap/Carousel';
const CarouselAgriculture = () => {
    return(
       <div>
         <Carousel >
      <Carousel.Item>
      <img style={{height: "180mm",width:"455mm"}} src="https://img.freepik.com/free-photo/green-meadow-corn-crop-blue-sky-fresh-harvest-generated-by-ai_188544-151908.jpg?t=st=1714135452~exp=1714139052~hmac=f377b34b16caca35c9a307c63f3a0c2dda61212a768236ff9a17b803912a0afb&w=1060" alt=""/>
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: "180mm",width:"455mm"}}  src="https://img.freepik.com/free-photo/beautiful-country-side-landscape_23-2150725013.jpg?t=st=1714135566~exp=1714139166~hmac=8ccea43ba9f88035c8a967acf359afdb0bcab3fe198c843310102e9a1e9cd933&w=1380" alt=""></img>
        <Carousel.Caption>
         
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
       <img style={{height: "180mm",width:"455mm"}} alt="carousel" src="https://fierbourg.com/wp-content/uploads/Culture-maraichere-bio.jpg"/>
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
       </div>
    )
}
export default CarouselAgriculture;