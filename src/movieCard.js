import React from 'react'
import { Rate } from 'antd'

const MovieCard = function movieCard({
  id,
  title,
  releaseDate,
  overview,
  posterPath,
  onchangeRate,
}) {
  const minimize = `${overview.slice(0, overview.indexOf(' ', 175))} ... `
  const rateId = (value) => {
    onchangeRate(value, id)
  }
  const rateOfFilm = () => {
    const keys = Object.keys(localStorage)
    const ratedFilm = keys.find((element) => element == id)

    return localStorage.getItem(ratedFilm) || 0
  }
  return (
    <div className="layout">
      <div>
        <img
          src={`http://image.tmdb.org/t/p/w500/${posterPath}`}
          alt="img"
          className="image"
        />
      </div>
      <div className="description">
        <span className="name">{title}</span>
        <span className="date">{releaseDate}</span>
        <span className="genre">Action</span>
        <span className="about">{minimize}</span>
        <Rate
          defaultValue={rateOfFilm()}
          className="rate"
          onChange={rateId}
          count={10}
        />
      </div>
    </div>
  )
}

export default MovieCard
