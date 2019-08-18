import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/actions/auth';

 
const Logout = (props) => {

    useEffect(() => {
        return () => {
            props.logout();
        };
    }, [])

    return <Redirect to="/" />;
    
}

export default connect(null, { logout })(Logout);