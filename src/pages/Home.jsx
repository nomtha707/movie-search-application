import React, { useState, useEffect } from "react";
import './Home.css';
import MovieDetail from '../components/MovieDetail';
import axios from "axios";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const[searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Fetch recently released movies from TMDb
  useEffect(() => {
    const fetchRecentMovies = async () => {
      try {
        const response = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
          params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            language: "en-US",
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching recent movies:", error);
      }
    };

    fetchRecentMovies();
  }, []);

  // Fetch the movies from OMDb API based on the search results inputted by the user
  const fetchMoviesFromOMDb = async (query) => {
    try {
      const response = await axios.get("https://www.omdbapi.com/", {
        params: {
          apikey: import.meta.env.VITE_OMDB_API_KEY, // OMDb API key
          s: query, // Search query
        },
      });
      if (response.data.Search) {
        setSearchResults(response.data.Search); // Update search results
      } else {
        setSearchResults([]); // Clear results if no matches
      }
    } catch (error) {
      console.error("Error fetching movies from OMDb:", error);
      setSearchResults([]);
    }
  };

  // Fetch movie details from OMDb (for searched movies)
const fetchMovieDetailsFromOMDb = async (imdbID) => {
  try {
    const response = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
        i: imdbID,
      },
    });
    setSelectedMovie(response.data); // Store the movie details
  } catch (error) {
    console.error("Error fetching movie details from OMDb:", error);
  }
};

  // Fetch detailed information about a movie
  const fetchMovieDetailsFromTMDb = async (movieId) => {
  try {
    // Fetch movie details from TMDb to get the IMDb ID
    const tmdbResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      params: {
        api_key: import.meta.env.VITE_TMDB_API_KEY,
      },
    });

    const imdbID = tmdbResponse.data.imdb_id; // Extract IMDb ID

    // Fetch detailed information from OMDb using the IMDb ID
    const omdbResponse = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: import.meta.env.VITE_OMDB_API_KEY,
        i: imdbID,
      },
    });

    setSelectedMovie(omdbResponse.data); // Store the movie details
  } catch (error) {
    console.error("Error fetching the movie details:", error);
  }
};

  const filteredMovies = movies.filter((movie) => 
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() !== "") {
      fetchMoviesFromOMDb(query);
    } else {
      setSearchResults([]);
    }
  };

  const handleMovieClick = (movieId, isFromSearch = false) => {
    if (isFromSearch) {
      fetchMovieDetailsFromOMDb(movieId);
    } else {
      fetchMovieDetailsFromTMDb(movieId);
    }
  };

  const centeredHeadingStyle = {
    textAlign: "center",
    margin: "25px 0",
  };

  const h3HeadingStyle = {
    margin: "15px 0",
    marginLeft: "75px",
  };

  return (
    <div className="home-page">
      <h2 style={centeredHeadingStyle}>Find Movies, TV series and more</h2>
      <SearchBar onSearch={handleSearch} />
      
      {searchResults.length > 0 && (
      <>
        <h2 style={h3HeadingStyle}>Search Results</h2>
        <div className="movie-list">
          {searchResults.map((movie, idx) => (
            <div className="movie-card" key={idx} onClick={() => handleMovieClick(movie.imdbID, true)}>
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/150"}
                alt={movie.Title}
              />
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
            </div>
          ))}
        </div>
      </>
    )}
      <h2 style={h3HeadingStyle}>Recently Released</h2>
      <div className="movie-list">
        {movies.map((movie, idx) => (
          <div className="movie-card" key={idx} onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
          </div>
        ))}
      </div>

      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};
export default Home;
