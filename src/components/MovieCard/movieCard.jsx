import React from 'react'
import PropTypes from 'prop-types'
import { Rate } from 'antd'
import GenresCard from '../Genres/Genres'

const MovieCard = function movieCard({
  film,
  id,
  title,
  releaseDate,
  overview,
  posterPath,
  onchangeRateFilm,
  rating,
  genreIds,
}) {
  MovieCard.defaultProps = {
    film: 'unknown',
    id: 0,
    title: 'unknown',
    releaseDate: 'unknown',
    overview: 'unknown',
    posterPath: 'unknown',
    onchangeRateFilm: () => {},
    rating: 0,
    genreIds: [],
  }
  MovieCard.propTypes = {
    film: PropTypes.object,
    id: PropTypes.number,
    title: PropTypes.string,
    releaseDate: PropTypes.string,
    overview: PropTypes.string,
    posterPath: PropTypes.string,
    onchangeRateFilm: PropTypes.func,
    rating: PropTypes.number,
    genreIds: PropTypes.arrayOf(PropTypes.number),
  }
  const minimize = `${overview.slice(0, overview.indexOf(' ', 175))} ... `

  const rateId = (value) => {
    onchangeRateFilm(value, film)
  }

  const rateOfFilm = () => {
    const keys = Object.keys(localStorage)
    const ratedFilm = keys.find((element) => JSON.parse(element) === id)
    return ratedFilm
      ? JSON.parse(localStorage.getItem(ratedFilm)).userRating
      : 0
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

  const genresList = () =>
    genreIds.map((genreItem) => (
      <GenresCard genreItem={genreItem} key={genreItem} />
    ))

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
        <span className="genre">{genresList()}</span>
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
