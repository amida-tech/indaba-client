import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab } from 'grommet';

import PMUsersTab from './PMUsersTab';

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
                <hr className='divider'/>
                <Tabs>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <PMUsersTab {...this.props} />
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

Users.propTypes = {
    vocab: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    project: PropTypes.object.isRequired,
};

export default Users;
