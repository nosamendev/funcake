import React from 'react';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import './Layout.css';

const Layout = (props) => {

    return (
        <React.Fragment>
            <Header />
            <Navigation />
            <main>
                {props.children}
            </main>
            <Footer />
        </React.Fragment>
    );
}

export default Layout;