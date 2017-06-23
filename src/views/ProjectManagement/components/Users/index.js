import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab } from 'grommet';
import update from 'immutability-helper';

import PMUsersTab from './PMUsersTab';
import SelectGroupUsers from '../../../../common/components/SelectGroupUsers';
import UserGroupList from '../../../../common/components/UserGroupList';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = { showAddUserGroup: false };
    }
    render() {
        return (
            <div className='users-tab'>
                {this.state.showAddUserGroup !== false &&
                    <SelectGroupUsers
                        allUsers={this.props.users}
                        users={this.props.project.users}
                        vocab={this.props.vocab}
                        onCancel={() => this.setState({ showAddUserGroup: false })}
                        group={this.props.project.userGroups
                            .find(group => group.id === this.state.showAddUserGroup)}
                        onSave={this.state.showAddUserGroup === true ?
                            this.props.onAddGroup :
                            group => this.props.onUpdateGroup(update(group,
                                { $merge: { id: this.state.showAddUserGroup } })) }/>
                }
                <Button
                    label={this.props.vocab.PROJECT.ADD_USER}
                    primary/>
                <Button
                    label={this.props.vocab.PROJECT.ADD_USER_GROUP}
                    primary
                    onClick={() => this.setState({ showAddUserGroup: true })}/>
                <hr className='divider'/>
                <Tabs>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <PMUsersTab {...this.props} />
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <UserGroupList columnHeaders={true}
                            groups={this.props.project.userGroups}
                            users={this.props.users}
                            vocab={this.props.vocab}
                            onDeleteClick={this.props.onDeleteGroup}
                            onGroupClick={groupId =>
                                this.setState({ showAddUserGroup: groupId })} />
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
    onDeleteGroup: PropTypes.func.isRequired,
    onAddGroup: PropTypes.func.isRequired,
    onUpdateGroup: PropTypes.func.isRequired,
};

export default Users;
