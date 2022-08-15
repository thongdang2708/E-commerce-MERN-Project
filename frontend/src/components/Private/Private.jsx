import React from 'react';
import { Outlet } from 'react-router-dom';
import authStatus from '../../hooks/AuthStatus';
import { Navigate } from 'react-router-dom';
import Spinner from '../layouts/Spinner';

const PrivateForUser = () => {

    let {loggedIn, checkStatus} = authStatus();

    if (checkStatus) {
        return (<Spinner />)
    };

    return loggedIn ? <Outlet /> : <Navigate to="/login"/>

};

export default PrivateForUser