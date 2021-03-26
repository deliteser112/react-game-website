import React, { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../../styles/Post';
import './PostsFeed.css';

interface PostsFeedState {
  posts: Post[];
  tmpCount: number;
}

const PostsFeed: React.FC = () => {
  const [state, setState] = useState<PostsFeedState>({
    posts: [],
    tmpCount: 0,
  });

  const loadMoreClick = (evt: MouseEvent) => {
    const newPosts: Post[] = [...state.posts];
    const newCount: number = state.tmpCount + 1;
    newPosts.push({
      id: '' + newCount,
      thumbUrl: 'url',
    });
    setState({
      posts: newPosts,
      tmpCount: newCount,
    });
  };

  return (
    <div>
      {state.posts.map((post) => (
        <Link
          to={{
            pathname: `/video/${post.id}`,
            state: { post: post },
          }}
          key={post.id}
        >
          Video {post.id}
        </Link>
      ))}
      <button type="button" onClick={loadMoreClick}>
        Load more
      </button>
    </div>
  );
};

export default PostsFeed;
