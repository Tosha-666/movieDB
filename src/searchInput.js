import React from 'react'
import debounce from 'lodash.debounce'

export default class SearchInput extends React.Component {
  state = { value: '' }

  addSearchValue = this.props.addSearchValue

  loadingFunc = this.props.loadingFunc

  onLabelChange = (e) => {
    this.setState(
      {
        value: e.target.value,
      },
      debounce(() => this.addSearchValue(this.state.value), 700)
    )

  }

  handleClick = (e) => {
    this.onLabelChange(e)
    this.loadingFunc(this.state.value)

  }

  // debounce = require('lodash.debounce');

  // event => this.setState({value: event.target.value})

  render() {
const {value} = this.state
    return (
      <input
        value={value}
        type="text"
        className="search-bar"
        onChange={this.handleClick}
      />

    )
  }
}
