import React, { useContext } from 'react'
import GenresContext from './genresContext'



const GenresCard = function genres({genreItem}){

    const  genreOfFilm =  (genreList) => {
        // const genreNames = genreList.filter(el =>genres.every(item=>item.id===el.id)
        //  const genreName = await genreList.find((item)=>item.id===genreItem)

               // return genreName
        //   )
          console.log(genreList)
      
    }

    return <GenresContext.Consumer> 
        { 
        (value)=>(
        <span>{genreOfFilm(value)}</span>
        )
     
     }
  
    </GenresContext.Consumer>
            
}

export default GenresCard