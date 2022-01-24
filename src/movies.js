import React from 'react';
import MovieCard from './movieCard';

const Movies = function movies({filmsList}){

const elements = filmsList.map((film)=>(
<MovieCard
{...film}
key={ film.id}
/>
))
return <div className='container'>{elements}</div>
}

export default Movies