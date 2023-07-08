import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Recommend.module.css'
import Movie from '@/components/movie/Movie'
import { Service } from '@/config/service'
import { Fragment, useEffect, useState } from 'react'
import { Movies } from '@/type/global.type'
import Loader from '@/components/loader/Loader'

const inter = Inter({ subsets: ['latin'] })

export default function Recommend() {
  const [movies, setMovies] = useState<Movies[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const recommendMovies = async (search: string) => {
    setLoading(true)
    try {
      const searchType = `s=${search}`;
      const result = await Service.searchMovie(searchType)
      if (result.Response === "True") {
        if (result?.Search?.length >= 5) {
          setMovies(result?.Search)
        } else {
          generateRandomWord();
        }
      }
    } catch (error) {
      console.log('Inside Catch => ', error);
    } finally {
      setLoading(false)
    }
  }

  const generateRandomWord = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let word = '';
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * alphabet.length);
      word += alphabet[randomIndex];
    }
    console.log(word)
    recommendMovies(word)
  };

  useEffect(() => {
    recommendMovies('abc');

    //update recomendation every 24 hours
    const interval = setInterval(() => {
      generateRandomWord();
    }, 24 * 60 * 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  return (
    <>
      <Head>
        <title>OMDB Browser - Recommendations</title>
        <meta name="description" content="Get movie recommendations." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        {!loading ?
          <div className={styles.cardsContainer}>
            {movies.slice(0, 5).map(m =>
              <Fragment key={m.imdbID}>
                <Movie {...m} />
              </Fragment>
            )}
          </div>
          :
          <div>
            <Loader />
          </div>
        }
      </main>
    </>
  )
}

