import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import { connect } from 'react-redux';

const RedirectRoute = ({ ...rest }) => {
    return (
        <Route
            {...rest}
            render={() => {
                if (cookie.load('indaba-auth') !== undefined) {
                    return (<Redirect to={{ pathname: '/project' }} />);
                }
                return (<Redirect to={{ pathname: '/login' }} />);
            }
            } />
    );
};

const mapStateToProps = state => ({
    profile: state.user.profile,
});

export default connect(mapStateToProps, null)(RedirectRoute);
