import React from 'react';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props =>
                (this.props.profile.roleID === 3 ?
                    <Redirect
                        to={{ pathname: '/task' }} /> :
                    <Component {...props} />
                )} />
    );
};

export default PrivateRoute;
