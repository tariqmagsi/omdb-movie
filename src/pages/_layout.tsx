import React, { PropsWithChildren } from 'react';
import NavBar from '@/components/navbar/NavBar';
import { ToastContainer } from 'react-toastify';
import Footer from '@/components/footer/Footer';

const Layout: React.FC<PropsWithChildren> = ({ children }) => (
  <>
    <NavBar />
    <main>
      <ToastContainer position='bottom-left'/>
      {children}
    </main>
    <footer>
      <Footer />
    </footer>
  </>
)

export default Layout;
