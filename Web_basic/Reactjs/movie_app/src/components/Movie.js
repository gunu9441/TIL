import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import {Link} from 'react-router-dom';

function Movie({year, title, summary, poster, genres}){
        return(
                <div className = 'movie'>
                    <img src = {poster} alt={title} title={title} />
                    <div className = 'movie_data'>
                        <Link to=
                            {{
                                pathname:'/movie-detail',
                                state:{
                                    year:year,
                                    title:title,
                                    summary:summary,
                                    poster:poster,
                                    genres:genres
                                }
                            }}>
                        <h3 className="movie_title">{title}</h3>
                        </Link>
                        <h5 className="movie_year">{year}</h5>
                        <ul className="movie_genres">
                            {genres.map((genre, index)=>(
                                <li key={index} className="genres_genre">{genre}</li>
                        ))}</ul>
                        <p className="movie_summary">{summary.slice(0,140)}...</p>
                    </div>
                </div>
           
        )
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;