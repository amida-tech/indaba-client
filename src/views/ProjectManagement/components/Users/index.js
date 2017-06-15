import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, SearchInput, Tabs, Tab } from 'grommet';

import UsersTab from './UsersTab';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
        };
    }
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
                <SearchInput
                    onDOMChange={evt => this.setState({ query: evt.target.value })}/>
                <Tabs>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <UsersTab {...this.props} />
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
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Users;
