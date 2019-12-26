import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import './Navigation.css';

export const Navigation = (props) => {

    return (
        <nav>
			<ul>
				<li><NavLink exact to="/">CAKES</NavLink></li>
				<li><NavLink to="/about">ABOUT</NavLink></li>
				{props.isAuthenticated
					? <li><NavLink exact to="/orders">MY ORDERS</NavLink></li> : null
				}
			</ul>
			<ul>
				{!props.isAuthenticated
					? <li><NavLink exact to="/auth">AUTH</NavLink></li>
					: <li><span className="user-email">{localStorage.email}</span><NavLink exact to="/logout">LOGOUT</NavLink></li>
				}
				<li><NavLink className={props.isCartLoaded ? "cart full" : "cart"} to="/cart">CART<span></span></NavLink></li>
			</ul>
			
			{props.isAuthenticated
					? <span className="user-email mobile">{localStorage.email}</span> : null
			}
			<div className="mobile-menu">
				
				<span className="menu"></span>
				
				<ul>
					<li><NavLink exact to="/">HOME</NavLink></li>
					<li><NavLink to="/about">ABOUT</NavLink></li>
					{props.isAuthenticated
						? <li><NavLink exact to="/orders">MY ORDERS</NavLink></li> : null
					}
					{!props.isAuthenticated
						? <li><NavLink exact to="/auth">AUTH</NavLink></li>
						: <li><NavLink exact to="/logout">LOGOUT</NavLink></li>
					}
					<li><NavLink className={props.isCartLoaded ? "cart full" : "cart"} to="/cart">CART<span></span></NavLink></li>
				</ul>
			</div>
		</nav>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null,
		email: state.authReducer.email,
		isCartLoaded: state.cartStatusReducer.isCartLoaded
    }
}

export default connect(mapStateToProps, null)(Navigation);