import Carousel from 'react-bootstrap/Carousel';
function CarouselBetail() {
  return (
    <Carousel >
      <Carousel.Item>
      <img style={{height: "180mm",width:"455mm"}} src="https://i.pinimg.com/originals/61/b3/48/61b348b34f30f060538f4731192b81e9.jpg" alt=""/>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img style={{height: "180mm",width:"455mm"}}  src="https://www.webdo.tn/uploads/2017/06/Tunis-Sheep-1024x576.jpg" alt=""></img>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img style={{height: "180mm",width:"455mm"}}  src="https://images.ladepeche.fr/api/v1/images/view/64b1a4d34b340c2a0b2dd757/large/image.jpg?v=1" alt=""></img>
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselBetail;