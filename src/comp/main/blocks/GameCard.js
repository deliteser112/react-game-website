import React from 'react';
import PropTypes from 'prop-types';
import MusicNote from '../icons/MusicNote';
import './gamecard.css';

const GameCard =({ orientation, data, ...props }) => {
  const { thumbUrl, description, author, sound, game } = data;
  return <div className={`game-card game-card-${orientation}`} onClick={props.onClick}>
    <div className="game-image-div">
      <img src={thumbUrl} loading="lazy" alt={`${description} by ${author.username}`} />
    </div>
    <h3 className="game-title heading-font">{game?.name}</h3>
    <p className="game-author">@{author.username}</p>
    <div className="game-music-row"><MusicNote /> <span className="game-music">{sound.artist} - {sound.title}</span></div>
  </div>;

};

GameCard.propTypes = {
  orientation: PropTypes.string,
  data: PropTypes.object
};


export default GameCard;