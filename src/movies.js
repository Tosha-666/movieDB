import React from 'react'
import MovieCard from './movieCard'

const Movies = function movies({ filmsList, onchangeRate }) {
  const elements = filmsList.map((film) => (
    <MovieCard
      title={film.title}
      releaseDate={film.release_date}
      overview={film.overview}
      posterPath={film.poster_path}
      key={film.id}
      onchangeRate={onchangeRate}
      id={film.id}
    />
  ))
  return <div className="container">{elements}</div>
}

export default Movies
