import React from 'react';
import { useLocation } from 'react-router-dom';
import { Post } from '../../../styles/Post';
import './PostPopup.css';

interface PostPopupState {
  post: Post;
}

const PostPopup: React.FC = () => {
  const location = useLocation<PostPopupState>();
  return (
    <div>
      <p>Popup {location.state.post.id}</p>
    </div>
  );
};

export default PostPopup;
