import React from 'react'
import PropTypes from 'prop-types'
import './SearchInput.scss'

const SearchInput = function SearchInput({ label, onLabelChange }) {
  SearchInput.defaultProps = {
    label: '',
    onLabelChange: () => {},
  }

  SearchInput.propTypes = {
    onLabelChange: PropTypes.func,
    label: PropTypes.string,
  }

  const handleClick = (e) => {
    onLabelChange(e)
  }

  return (
    <input
      type="text"
      className="search-bar"
      onChange={handleClick}
      value={label}
    />
  )
}

export default SearchInput
