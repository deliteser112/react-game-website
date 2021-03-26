import React, { useState, useEffect, useRef } from 'react';

import 'materialize-css';
import './heroimgcarousel.css';


const HeroImgCarousel = ({data, loading})=>{
  const { playerUrl , thumbUrl} = data;

  const videoRef = useRef();
  const previousUrl = useRef(playerUrl);

  useEffect(() => {
    if (previousUrl.current !== playerUrl && videoRef.current) {
      videoRef.current.load();
      previousUrl.current = playerUrl;
    }
  }, [playerUrl]);

  useEffect(()=>{
    var elems = document.querySelectorAll('.carousel');
    // eslint-disable-next-line no-undef
    var instances = M.Carousel.init(elems, {
      dist: -150,
    });
    // const autoPlay = document.getElementById('auto_play')
    // autoPlay.play()
  },[]);

  // return <a className="carousel-item" href="#one!">
  //         <video autoplay loop id="auto_play">
  //           <source src={playerUrl} />
  //         </video>
  //       </a>;
  // return   <div className="carousel carousel-customized">
    return <a className="carousel-item" href="#one!"><img src={thumbUrl} alt="video" loading="lazy"/></a>;
};

export default HeroImgCarousel;