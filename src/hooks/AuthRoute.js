import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ component: Component,userAuth,currentpath, ...rest}) => (
    <Route {...rest} render={props =>(userAuth && userAuth != null && currentpath) ? <Redirect to={currentpath} />  : <Component {...props} />} />
)
export default AuthRoute;