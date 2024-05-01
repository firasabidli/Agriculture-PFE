import React from "react";
import Carousel from 'react-bootstrap/Carousel';
const CarouselAgriculture = () => {
    return(
       <div>
         <Carousel >
      <Carousel.Item>
      <img style={{height: "180mm",width:"455mm"}} src="https://img.freepik.com/premium-photo/white-bag-rice-grits-storage-barn-closeup-warehouse-with-bulk-rice-sugar-bags-distribution-center-bulk-rice-procurement-production-transportation-rice-ai_262708-10445.jpg?w=1060" alt=""/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
       </div>
    )
}
export default CarouselAgriculture;