import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserStatus extends Component {
    render() {
        return (
            <div className='user-status'></div>
        );
    }
}

UserStatus.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserStatus;
