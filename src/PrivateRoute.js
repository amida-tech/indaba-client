import React from 'react';
import cookie from 'react-cookies';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if ((cookie.load('indaba-auth') === undefined || cookie.load('indaba-roleID') === undefined)) {
                    return (<Redirect to={{ pathname: '/login' }} />);
                }
                if (Component === undefined) {
                    return (<Redirect to={{ pathname: (cookie.load('indaba-roleID') === 2 ? '/project' : '/task') }}/>);
                }
                return (<Component {...props} />);
            }
            } />
    );
};
export default PrivateRoute;
