import React from 'react';
import { Inter } from 'next/font/google';
import styles from './Loader.module.css';

const inter = Inter({ subsets: ['latin'] })

const Loader: React.FC = () => <div className={[styles.spin, inter.className].join(' ')}></div>


export default Loader;
