import React from 'react'
import { Pagination } from 'antd'

const Paginate = function paginate({pageNumber, onchangePagination, totalPages, showTotal, error, filmsList}){
if (!error&&filmsList.length>0){
    return <div className='pagination-container'>
    <Pagination 
  current={pageNumber}
  className='pagination'
  onChange={onchangePagination}
  size='large'
  total={totalPages} 
  defaultPageSize = {1}
  showTotal={showTotal}
  hideOnSinglePage = {false}
  showSizeChanger = {false}
//   disabled
  />
  </div>
}
return null
    
}

export default Paginate