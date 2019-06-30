import React from 'react';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import Products from './Products/Products';
import './Layout.css';

const Layout = () => {
    return (
        <React.Fragment>
            <Header />
            <Navigation />
            <main>
                <Products />
            </main>
            <Footer />
        </React.Fragment>
    );
}

export default Layout;