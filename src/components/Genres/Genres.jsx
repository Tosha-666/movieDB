
import React from 'react'
import GenresContext from '../../genresContext'



const GenresCard = function genres({genreItem}){


    const  genreOfFilm = (genreList) =>(genreList.genres.find((item)=>item.id===genreItem).name)
         

    return <GenresContext.Consumer> 
        { 
        (value)=>(
        <span>{genreOfFilm(value)}</span>
        )
     
     }
  
    </GenresContext.Consumer>
            
}

export default GenresCard