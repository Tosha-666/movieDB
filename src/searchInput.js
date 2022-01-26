import React from 'react';
import debounce from 'lodash.debounce';



export default class SearchInput extends React.Component{
    state = { value: '' }
    
    updateFilms = this.props.updateFilms

    loadingFunc = this.props.loadingFunc

    
    onLabelChange = (e) => {
      this.setState({
        value: e.target.value,
      }, (debounce(()=>this.updateFilms(this.state.value), 700))
      )
    }


  // debounce = require('lodash.debounce');

  // event => this.setState({value: event.target.value})

    render() {

      return (

        // <form onSubmit={this.onSubmiteForm}>
          <input
            value={this.state.value}
            type="text"
            className="search-bar"
            onChange={this.onLabelChange}
            
          />
        // </form>
      )
    }
}