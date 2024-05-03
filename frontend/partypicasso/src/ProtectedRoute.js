import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";

export const UserProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkUserToken = () => {
        const userToken = localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userToken || userToken === 'undefined') {
            setIsLoggedIn(false);
            return navigate('/welogin');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {isLoggedIn ? props.children : null}
        </React.Fragment>
    );
}

export const HostProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkHostRole = () => {
        const userToken = localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userToken || userInfo.data.role !== 'host') {
            setIsLoggedIn(false);
            return navigate('/welogin');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkHostRole();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {isLoggedIn ? props.children : null}
        </React.Fragment>
    );
}

export const AdminProtectedRoute = (props) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkAdminRole = () => {
        const userToken = localStorage.getItem('token');
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (!userInfo || !userToken || userInfo.data.role !== 'admin') {
            setIsLoggedIn(false);
            return navigate('/welogin');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkAdminRole();
    }, [isLoggedIn]);

    return (
        <React.Fragment>
            {isLoggedIn ? props.children : null}
        </React.Fragment>
    );
}
