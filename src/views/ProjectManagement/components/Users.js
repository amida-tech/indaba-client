import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';

class Users extends Component {
    render() {
        return (
            <div className='users-tab'>
                <Button
                    label={this.props.vocab.PROJECT.ADD_USER}
                    primary/>
                <Button
                    label={this.props.vocab.PROJECT.ADD_USER_GROUP}
                    primary/>
            </div>
        );
    }
}

Users.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Users;
