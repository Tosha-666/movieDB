import React from 'react'
import PropTypes from 'prop-types'

export default class SearchInput extends React.Component {
  static defaultProps = {
    label: '',
    onLabelChange: () => {},
  }

  static propTypes = {
    onLabelChange: PropTypes.func,
    label: PropTypes.string,
  }

  onLabelChange = this.props.onLabelChange

  handleClick = (e) => {
    this.onLabelChange(e)
  }

  render() {
    const { label } = this.props
    return (
      <input
        type="text"
        className="search-bar"
        onChange={this.handleClick}
        value={label}
      />
    )
  }
}
