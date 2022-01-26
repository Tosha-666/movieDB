import React from 'react';




const MovieCard = function movieCard({title, release_date, overview, poster_path}){


    const minimize = `${overview.slice(0, overview.indexOf(' ', 175))} ... `

    return(<div className='layout'>
    <div >
            <img src={`http://image.tmdb.org/t/p/w500/${poster_path}`} alt='img' className='image'/>
        </div>
    <div className='description' >
        <span className='name'>{title}</span>
    <span className='date'>{release_date}</span>
    <span className='genre'>Action</span>
    <span className='about'>{minimize}</span>
    </div>
    </div>
    
)
        

}

export default MovieCard