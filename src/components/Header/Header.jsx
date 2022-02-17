import React from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'antd'

const Header = function header({ onchangeFilter, searhFilter }) {
  Header.defaultProps = {
    onchangeFilter: () => {},
    searhFilter: 'rated',
  }
  Header.propTypes = {
    onchangeFilter: PropTypes.func,
    searhFilter: PropTypes.string,
  }
  return (
    <header className="header">
      <Radio.Group value={searhFilter} onChange={onchangeFilter}>
        <Radio.Button value="search">Search</Radio.Button>
        <Radio.Button value="rated">Rated</Radio.Button>
      </Radio.Group>
    </header>
  )
}

export default Header
