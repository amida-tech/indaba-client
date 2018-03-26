import React from 'react';
import cookie from 'react-cookies';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                return (cookie.load('indaba-auth') === undefined ?
                    <Redirect to={{ pathname: '/login' }} /> :
                    <Component {...props} />
                );
            }
            } />
    );
};
export default PrivateRoute;
