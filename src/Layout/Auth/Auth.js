import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from '../../store/actions/index';
import Loader from '../Loader/Loader';
import withCartIndicator from '../../hoc/withCartIndicator';
import './Auth.css';

const Auth = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(true);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.auth(email, password);
    }

    const switchLoginRegister = (e) => {
        const tabs = document.querySelectorAll('.tabs span');
        console.log(e.target.getAttribute('data-number'));
        if (e.target.getAttribute('data-number') == "0") {
            setIsSignUp(true);
            tabs[0].classList.add('active');
            tabs[1].classList.remove('active');
        } 
        else {
            setIsSignUp(false);
            tabs[0].classList.remove('active');
            tabs[1].classList.add('active');
        }
    }


    let errorMessage = null;
    if (props.error){
        errorMessage = (
            <div className="error">{props.error.message}</div>
        );
    }

    let form = (
        <form onSubmit={onFormSubmit}>
            <div className="tabs">
                <span data-number="0" onClick={e => switchLoginRegister(e)} className="active">LOGIN</span>
                <span data-number="1" onClick={e => switchLoginRegister(e)}>REGISTER</span>
            </div>
            
            <div className="container">
                <label>
                    <span>Your Email:</span>
                    <input type="email" name="email" autoComplete="on" required onChange={onEmailChange} value={email} />
                </label>
                <label>
                    <span>Password:</span>
                    <input type="password" required onChange={onPasswordChange} value={password} />
                </label>
            </div>
            {errorMessage}
            <button type="submit">Login</button>
        </form>
    );

    if (props.loading){
        form = <Loader />
    }

    let authRedirect = null;
    if (props.isAuthenticated){
        authRedirect = <Redirect to='/' />
    }

    return (
        <div className="login-form">
            {authRedirect}
            {form}
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.authReducer.loading, 
        error: state.authReducer.error,
        isAuthenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps, { auth })(withCartIndicator(Auth));