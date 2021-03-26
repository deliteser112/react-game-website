import React from 'react';
import Nav from './Nav';
import HeroImgCarousel from './HeroImgCarousel';

const Hero = ({horizontalData, loading}) => {
  return <section className="hero">
    <Nav />
    <div className="hero-content">
      <h1 className="heading-font">Make games even more fun</h1>
      <p className="tagline"> A short video creation and sharing platform for gamers</p>
      <div className="carousel carousel-customized">
        {horizontalData.map((data) =><HeroImgCarousel key={data.id} data={data} loading={loading}/> )}
      </div>
      <div className="app-download">
        {/* <button><img  src="assets/icons/apple-store.png" loading="lazy" alt="download imba app in apple store" /></button> */}
        <button><img  src="assets/icons/google-play.png" loading="lazy" alt="download imba app in google play store" /></button>
      </div>
    </div>
  </section>;
};

export default Hero;