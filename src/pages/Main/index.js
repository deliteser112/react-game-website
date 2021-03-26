import React, { useState, useRef, useEffect} from 'react';

import 'normalize.css';
import './App.css';

import ArrowUp from '../../comp/main/icons/ArrowUp';
import Content from '../../comp/main/blocks/Content';
import Hero from '../../comp/main/blocks/Hero';
import Tabs from '../../comp/main/blocks/Tabs';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Main = ({isModalOpen}) => {
  const [orientation, setOrientation] = useState('horizontal');
  const [showButton, setShowButton] = useState(false);
  const [horizontalData, setHorizontalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const contentGridRef = useRef(null);
  useEffect(()=>{
    window.addEventListener('scroll', ()=> {
      if (contentGridRef.current && contentGridRef.current.getBoundingClientRect().y < 0){
        setShowButton(true);
      } else {
        setShowButton(false);
      }});
  }, []);

  useEffect(()=>{
    if(isModalOpen){
      document.body.style.overflow = 'hidden';
    } else{
      document.body.style.overflow = 'auto';
    }
  }, [isModalOpen]);


  const scrollUp = ()=>{
    const ContentTopOffSet = contentGridRef.current.offsetTop -100;
    window.scrollTo({
      left:0, 
      top:ContentTopOffSet, 
      behavior: 'smooth'
    });
  };

  return (
    <>
      <Hero horizontalData={horizontalData} loading = {loading}/>
      <Tabs onTab={e => setOrientation(e)} orientation={orientation} />
      <span ref={contentGridRef} />
      <Content orientation={orientation} uploadData = {setHorizontalData} loadingStatus = {setLoading}/>
      {showButton &&<div className="floating-div">
        <button onClick={()=> scrollUp()}><ArrowUp /></button>
      </div>}
    </>
  );
};

export default Main;
