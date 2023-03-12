import React from 'react';
import './Card.css';

const Card = ({ video }) => {
  return (
    <div className='card-container'>
       <div className="card">
       <h2>{video.title}</h2>
      <img src={video.thumbnail} alt={video.title} />
      <p>{video.description}</p>
       </div>
    </div>
  );
};

export default Card;
