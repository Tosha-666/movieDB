import React from 'react';
import ThemoviedbAPI from './services/api';

export default class SearchInput extends React.Component{
    state = { value: '' }

    // apiService = new ThemoviedbAPI()

    updateFilms = this.props.updateFilms


    
    onSubmiteForm = (e) => {
      e.preventDefault()
      // console.log(this.state.value);
      this.updateFilms(this.state.value)
    }
  
    // onLabelChange = (e) => {
    //   this.setState({
    //     value: e.target.value,
    //   })
     
    // }
  
  

    render() {
      

      return (
        <form onSubmit={this.onSubmiteForm}>
          <input
            value={this.state.value}
            type="text"
            className="search-bar"
            onChange={event => this.setState({value: event.target.value})}
            
          />
        </form>
      )
    }
}