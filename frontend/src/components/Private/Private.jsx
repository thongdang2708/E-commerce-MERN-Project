import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Spinner from '../layouts/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
const PrivateForUser = () => {

    let [loggedIn, setLoggedIn] = useState(false);
    let [checkStatus, setCheckStatus] = useState(true);

    let {user} = useSelector(state => state.user);

    useEffect(() => {

        if (user) {
            setLoggedIn(true);
        }  else {
            setLoggedIn(false);
        }

        setCheckStatus(false);


    },[user]);

    if (checkStatus) {
        return (<Spinner />)
    };

    return loggedIn ? <Outlet /> : <Navigate to="/login"/>

};

export default PrivateForUser