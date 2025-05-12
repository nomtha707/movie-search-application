import React, { useState } from "react";
import "./MovieDetail.css";

const MovieDetail = ({ movie, onClose }) => {
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  if (!movie) return null;

  const toggleSynopsis = () => {
    setShowFullSynopsis((prev) => !prev);
  };

  return (
    <div
      className="movie-detail-container"
      onClick={onClose} // Close modal when clicking on the background
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Image Section */}
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}
          alt={movie.Title}
        />

        {/* Text Content Section */}
        <div className="modal-text">
          <h1>{movie.Title}</h1>
          <p className="movie-meta">
            ⭐ {movie.imdbRating} IMDb • ⏱ {movie.Runtime} • {movie.Year}
          </p>
          <div className="movie-synopsis">
            <p>
              {showFullSynopsis
                ? movie.Plot
                : movie.Plot.length > 150
                ? `${movie.Plot.slice(0, 150)}...`
                : movie.Plot}
              {movie.Plot.length > 150 && !showFullSynopsis && (
                <span
                  className="toggle-synopsis"
                  onClick={toggleSynopsis}
                  style={{ color: "#e94560", cursor: "pointer" }}
                >
                  {" "}
                  Read more
                </span>
              )}
            </p>
            {showFullSynopsis && (
              <button
                className="toggle-synopsis"
                onClick={toggleSynopsis}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e94560",
                  cursor: "pointer",
                  marginTop: "5px",
                }}
              >
                Show Less
              </button>
            )}
          </div>
          <div className="movie-details">
            <p>
              <strong>Genres:</strong> {movie.Genre}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Production:</strong> {movie.Production}
            </p>
            <p>
              <strong>Countries:</strong> {movie.Country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;