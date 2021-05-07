import React from 'react';
import {Route} from 'react-router-dom';
import Login from '../views/Login';


const PrivateRoute = ({accessable, element, ...props}) => {
    return <Route {...props} element={accessable ? element : <Login/>}/>
}

export default PrivateRoute;