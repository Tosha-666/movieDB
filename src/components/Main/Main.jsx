import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'

import { Movies } from '../Movies'
import { SearchInput } from '../SearchInput'
import './Main.scss'

const Main = function Main({
  onchangeFilter,
  searhFilter,
  filmsList,
  getRated,
  onLabelChange,
  label,
  ratedFilms,
  rating,
}) {
  Main.defaultProps = {
    label: '',
    onLabelChange: () => {},
    onchangeRateFilm: () => {},
    filmsList: [],
    onchangeFilter: () => {},
    searhFilter: 'rated',
    ratedFilms: [],
    getRated: () => {},
    rating: {},
  }

  Main.propTypes = {
    label: PropTypes.string,
    onLabelChange: PropTypes.func,
    onchangeRateFilm: PropTypes.func,
    filmsList: PropTypes.arrayOf(PropTypes.object),
    onchangeFilter: PropTypes.func,
    searhFilter: PropTypes.string,
    ratedFilms: PropTypes.arrayOf(PropTypes.object),
    getRated: PropTypes.func,
    rating: PropTypes.object,
  }

  const { TabPane } = Tabs

  return (
    <header className="header">
      <Tabs
        defaultActiveKey={searhFilter}
        onChange={onchangeFilter}
        centered
        className="tabs"
      >
        <TabPane tab="Search" key="search">
          <SearchInput onLabelChange={onLabelChange} label={label} />
          <Movies filmsList={filmsList} getRated={getRated} rating={rating} />
        </TabPane>
        <TabPane tab="Rated" key="rated">
          <Movies filmsList={ratedFilms} rating={rating} />
        </TabPane>
      </Tabs>
    </header>
  )
}

export default Main
