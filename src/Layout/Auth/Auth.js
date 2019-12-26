import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { auth } from '../../store/actions/index';
import Loader from '../Loader/Loader';
import './Auth.css';

const Auth = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);

    const loginRef = useRef(null);
    const registerRef = useRef(null);

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        props.auth(email, password, isSignUp);
    }

    const switchLoginRegister = (e) => {

        if (e.target == loginRef.current) {
            setIsSignUp(false);
            loginRef.current.classList.add('active');
            registerRef.current.classList.remove('active');
        } 
        else {
            setIsSignUp(true);
            loginRef.current.classList.remove('active');
            registerRef.current.classList.add('active');
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
                <span ref={loginRef} data-number="0" onClick={e => switchLoginRegister(e)} className={!isSignUp ? "active" : ""}>LOGIN</span>
                <span ref={registerRef} data-number="1" onClick={e => switchLoginRegister(e)} className={isSignUp ? "active" : ""}>REGISTER</span>
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

export default connect(mapStateToProps, { auth })(Auth);