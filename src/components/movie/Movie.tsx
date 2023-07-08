import React from 'react';
import { Inter } from 'next/font/google';
import { MovieProps } from './Movie.type';
import styles from './Movie.module.css';
import { useRouter } from 'next/router';
import { getFromStorage, setInStorage } from '@/utils/storage';

const inter = Inter({ subsets: ['latin'] })

const Movie: React.FC<MovieProps> = (movie) => {
    const router = useRouter()

    const handleClick = () => {
        const findMovie = getFromStorage('lastViewed').find((m: MovieProps) => m.imdbID === movie.imdbID)
        if(!findMovie) {
            const movies = [...getFromStorage('lastViewed'), movie]
            setInStorage('lastViewed', movies)
        }
        router.push(`/view?imdbID=${movie.imdbID}`)
    }

    return (
        <div className={[styles.card, inter.className].join(' ')} onClick={handleClick}>
            <img src={movie.Poster === 'N/A' ? 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930' : movie.Poster} alt={movie.Title} className={styles.image} />
            <h3 className={styles.title}>{movie.Title}</h3>
            <p className={styles.type}>{movie.Type}<br />{movie.Year}</p>
        </div>
    )
}

export default Movie;
