import React from 'react';
import { Card } from 'react-bootstrap';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/CoteClient/css/style.css';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { IoIosChatboxes } from 'react-icons/io';
import argileux from '../../assets/CoteClient/images/TypeSol/argileux.jpeg';
import humifere from '../../assets/CoteClient/images/TypeSol/humifere.jpeg';
import limoneux from '../../assets/CoteClient/images/TypeSol/limoneux.jpeg';
import calcaire from '../../assets/CoteClient/images/TypeSol/calcaire.jpeg';
import sableux from '../../assets/CoteClient/images/TypeSol/sableux.jpeg';

const TypeSol = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll:1,
  };

  const carouselData = [

    {
      image: humifere,
      title: 'Sol humifère',
      description: 'Un sol humifère est un sol communément appelé « terre végétale ». Il est riche en matières organiques, de couleur brune à noire. Il se travaille facilement et accueille une végétation spontanée.',
    },
    {
      image: limoneux,
      title: 'Sol limoneux',
      description: 'On appelle « sol limoneux » un sol riche en limons. C’est un sol dont les grains sont de taille intermédiaire entre les argiles et les sables. Ce sol s’est constitué par dépôts sédimentaires le long d’un cours d’eau.',
    },
    {
      image: calcaire,
      title: 'Sol Calcaire',
      description: 'Un sol calcaire se reconnaît à sa couleur blanchâtre. Il est principalement composé de carbonate de calcium [CaCO3] qui provient de l’accumulation de dépôts marins lors des périodes géologiques.',
    },
    {
      image: sableux,
      title: 'Sol Sableux',
      description: 'Les sols sableux sont souvent secs, pauvres en matières organiques, aérés et très drainants. Ils ne sont pas aptes à transporter l’eau par capillarité jusqu’aux couches profondes ce qui les rend instables.',
    },
    {
      image: argileux,
      title: 'Sol argileux',
      description: 'Un sol argileux est composé d’une grande quantité de particules fines de roches de diamètre inférieur à 2 microns. La finesse de ces particules en fait un sol lourd et compact qui laisse difficilement passer l’eau.',
    },
  ];

  return (
    <div>
      <div className="container-TypeSole">
      <div class="red-line"></div>
      <div class="green-line"></div>
        <h1>Type Sol</h1>
        <p>Le sol est la partie superficielle de l’écorce terrestre</p>
      </div>
      <Slider className="slider carousel-indicators" {...settings}>
        {carouselData.map((item, index) => (
          <div >
          <Card className='card-carousel' key={index}>
            
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title className="Title">{item.title}</Card.Title>
              <Card.Text className='description'>{item.description}</Card.Text>
              <div class="d-flex align-items-center mt-4">
			                <p class="mb-0"><a href="/" class="btn btn-Read">En savoir plus <span>
                      <IoIosArrowRoundForward /></span></a></p>
			                <p class="ml-auto meta2 mb-0">
			                	<a href="/" class="mr-2">Admin</a>
			                	<a href="/" class="meta-chat"><span>
                          <IoIosChatboxes></IoIosChatboxes></span> 3</a>
			                </p>
		                </div>
            </Card.Body>
            
          </Card>
          </div>
        ))}
      </Slider>
     </div>
  );
};

export default TypeSol;
