import React, { useEffect, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import './Layout.css';

const Layout = (props) => {

    return (
        <React.Fragment>
            <BrowserRouter>
                <Header />
                <Navigation />
                <main>
                    {props.children}
                </main>
                <Footer />
            </BrowserRouter>
        </React.Fragment>
    );
}

export default Layout;