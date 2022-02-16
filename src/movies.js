import React from 'react'
import MovieCard from './movieCard'

const Movies = function movies({ filmsList, onchangeRateFilm }) {
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
      genres = {film.genres}
    />
  ))
  return <div className="container">{elements}</div>
}

export default Movies
