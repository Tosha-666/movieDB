import React from 'react'


export default class SearchInput extends React.Component {


  onLabelChange = this.props.onLabelChange

  handleClick = (e) => {
    this.onLabelChange(e)

  }

  render() {

    return (
      <input

        type="text"
        className="search-bar"
        onChange={this.handleClick}
      />

    )
  }
}
