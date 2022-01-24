import React from 'react';




const MovieCard = function movieCard({title, release_date, overview, poster_path}){


return(<div className='layout'>
    <div className='image'>
            <img src={poster_path} alt='img'/>
        </div>
    <div className='description' >
        <span className='name'>{title}</span>
    <span className='date'>{release_date}</span>
    <span className='genre'>Action</span>
    <span className='about'>{overview}</span>
    </div>
    </div>
    
)
        


    





// return(
//     <section className='movie-list'>{filmsRender}</section>
// )
}

export default MovieCard