import React, { useEffect, useState, useRef } from 'react';
import {useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from "react-loader-spinner";

import { v4 as uuidv4 } from 'uuid';

import GameCard from './GameCard';
import './content.css';
import {setDeviceId, getVideos} from '../../../api';

const options = {
  root: document.getElementById('main-container'),
  rootMargin: '20px',
  threshold: 1.0};

const Content = ({ orientation, uploadData, loadingStatus }) => {
  const postPerPage = 27;
  const history = useHistory();

  const [ pageNo, setPageNo] = useState(1);
  const [ horizontalGameData, setHorizontalGameData ]= useState([]);
  const [ verticalGameData, setVerticalGameData ]= useState([]);
  const [ heroThumbnailData, setHeroThumbnailData]= useState([]);
  const [ isLoading, setIsLoading] = useState(true);
  const [ hasNextPage, setHasNextPage] = useState(null);

  const loader = useRef(null);

  const fetchData = async(orientation, page)=>{
    setIsLoading(true);
    const res = await getVideos(orientation, page, postPerPage);
    if (orientation === 'vertical'){
      setVerticalGameData( [...verticalGameData, ...res.data.data.items]);
    } else{
      setHorizontalGameData( [...horizontalGameData, ...res.data.data.items]);
    }
    const fetchThumbnail = await getVideos('horizontal', page, postPerPage);
    setHeroThumbnailData( [...heroThumbnailData, ...fetchThumbnail.data.data.items]);

    setIsLoading(false);
    setHasNextPage(Math.ceil(res.data.data.total.value/postPerPage) > pageNo);
  };

  useEffect(()=>{
    console.log(horizontalGameData)
  }, [horizontalGameData])
  useEffect(()=>{
    uploadData(heroThumbnailData)
  }, [isLoading])
  
  useEffect(()=>{
    loadingStatus(isLoading)
  }, [isLoading])

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setPageNo(pageNo+1);
    }
  };
  const observer = new IntersectionObserver(handleObserver, options);

  useEffect(()=>{
    const device_id = localStorage.getItem('imba_device_id');
    if (!device_id){
      const id = uuidv4();
      setDeviceId(id);
      localStorage.setItem('imba_device_id', id);
    } else{
      setDeviceId(device_id);
    }  
  }, []);

  useEffect(()=>{
    if (loader.current && hasNextPage) {
      observer.observe(loader.current);
    }
  }, [isLoading, hasNextPage, observer]);

  useEffect(()=>{
    fetchData(orientation, pageNo);
  }, [pageNo, orientation]);

  useEffect(()=>{
    setHorizontalGameData([]);
    setVerticalGameData([]);
    setPageNo(1);
  }, [orientation]);

  return <main className="content-container" id="container">
    <section className={`content-grid ${orientation}`}>
      <Loader
        className="spinner-loading"
        type="Oval"
        color="#F0D500"
        height={60}
        visible={isLoading}
        width={60}
      />
      {orientation === 'vertical' &&  verticalGameData.map(data =><GameCard key={data.id} orientation={orientation} data={data} onClick={()=> history.push(`video/${data.id}`)}/> )}
      {orientation === 'horizontal' && horizontalGameData.map(data =><GameCard key={data.id} orientation={orientation} data={data} onClick={()=> history.push(`video/${data.id}`)}/> )}
      {!isLoading && hasNextPage && <span ref={loader} />}
    </section>
  </main>;
};

Content.propTypes = {
  orientation: PropTypes.string,
  onClickVideo: PropTypes.func
};

export default Content;
