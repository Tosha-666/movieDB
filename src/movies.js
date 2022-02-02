import React from 'react'
import MovieCard from './movieCard'

const Movies = function movies({ filmsList, onchangeRate}) {
  const elements = filmsList.map((film) => (
    <MovieCard 
    {...film} 
    key={film.id}
    onchangeRate ={onchangeRate} />
  ))
  return <div className="container">{elements}</div>
}

export default Movies
