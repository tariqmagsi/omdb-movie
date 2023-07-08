import React from 'react';
import { Inter } from 'next/font/google';
import { SearchBarProps } from './SearchBar.type'
import styles from './SearchBar.module.css'

const inter = Inter({ subsets: ['latin'] })

const renderYearOptions = () => {
  const options = [];
  for (let year = 2023; year >= 1900; year--) {
    options.push(
      <option key={year} value={year}>
        {year}
      </option>
    );
  }
  return options;
};

const SearchBar: React.FC<SearchBarProps> = ({ search, movieType, year, handleSubmit, handleInputChange, handleSelectChange }) => <form className={[styles.container, inter.className].join(' ')} onSubmit={handleSubmit}>
  <input
    type="text"
    className={styles.input}
    placeholder="Search Movies (atleast 3 letters)"
    value={search}
    onChange={handleInputChange}
  />
  <select name='movieType' value={movieType} style={{color: movieType.length ? movieType : 'silver'}} onChange={handleSelectChange} className={styles.select}>
    <option value="">All Types</option>
    <option value="movie">Movies</option>
    <option value="series">Series</option>
    <option value="episode">Episodes</option>
  </select>
  <select name='year' value={year} style={{color: year.length ? year : 'silver'}} onChange={handleSelectChange} className={styles.select}>
    <option value="">Year</option>
    {renderYearOptions()}
  </select>
  <button disabled={search.trim().length < 3} style={{backgroundColor: search.trim().length < 3 ? 'silver' : ''}} type="submit" className={styles.button}>
    Search
  </button>
</form>


export default SearchBar;
