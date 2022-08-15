
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const authStatus = () => {
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


    },[user])

    return {loggedIn, checkStatus};

};


export default authStatus;







