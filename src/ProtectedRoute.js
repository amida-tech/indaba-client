import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { connect } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (rest.profile.roleID === 3) {
                    return (<Redirect to={{ pathname: '/task' }} />);
                } else if (cookie.load('indaba-auth') === undefined) {
                    return (<Redirect to={{ pathname: '/login' }} />);
                }
                return (<Component {...props} />);
            }
            } />
    );
};

const mapStateToProps = state => ({
    profile: state.user.profile,
});

export default connect(mapStateToProps, null)(ProtectedRoute);
