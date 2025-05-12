import React from 'react';
import './MovieCard.css';

const Moviecard = ({title, poster, rating}) => {
    return (
        <div className = "movie-card">
            <img src={poster} alt={title} />
            <div className = "info">
                <span className = "rating">⭐ {rating}</span>
                <p>{title}</p>
            </div>
        </div>
    );
};

export default Moviecard;