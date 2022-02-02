import React from 'react'
import { Rate } from 'antd';

const MovieCard = function movieCard({
  id,
  title,
  release_date,
  overview,
  poster_path,
  onchangeRate
}) 
{
  const minimize = `${overview.slice(0, overview.indexOf(' ', 175))} ... `
  const rateId = (value)=>{
    onchangeRate(value, id)
  }
  return (
    <div className="layout">
      <div>
        <img
          src={`http://image.tmdb.org/t/p/w500/${poster_path}`}
          alt="img"
          className="image"
        />
      </div>
      <div className="description">
        <span className="name">{title}</span>
        <span className="date">{release_date}</span>
        <span className="genre">Action</span>
        <span className="about">{minimize}</span>
        <Rate 
        defaultValue={0} 
        className='rate'
        onChange={rateId}/>
      </div>
    </div>
  )
}

export default MovieCard
