
import React, { useContext } from 'react'
import GenresContext from './genresContext'



const GenresCard = function genres({genreItem}){



    
const  genreOfFilm =  (genreList) => { 
     console.log(genreList)
     }
    // genreList.then(
    //         result =>{
    //             const genreName =  result.genres.find((item)=>item.id===genreItem)
              
                // resolve(genreName)
                //  .then((res)=>res.name)
                // resolve(genreName) 
                // console.log(; 
            // }
            // )
     

    return <GenresContext.Consumer> 
        { 
        (value)=>(
        <span>{genreOfFilm(value)}</span>
        )
     
     }
  
    </GenresContext.Consumer>
            
}

export default GenresCard