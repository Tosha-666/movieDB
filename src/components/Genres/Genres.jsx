import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import GenresContext from '../../genresContext'

const Genres = function Genres({ genreItem }) {
  Genres.defaultProps = {
    genreItem: 0,
  }
  Genres.propTypes = {
    genreItem: PropTypes.number,
  }

  const genre = useContext(GenresContext)

  const genreOfFilm = (genreList) =>
    genreList.genres.find((item) => item.id === genreItem).name

  return <span className="genre-item">{genreOfFilm(genre)}</span>
}

export default Genres
