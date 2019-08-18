import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
        	<Link to="/" className="logo"></Link>
			<div className="welcome">
            	<div>Our menu includes trusted signature flavors as well as seasonal and monthly favorites all made fresh daily using local, real ingredients!</div>
            </div>
		</header>
    );
}

export default Header;