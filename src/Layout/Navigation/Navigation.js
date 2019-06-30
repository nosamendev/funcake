import React from 'react';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav>
			<ul>
				<li><a href="">HOME</a></li>
				<li><a href="">ABOUT</a></li>
				<li><a href="">MY ORDERS</a></li>
			</ul>
			<ul>
				<li><a href="">LOGIN</a> / </li>
				<li><a href="">SIGNUP</a></li>
				<li><a href="">CART</a></li>
			</ul>
			<div className="mobile-menu">
				<span></span>
				<ul>
					<li><a href="">HOME</a></li>
					<li><a href="">ABOUT</a></li>
					<li><a href="">MY ORDERS</a></li>
					<li><a href="">LOGIN</a></li>
					<li><a href="">SIGNUP</a></li>
					<li><a href="">CART</a></li>
				</ul>
			</div>
		</nav>
    );
}

export default Navigation;