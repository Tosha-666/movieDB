import PropTypes from 'prop-types'
import React from 'react'

import { MovieCard } from '../MovieCard'
import './Movies.scss'

const Movies = function movies({ filmsList, onchangeRateFilm, getRated }) {
  Movies.defaultProps = {
    filmsList: [],
    onchangeRateFilm: () => {},
    getRated: () => {},
  }

  Movies.propTypes = {
    filmsList: PropTypes.arrayOf(PropTypes.object),
    onchangeRateFilm: PropTypes.func,
    getRated: PropTypes.func,
  }
  const elements = filmsList.map((film) => (
    <MovieCard
      // film={film}
      title={film.title}
      releaseDate={film.release_date}
      overview={film.overview}
      posterPath={film.poster_path}
      key={film.id}
      onchangeRateFilm={onchangeRateFilm}
      id={film.id}
      rating={film.rating}
      voteAverage={film.vote_average}
      genreIds={film.genre_ids}
      getRated={getRated}
    />
  ))
  return <div className="container">{elements}</div>
}

export default Movies
