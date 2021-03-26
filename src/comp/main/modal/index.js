import React, { useEffect, useRef, useCallback, useState } from 'react';
import ReactDom from 'react-dom';
import { useParams, useHistory} from 'react-router-dom';
import './modal.css';
import Close from '../icons/Close';
import MusicNote from '../icons/MusicNote';
import { getVideoById, getCommentsByVideoId, addVideoView} from '../../../api';

const numOfCommentsPerPage = 3;

const Modal = ({modalOpen, modalClose})=>{

  const { id } = useParams();
  const history = useHistory();

  const [ isLoading, setIsLoading] = useState(true);
  const [ isCommentLoading, setIsCommentLoading] = useState(true);
  const [ gameData, setGameData] = useState({});
  const [ commentPageNo, setCommentPageNo] = useState(1);
  const [ commentData, setCommentData] = useState([]);
  const [ hasMoreComment, setHasMoreComment] = useState(false);

  const modalRef = useRef(null);
  const loader = useRef(null);

  const closeModal = useCallback(()=>{
    history.goBack();
    modalClose();
  }, [history]);

  const fetchComment = async (page)=>{
    setIsCommentLoading(true);
    const commentRes = await getCommentsByVideoId(id, page, numOfCommentsPerPage);
    setCommentData(commentData.concat(commentRes.data.data.items));
    setHasMoreComment(commentRes.data.data.total.value > (page * numOfCommentsPerPage));
    setIsCommentLoading(false);
  };

  const fetchData = async (id)=>{
    setIsLoading(true);
    const videoRes = await getVideoById(id);
    setGameData(videoRes.data.data);
    setIsLoading(false);
    console.log(videoRes.data.data);
  };

  useEffect(()=>{
    if(id){
      fetchData(id);
      modalOpen();
    }
  }, [id]);

  const onClickPlayListener = ()=>{
    const gamevideo = document.getElementById('game-video')
    const videobtn = document.getElementById('btn-play')
    const detail_visible = document.getElementById('detail_info')
    const detail_height = document.getElementById('modal_height')
    const detail_width = document.getElementById('modal_width')
    const btn_exit = document.getElementById('btn_exit')
    
    if(gamevideo.paused){
      // let detail_hide = "full-screen-hide";
      // let modal_height_set = "full-screen-modal-height";
      // let modal_width_set = "full-screen-modal-width";
      // let btn_exit_set = "modal-fullscreen-position";

      // let detail_hide_arr = detail_visible.className.split(" ");
      // if (detail_hide_arr.indexOf(detail_hide) == -1) {
      //   detail_visible.className += " " + detail_hide;
      // }

      // let modal_width_set_arr = detail_width.className.split(" ");
      // if (modal_width_set_arr.indexOf(modal_width_set) == -1) {
      //   detail_width.className += " " + modal_width_set;
      // }

      // let modal_height_set_arr = detail_height.className.split(" ");
      // if (modal_height_set_arr.indexOf(modal_height_set) == -1) {
      //   detail_height.className += " " + modal_height_set;
      // }

      // let btn_exit_arr = btn_exit.className.split(" ");
      // if (btn_exit_arr.indexOf(btn_exit_set) == -1) {
      //   btn_exit.className += " " + btn_exit_set;
      // }


      gamevideo.play()
      videobtn.innerText = '❚❚'
      // if gamevideo.currenttime=== 0 means it played from the beginning, we will add one view to the video
      if(gamevideo.currentTime === 0){
        addVideoView(gameData.id)}
    } else{
      gamevideo.pause()
      videobtn.innerText = '▶'
    }
  }

  const options = {
    root: document.getElementById('modal-card-container') ,
    rootMargin: '20px',
    threshold: 1.0
  };

  const handleObserver = (entities) => {
    const target = entities[0];
    if (target.isIntersecting) {   
      setCommentPageNo(commentPageNo+1);
    }
  };
  const observer = new IntersectionObserver(handleObserver, options);

  useEffect(()=>{
    if (loader.current && hasMoreComment) {
      observer.observe(loader.current);
    }
  }, [isCommentLoading, hasMoreComment, observer]);

  useEffect(()=>{
    fetchComment(commentPageNo);
  }, [commentPageNo]);
  
  useEffect(()=>{
    window.addEventListener('keydown', e=>{
      if (e.keyCode === 27){
        closeModal();
      }
    });
    window.addEventListener('click', e=>{
      if(modalRef.current && !modalRef.current.contains(e.target)){
        closeModal();
      }
    });
  }
  , [closeModal]);

  return ReactDom.createPortal((<main className="modal-background" >
    {isLoading ? <p>Loading....</p> :
      <article className="modal-card" ref={modalRef} id="modal-card-container">
        <div className="modal-card__game-video" id="modal_height">
          <div className={`formatType-${gameData.metadata.formatType}`} id="modal_width">
            <div className={`fittingType-${gameData.metadata.fittingType}`}>
                <p id="btn-play" onClick={()=> onClickPlayListener()}>▶</p>
                <video poster={gameData.thumbUrl}  id="game-video" autoPlay loop>
                  <source src={gameData.playerUrl} type="video/mp4" />
                </video>
            </div>
          </div>
        </div>
        <div className="modal-card__game-details" id="detail_info">
          <div className="modal-card__profile-flex">
            <img className="modal-card__profile-pic" src={gameData.author.avatarUrl} alt={gameData.author.username} loading="lazy" />
            <p className="game-author">@{gameData.author.username}</p>
          </div>
          <p>{gameData.description}</p>
          <div className="game-music-row"><MusicNote color="white"/> <span className="game-music">{gameData.sound.artist} - {gameData.sound.title}</span></div>
          <p className="modal-card__likes">{gameData.likesCount} likes • {gameData.commentsCount} comments</p>
          {commentData.map(comment=><div className="modal-card__comment-grid" key={comment.id}>
            <div className="modal-card__profile-flex">
              <img className="modal-card__profile-pic" src={comment.user.avatarUrl} alt={comment.user.username} loading="lazy" />
              <p className="game-author">@{comment.user.username}</p>
              {comment.user.id === gameData.author.id && <p className="badge"><span className="divider">•</span>  Creator</p>}
            </div>
            <p className="modal-card__comment-message">{comment.text}</p>
          </div>)}
          {hasMoreComment && !isCommentLoading && <span ref={loader} />}

        </div>
        <button className="close-btn" onClick={()=>closeModal()} id="btn_exit"> <Close opacity="0.4" /> </button>
      </article>}
        
  </main>),
  document.getElementById('portal'));
};

export default Modal;