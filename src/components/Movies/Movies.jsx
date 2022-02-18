import PropTypes from 'prop-types'
import React from 'react'
import MovieCard from '../MovieCard'
import './Movies.scss'

const Movies = function movies({ filmsList, onchangeRateFilm }) {
  Movies.defaultProps = {
    filmsList: [],
    onchangeRateFilm: () => {},
  }

  Movies.propTypes = {
    filmsList: PropTypes.arrayOf(PropTypes.object),
    onchangeRateFilm: PropTypes.func,
  }
  const elements = filmsList.map((film) => (
    <MovieCard
      film={film}
      title={film.title}
      releaseDate={film.release_date}
      overview={film.overview}
      posterPath={film.poster_path}
      key={film.id}
      onchangeRateFilm={onchangeRateFilm}
      id={film.id}
      rating={film.vote_average}
      genreIds={film.genre_ids}
    />
  ))
  return <div className="container">{elements}</div>
}

export default Movies
