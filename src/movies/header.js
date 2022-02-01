import React from 'react'
import { Radio } from 'antd'

const Header = function header({onchangeFilter}){
    return(
        <header className='header'>
        <Radio.Group onChange={onchangeFilter} >
          <Radio.Button value="search">Search</Radio.Button>
          <Radio.Button value="rated">Rated</Radio.Button>
          </Radio.Group>
        </header>
    )
}

export default Header