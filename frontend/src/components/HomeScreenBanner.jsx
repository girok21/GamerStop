import React from 'react'
import {Carousel, Image, Button} from 'react-bootstrap';
import  Banner1 from '../assets/images/herman-miller-vantum-gaming-chair-hpb-desktop-1.jpg'
import '../assets/HomeScreenBanner.style.scss';
import Banner2 from '../assets/images/home-banner-new-de.jpg'

const HomeScreenBanner = () => {
  return (
    <Carousel className='HomeScreenBanner' >
        <Carousel.Item className='banner-item' interval={2000}>
            {/* <img src={Banner1} alt="First Banner" /> */}
            <Image src={Banner1} alt="First Banner"/>
            <Carousel.Caption className='banner-caption'>
                <h3>Unleash your play</h3>
                <p>Achieve the perfect balance of style and support with our premium <span style={{fontWeight:700, color: '#f36cc2',}}>GAMING CHAIRS</span> - your victory starts here!</p>
                <Button>shop now</Button>
            </Carousel.Caption>         
        </Carousel.Item>
        <Carousel.Item className='banner-item' interval={2000}>
            {/* <img src={Banner1} alt="First Banner" /> */}
            <Image src={Banner2} alt="First Banner"/>
            <Carousel.Caption className='banner-caption'>
                <h3>Hear the Victory</h3>
                <p>Immerse in Supreme Soundscapes with Our Pro <span style={{fontWeight:700, color: '#f36cc2',}}>Gaming Headphones</span> - Your Path to Victory Awaits!</p>
                <Button>shop now</Button>
            </Carousel.Caption>         
        </Carousel.Item>
    </Carousel>
  )
}

export default HomeScreenBanner