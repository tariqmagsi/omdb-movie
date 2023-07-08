import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Search.module.css'
import Movie from '@/components/movie/Movie'
import Searchbar from '@/components/searchbar/SearchBar'
import { ChangeEvent, FormEvent, Fragment, useCallback, useEffect, useState } from 'react'
import Pagination from '@/components/pagination/Pagination'
import { Service } from '@/config/service'
import { Movies } from '@/type/global.type'
import Loader from '@/components/loader/Loader'
import { getFromStorage } from '@/utils/storage'

const inter = Inter({ subsets: ['latin'] })

export default function Search() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('')
  const [searching, setSearching] = useState<boolean>(true)
  const [movieType, setMovieType] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const [totalPages, setTotalPages] = useState<number>(0);
  const [movies, setMovies] = useState<Movies[]>([]);
  const [isLoadedFirstTime, setIsLoadedFirstTime] = useState<boolean>(true)

  //change handle for input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  //change handle for select
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === 'movieType')
      setMovieType(e.target.value)
    else
      setYear(e.target.value)
  }

  //saerch api call
  const handleSearchMovies = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchMovies(search, 1);
  }

  const searchMovies = async (searchText: string, currentPage: number) => {
    setSearching(true)
    if (currentPage === 1) {
      setCurrentPage(1)
      setTotalPages(0)
    }
    console.log(isLoadedFirstTime)
    try {
      const searchType = `s=${searchText}&type=${movieType}&y=${year}&page=${currentPage}`;
      const result = await Service.searchMovie(searchType)
      if (result.Response === "True") {
        if (!isLoadedFirstTime) {
          setTotalPages(Math.ceil((result?.totalResults / 10)))
        }
        setMovies(result?.Search)
      } else {
        setCurrentPage(1);
        setTotalPages(0);
        setMovies([]);
      }
    } catch (error) {
      console.log('Inside Catch => ', error);
    } finally {
      setIsLoadedFirstTime(false)
      setSearching(false)
    }
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    searchMovies(search, pageNumber);
  };

  const lastViewed = () => {
    setTotalPages(0)
    setCurrentPage(1)
    setMovies(getFromStorage('lastViewed'))
  }

  useEffect(() => {
    searchMovies('abc', 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Head>
        <title>OMDB Browser - Search</title>
        <meta name="description" content="Search the OMDB database." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Search</h1>
        <Searchbar search={search} movieType={movieType} handleSubmit={handleSearchMovies} handleInputChange={handleInputChange} handleSelectChange={handleSelectChange} year={year} />
        {getFromStorage('lastViewed') && 
          <button onClick={lastViewed} className={styles.button}>
            Last Viewed
          </button>
        }
        {searching && 
          <div>
            <Loader />
          </div>
        }
        {!searching && 
          <div className={styles.cardsContainer}>
            {!movies.length &&
              <h1>
                No Movies Found!
              </h1>
            }
            {movies.map(m =>
              <Fragment key={m.imdbID}>
                <Movie {...m} />
              </Fragment>
            )}
          </div>
        }

      {!searching && 
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      }


      </main>
    </>
  )
}
