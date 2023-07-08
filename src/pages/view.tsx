import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/View.module.css'
import { Service } from '@/config/service'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Movie } from '@/type/global.type'
import Loader from '@/components/loader/Loader'

const inter = Inter({ subsets: ['latin'] })

const initialMovieData: Movie = {
    // Provide initial movie data here
    Title: '',
    Year: '',
    Rated: '',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Writer: '',
    Actors: '',
    Plot: '',
    Language: '',
    Country: '',
    Awards: '',
    Poster: '',
    Ratings: [],
    Metascore: '',
    imdbRating: '',
    imdbVotes: '',
    imdbID: '',
    Type: '',
    DVD: '',
    BoxOffice: '',
    Production: '',
    Website: '',
    Response: '',
    totalSeasons: ''
};

export default function View() {
    const router = useRouter()
    const [movieData, setMovieData] = useState<Movie>(initialMovieData)
    const [loading, setLoading] = useState<boolean>(true)

    const getMovie = async () => {
        setLoading(true)
        try {
            const searchType = `i=${router.query?.imdbID}`;
            const result = await Service.searchMovie(searchType)
            if (result.Response === "True") {
                setMovieData(result)
            }
        } catch (error) {
            console.log('Inside Catch => ', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getMovie()
    }, [router.query])


    return (
        <>
            <Head>
                <title>OMDB Browser - Search</title>
                <meta name="description" content="View detail of a movie." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${styles.main} ${inter.className}`}>
                {!loading ? 
                    <div className={styles.movieContainer}>
                        <div className={styles.poster}>
                            <img src={movieData.Poster} alt={movieData.Title} />
                        </div>
                        <div className={styles.details}>
                            <h1>{movieData.Title}</h1>
                            <div className={styles.subDetails}>
                                {<p>
                                    <span className={styles.label}>Year:</span> {movieData.Year}
                                </p>}
                                <p>
                                    <span className={styles.label}>Type:</span> {movieData.Type}
                                </p>
                                <p>
                                    <span className={styles.label}>Language:</span> {movieData.Language}
                                </p>
                                {movieData.Type !== 'movie' && 
                                    <p>
                                        <span className={styles.label}>Total Seasons:</span> {movieData.totalSeasons}
                                    </p>
                                }
                                <p>
                                    <span className={styles.label}>Rated:</span> {movieData.Rated}
                                </p>
                                <p>
                                    <span className={styles.label}>Released:</span> {movieData.Released}
                                </p>
                                <p>
                                    <span className={styles.label}>Runtime:</span> {movieData.Runtime}
                                </p>
                                <p>
                                    <span className={styles.label}>Genre:</span> {movieData.Genre}
                                </p>
                                <p>
                                    <span className={styles.label}>Director:</span> {movieData.Director}
                                </p>
                                <p>
                                    <span className={styles.label}>Writer:</span> {movieData.Writer}
                                </p>
                                <p>
                                    <span className={styles.label}>Actors:</span> {movieData.Actors}
                                </p>
                            </div>
                            <div className={styles.plot}>
                                <h2>Plot</h2>
                                <p>{movieData.Plot}</p>
                            </div>
                            <div className={styles.ratings}>
                                <h2>Ratings</h2>
                                {movieData.Ratings.map((rating) => (
                                    <p key={rating.Source}>
                                        <span className={styles.source}>{rating.Source}:</span> {rating.Value}
                                    </p>
                                ))}
                            </div>
                            <div className={styles.additionalDetails}>
                                <p>
                                    <span className={styles.label}>Metascore:</span> {movieData.Metascore}
                                </p>
                                <p>
                                    <span className={styles.label}>IMDb Rating:</span> {movieData.imdbRating}
                                </p>
                                <p>
                                    <span className={styles.label}>IMDb Votes:</span> {movieData.imdbVotes}
                                </p>
                                <p>
                                    <span className={styles.label}>Box Office:</span> {movieData.BoxOffice}
                                </p>
                                <p>
                                    <span className={styles.label}>Production:</span> {movieData.Production}
                                </p>
                            </div>
                        </div>
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
