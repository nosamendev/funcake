import { AUTH_SUCCESS, AUTH_FAILED, AUTH_LOGOUT, AUTH_EMAIL, AUTH_START } from './types';
import axios from 'axios';

export const authSuccess = (token, userId) => {
    return {
        type: AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

export const authFailed = (error) => {
    return {
        type: AUTH_FAILED,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    return {
        type: AUTH_LOGOUT
    }
}

export const authEmail = (email) => {
    return {
        type: AUTH_EMAIL,
        payload: email
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000);//in ms
    }
}

export const auth = (email, password, isSignup) => async dispatch => {    
    dispatch({type: AUTH_START});
    dispatch({type: AUTH_EMAIL, payload: email});

    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };
    
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBcokUkpmxyWWEool1f033ZRNPPXKaM9pg';
    if (!isSignup){
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBcokUkpmxyWWEool1f033ZRNPPXKaM9pg';
    }
    
    try {
        const response = await axios.post(url, authData);
        //1 hour:
        const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        localStorage.token = response.data.idToken;
        localStorage.expirationDate = expirationDate;
        localStorage.userId = response.data.localId;
        localStorage.email = response.data.email;
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
    }
    catch(error) {
        dispatch(authFailed(error.response.data.error));
    }       
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.token;
        if (!token) {
            dispatch(logout());
        }
        else {
            const expirationDate = new Date(localStorage.expirationDate);//to convert it to obj.
            if (expirationDate <= new Date()){
                dispatch(logout());
            }
            else {
                const userId = localStorage.userId;
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
            
        }
    }
}