import React from 'react';
import { Button, Carousel } from 'react-bootstrap';
import Carousel1 from '../../assets/CoteClient/images/agriculture1.jpg';
import Carousel2 from '../../assets/CoteClient/images/agriculture3.jpg';
import '../../assets/CoteClient/lib/animate/animate.min.css';
import '../../assets/CoteClient/lib/owlcarousel/assets/owl.carousel.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/CoteClient/css/style.css';
const HeaderCarousel = () => {
  return (
    <div className="container-fluid p-0 mb-5 wow fadeIn" data-wow-delay="0.1s">
      <Carousel className="header-carousel">
        <Carousel.Item>
          <img className="w-100 image" src={Carousel1} alt="Organic Food Is Good For Health" />
          <Carousel.Caption>
            <div className="container-Carousel">
              <div className="row justify-content-start">
                <div className="col-lg-7">
                  <h1 className="display-2 mb-5 animated slideInDown">Cultiver la Qualité, Récolter la Santé</h1>
                  <Button className="btn btn-primary-carsoul rounded-pill py-sm-3 px-sm-5">Production</Button>
                  <Button className="btn btn-secondary-carsoul  rounded-pill py-sm-3 px-sm-5 ms-3">Services</Button>
                </div>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="w-100 image" src={Carousel2} alt="Organic Food Is Good For Health" />
          <Carousel.Caption>
            <div className="container-Carousel">
              <div className="row justify-content-start">
                <div className="col-lg-7">
                  <h1 className="display-2 mb-5 animated slideInDown">Nourrir la nature, une plante à la fois</h1>
                  <Button className="btn btn-primary-carsoul rounded-pill py-sm-3 px-sm-5">Production</Button>
                  <Button className="btn btn-secondary-carsoul  rounded-pill py-sm-3 px-sm-5 ms-3">Services</Button>
                </div>
              </div>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        
      </Carousel>
    </div>
  );
};

export default HeaderCarousel;
