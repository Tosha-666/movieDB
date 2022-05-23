import React, { useState, useEffect, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce'
import cookie from 'cookie_js'
import { Spin, Alert } from 'antd'

import { Paginate } from '../PaginationComponent'
import { Main } from '../Main'
import ThemoviedbAPI from '../../api'
import 'antd/dist/antd.min.css'
import GenresContext from '../../genresContext'
import './App.scss'

function App() {
  const apiService = new ThemoviedbAPI()

  const [label, setLabel] = useState('')
  const [filmsList, setFilmsList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searhFilter, setSearhFilter] = useState('rated')
  const [ratedFilms, setRatedFilms] = useState([])
  const [genres, setGenres] = useState([])
  const [guestId, setGuestId] = useState('')

  const onError = (err) => {
    setFilmsList([])
    setError(err.message)
    setLoading(false)
  }

  const setIdToCookie = (dataGuest) => {
    cookie.set('guest_session_id', dataGuest, {
      expires: 31,
    })
    setGuestId(dataGuest)
  }

  const getRated = async (id) => {
    const movies = await apiService.getRatedMovies(id)
    console.log(movies)
    setRatedFilms(movies.results)
  }

  useEffect(() => {
    if (!cookie.get('guest_session_id')) {
      apiService
        .getGuestSessionId()
        .then((res) => setIdToCookie(res.guest_session_id))
    } else {
      setGuestId(cookie.get('guest_session_id'))
    }
  }, [])

  useEffect(() => {
    guestId ? getRated(guestId) : null
  }, [guestId])
  // то что нужно=======================
  // useEffect(() => {
  //   label
  //     ? apiService
  //         .getResourse(label, pageNumber)
  //         .then((res) => {
  //           setFilmsList([...res.results])
  //           setLoading(false)
  //           setTotalPages(res.total_pages)
  //         })

  //         .catch(onError)
  //     : setLoading(false)
  // }, [label, pageNumber])
  // =================================
  const genreList = async () => {
    setGenres(await apiService.getGenres())
    // rateMenuSelection()
  }

  useEffect(() => {
    genreList()
  }, [])

  // const debouncedSearch = useCallback(
  //   () =>
  //     debounce((text) => {
  //       addSearchValue(text)
  //     }, 1000),
  //   [label]
  // )
  // +++++++++++++=======================
  const delayedQuery = useCallback(
    debounce((query) => sendQuery(query), 2000),
    []
  )

  const sendQuery = useCallback(
    async (q) => {
      if (q === '') return
      setLoading(true)
      console.log(q)
      apiService
        .getResourse(q, pageNumber)
        .then((res) => {
          setFilmsList([...res.results])
          setLoading(false)
          setTotalPages(res.total_pages)
        })
        .catch(onError)
    },
    [pageNumber]
  )

  useEffect(() => {
    delayedQuery(label, pageNumber) // (*)
  }, [label, pageNumber, delayedQuery])
  // ++++++++++++++++===========================

  //+++++++++++++++++++++++++++++++++++++++++
  // import { useState, useEffect, useCallback } from 'react';
  // import axios from 'axios';
  // import { MovieList } from 'types/types';
  // import { debounce } from 'lodash';

  // function useFetch(query: string, pageNum: number) {
  //   const [isLoading, setIsLoading] = useState(false);
  //   const [error, setError] = useState(false);
  //   const [list, setList] = useState<MovieList>([]);
  //   const [hasMore, setHasMore] = useState(false);

  //   const delayedQuery = useCallback(
  //     debounce((q: string) => sendQuery(q), 500), // (*)
  //     []
  //   );

  //   const sendQuery = useCallback(
  //     async (query: string): Promise<any> => {
  //       if (query === '') return;

  //       try {
  //         await setIsLoading(true);
  //         let res = await axios.get(url);
  //         await setList(prev => [...prev, ...res.data]);
  //         await setHasMore(data?.length > 0);
  //         setIsLoading(false);
  //       } catch (error) {
  //         setError(error);
  //       }
  //     },
  //     [pageNum]
  //   );

  //   useEffect(() => {
  //     setList([]);
  //   }, [query]);

  //   useEffect(() => {
  //     delayedQuery(query); // (*)
  //   }, [query, pageNum, delayedQuery]);

  //   return { isLoading, error, list, hasMore };
  // }

  // export default useFetch;

  //+++++++++++++++++++++++++++++++++++++++++
  // const delayedQuery = useCallback(
  //   debounce((q: string) => sendQuery(q), 500), // (*)
  //   []
  //   );

  // useEffect(() => {
  //   // console.log(label)
  //   // addSearchValue(label)
  //   // debounce(() => addSearchValue(label), 7000)
  //   addSearchValue(label)
  // }, [label])

  const onLabelChange = (e) => {
    setLabel(e.target.value)
    setLoading(true)
  }

  const onchangeFilter = (filter) => {
    setSearhFilter(filter)
  }

  const warningMessage = (er) => {
    switch (er) {
      case '422':
        return <Alert message="Enter text to search" type="warning" closable />
      case 'not found':
        if (filmsList.length !== 0) {
          return null
        }
        return <Alert message="Films not found" type="warning" closable />
      case 'Failed to fetch':
        return (
          <Alert
            message="Сheck your network connection"
            type="warning"
            closable
          />
        )

      default:
        return null
    }
  }

  const onchangePagination = (page) => {
    setPageNumber(page)
    // updateFilms(label, pageNumber)
  }

  const showTotal = (total) => `Total ${total} pages`

  const spinner = loading ? <Spin size="large" className="spinner" /> : null

  const paginationOnRate = () => {
    if (searhFilter === 'rated') {
      return null
    }
    return (
      <Paginate
        pageNumber={pageNumber}
        onchangePagination={onchangePagination}
        totalPages={totalPages}
        showTotal={() => showTotal()}
        error={error}
        filmsList={filmsList}
      />
    )
  }

  return (
    <main>
      <GenresContext.Provider value={genres}>
        <Main
          onchangeFilter={onchangeFilter}
          searhFilter={searhFilter}
          filmsList={filmsList}
          ratedFilms={ratedFilms}
          // onchangeRateFilm={onchangeRateFilm}
          onLabelChange={onLabelChange}
          label={label}
        />
      </GenresContext.Provider>

      {spinner}
      {warningMessage(error)}
      {paginationOnRate()}
    </main>
  )
}
export default App
