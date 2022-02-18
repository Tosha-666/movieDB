import React from 'react'
import { Pagination } from 'antd'
import PropTypes from 'prop-types'
import './Paginate.scss'

const Paginate = function paginate({
  pageNumber,
  onchangePagination,
  totalPages,
  showTotal,
  error,
  filmsList,
}) {
  Paginate.defaultProps = {
    pageNumber: 1,
    onchangePagination: () => {},
    totalPages: 1,
    showTotal: () => {},
    error: '',
    filmsList: [],
  }
  Paginate.propTypes = {
    pageNumber: PropTypes.number,
    onchangePagination: PropTypes.func,
    totalPages: PropTypes.number,
    showTotal: PropTypes.func,
    error: PropTypes.string,
    filmsList: PropTypes.arrayOf(PropTypes.object),
  }

  if (!error && filmsList.length > 0) {
    return (
      <div className="pagination-container">
        <Pagination
          current={pageNumber}
          className="pagination"
          onChange={onchangePagination}
          size="large"
          total={totalPages}
          defaultPageSize={1}
          showTotal={showTotal}
          hideOnSinglePage={false}
          showSizeChanger={false}
          //   disabled
        />
      </div>
    )
  }
  return null
}

export default Paginate
