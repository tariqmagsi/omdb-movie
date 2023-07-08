import React from 'react';
import { Inter } from 'next/font/google';
import styles from './Footer.module.css';

const inter = Inter({ subsets: ['latin'] })

const Footer: React.FC = () => <div className={[styles.footer, inter.className].join(' ')}>
    <div className={styles.footerContent}>
        <p>&copy; {new Date().getFullYear()} OMDB. All rights reserved.</p>
    </div>
</div>


export default Footer;
