import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import GenresContext from '../../genresContext'

const GenresCard = function Genres({ genreItem }) {
  GenresCard.defaultProps = {
    genreItem: 0,
  }
  GenresCard.propTypes = {
    genreItem: PropTypes.number,
  }

  const genre = useContext(GenresContext)

  const genreOfFilm = (genreList) =>
    genreList.genres.find((item) => item.id === genreItem).name

  return <span>{genreOfFilm(genre)}</span>
}

export default GenresCard
