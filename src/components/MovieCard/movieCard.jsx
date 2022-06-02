import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Rate } from 'antd'
import cookie from 'cookie_js'

import { Genres } from '../Genres'
import ThemoviedbAPI from '../../api'
import './MovieCard.scss'

const MovieCard = function MovieCard({
  id,
  title,
  releaseDate,
  overview,
  posterPath,
  rating,
  genreIds,
  voteAverage,
}) {
  MovieCard.defaultProps = {
    id: 0,
    title: 'unknown',
    releaseDate: 'unknown',
    overview: 'unknown',
    posterPath: 'unknown',
    rating: {},
    genreIds: [],
    voteAverage: 0,
  }

  MovieCard.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    releaseDate: PropTypes.string,
    overview: PropTypes.string,
    posterPath: PropTypes.string,
    rating: PropTypes.object,
    genreIds: PropTypes.arrayOf(PropTypes.number),
    voteAverage: PropTypes.number,
  }

  const apiService = new ThemoviedbAPI()

  const [rated, setRated] = useState(0)

  const minimize = `${overview.slice(0, overview.indexOf(' ', 175))} ... `
  const minimizeTitle =
    title.length >= 33
      ? `${title.slice(0, title.indexOf(' ', 33))} ... `
      : title

  const rateId = async (rate) => {
    if (rate) {
      const prevRate = rated
      setRated(rate)
      const token = cookie.get('guest_session_id')
      const res = await apiService.setMovieRate(id, rate, token)
      if (res.ok) {
        localStorage.setItem(id, rate)
        setRated(rate)
      } else {
        setRated(prevRate)
      }

      return res
    }
  }
  const getRaitingData = (ids) => {
    if (ids) {
      setRated(rating[ids.toString()])
    } else {
      setRated(0)
    }
  }
  // useEffect(() => {
  //   rateId(rated)
  // }, [rated])

  useEffect(() => {
    getRaitingData(id)
  }, [rating])

  const rateColor = () => {
    if (voteAverage >= 0 && voteAverage < 3) {
      return 'rate-round red'
    }
    if (voteAverage >= 3 && voteAverage < 5) {
      return 'rate-round orange'
    }
    if (voteAverage >= 5 && voteAverage < 7) {
      return 'rate-round yellow'
    }
    if (voteAverage >= 7) {
      return 'rate-round green'
    }
    return 'rate-round'
  }

  const genresList = () =>
    genreIds
      .slice(0, 2)
      .map((genreItem) => <Genres genreItem={genreItem} key={genreItem} />)

  return (
    <div className="layout">
      <div>
        <img
          src={
            posterPath
              ? `http://image.tmdb.org/t/p/w500/${posterPath}`
              : 'https://imgholder.ru/183x281/8493a8/adb9ca&text=No+image+available&font=kelson'
          }
          alt="img"
          className="image"
        />
      </div>
      <div className="description">
        <div className="mobile-resolution">
          <span className="name">{minimizeTitle}</span>
          <span className="date">{releaseDate || ' '}</span>
          <span className="genre">
            {genresList() || ' '}
            {genreIds.length > 2 ? '...' : ''}
          </span>
        </div>
        <span className="about">{minimize}</span>
        <Rate value={rated} className="rate" onChange={rateId} count={10} />
        <span className={rateColor()}>{voteAverage}</span>
      </div>
    </div>
  )
}

export default MovieCard
