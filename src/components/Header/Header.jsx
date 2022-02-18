import React from 'react'
import PropTypes from 'prop-types'
import { Radio, Tabs } from 'antd'
import './Header.scss'

const Header = function header({ onchangeFilter, searhFilter, addSearchValue, updateRated }) {

  Header.defaultProps = {
    onchangeFilter: () => {},
    searhFilter: 'rated',
  }

  Header.propTypes = {
    onchangeFilter: PropTypes.func,
    searhFilter: PropTypes.string,
  }

//  const { TabPane } = Tabs;

  return (
    <header className="header">
      {/* <Tabs defaultActiveKey={searhFilter} onChange={onchangeFilter}>
    <TabPane tab="Search" key="search">
      {addSearchValue}
    </TabPane>
    <TabPane tab="Rated" key="rated">
      {updateRated()}
    </TabPane>
    </Tabs> */}


 <Radio.Group value={searhFilter} onChange={onchangeFilter}>
        <Radio.Button 
          value="search" 
          className='button-filter'>Search</Radio.Button>
        <Radio.Button 
          value="rated" 
          className='button-filter'>Rated</Radio.Button>
      </Radio.Group>
    </header>
  )
}

export default Header
