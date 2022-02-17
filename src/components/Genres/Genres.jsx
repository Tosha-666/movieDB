import React from 'react'
import PropTypes from 'prop-types'
import GenresContext from '../../genresContext'

const GenresCard = function genres({ genreItem }) {
  GenresCard.defaultProps = {
    genreItem: 0,
  }
  GenresCard.propTypes = {
    genreItem: PropTypes.number,
  }
  const genreOfFilm = (genreList) =>
    genreList.genres.find((item) => item.id === genreItem).name

  return (
    <GenresContext.Consumer>
      {(value) => <span>{genreOfFilm(value)}</span>}
    </GenresContext.Consumer>
  )
}

export default GenresCard
