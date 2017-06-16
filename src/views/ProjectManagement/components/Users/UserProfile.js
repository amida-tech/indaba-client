import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserProfile extends Component {
    render() {
        return (
            <div className='user-profile'>
            </div>
        );
    }
}

UserProfile.propTypes = {
    user: PropTypes.object.isRequired,
};

export default UserProfile;
