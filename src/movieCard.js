import React from 'react'
import { Rate } from 'antd'

const MovieCard = function movieCard({
  id,
  title,
  releaseDate,
  overview,
  posterPath,
  onchangeRate,
  rating,
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

  const rateColor = () => {
    if (rating >= 0 && rating < 3) {
      return 'rate-round red'
    }
    if (rating >= 3 && rating < 5) {
      return 'rate-round orange'
    }
    if (rating >= 5 && rating < 7) {
      return 'rate-round yellow'
    }
    if (rating >= 7) {
      return 'rate-round green'
    }
    return 'rate-round'
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
        <span className={rateColor()}>{rating}</span>
      </div>
    </div>
  )
}

export default MovieCard
