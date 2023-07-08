import React, { useState } from 'react';
import { PaginationProps } from './Pagination.type'
import { Inter } from 'next/font/google';
import styles from './Pagination.module.css';

const inter = Inter({ subsets: ['latin'] });

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const [displayedPages, setDisplayedPages] = useState(10); // Number of pages to display

    const renderPageNumbers = (): JSX.Element[] => {
        const pageNumbers: JSX.Element[] = [];
        const maxDisplayedPages = Math.min(totalPages, displayedPages);

        // Calculate the start and end indices of the displayed pages
        let startPage = Math.max(currentPage - Math.floor(maxDisplayedPages / 2), 1);
        let endPage = startPage + maxDisplayedPages - 1;
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(endPage - maxDisplayedPages + 1, 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li key={i} className={currentPage === i ? styles.active : ''}>
                    <button onClick={() => onPageChange(i)}>{i}</button>
                </li>
            );
        }
        return pageNumbers;
    };

    const goToPrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <ul className={[styles.pagination, inter.className].join(' ')}>
            {currentPage > 1 && (
                <li>
                    <button onClick={goToPrevPage}>{"<"}</button>
                </li>
            )}
            {renderPageNumbers()}
            {currentPage < totalPages && (
                <li>
                    <button onClick={goToNextPage}>{">"}</button>
                </li>
            )}
        </ul>
    );
};

export default Pagination;

