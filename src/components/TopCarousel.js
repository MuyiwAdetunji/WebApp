import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Banner1 from '../img/banner1.jpg'
import Banner2 from '../img/banner2.jpg'
import Banner3 from '../img/banner3.jpg'
import Banner4 from '../img/banner4.jpg'

const TopCarousel = () => {
  return (
    <Carousel autoPlay infiniteLoop>
      <div>
        <img src={Banner1} alt='banner' />
      </div>
      <div>
        <img src={Banner2} alt='banner' />
      </div>
      <div>
        <img src={Banner3} alt='banner' />
      </div>
      <div>
        <img src={Banner4} alt='banner' />
      </div>
    </Carousel>
  )
}

export default TopCarousel
