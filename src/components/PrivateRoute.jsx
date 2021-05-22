import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import useAuth from '../contexts/AuthContextProvider';


const PrivateRoute = ({path, ...props}) => {

    const {user} = useAuth();

    return user? <Route path={path} {...props} /> : <Navigate state={{from : path}} replace to="/login"/>
}

export default PrivateRoute;