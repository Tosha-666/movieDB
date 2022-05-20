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
  onchangeRateFilm,
  onLabelChange,
  label,
  ratedFilms,
}) {
  Main.defaultProps = {
    label: '',
    onLabelChange: () => {},
    onchangeRateFilm: () => {},
    filmsList: [],
    onchangeFilter: () => {},
    searhFilter: 'rated',
    ratedFilms: [],
  }

  Main.propTypes = {
    label: PropTypes.string,
    onLabelChange: PropTypes.func,
    onchangeRateFilm: PropTypes.func,
    filmsList: PropTypes.arrayOf(PropTypes.object),
    onchangeFilter: PropTypes.func,
    searhFilter: PropTypes.string,
    ratedFilms: PropTypes.arrayOf(PropTypes.object),
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
          <Movies filmsList={filmsList} onchangeRateFilm={onchangeRateFilm} />
        </TabPane>
        <TabPane tab="Rated" key="rated">
          <Movies filmsList={ratedFilms} onchangeRateFilm={onchangeRateFilm} />
        </TabPane>
      </Tabs>
    </header>
  )
}

export default Main
