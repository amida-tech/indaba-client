import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab } from 'grommet';
import update from 'immutability-helper';

import PMUsersTab from './PMUsersTab';
import PMUserGroupsTab from './PMUserGroupsTab';
import AddUserModal from '../../../../common/components/AddUserModal';
import SelectGroupUsers from '../../../../common/components/SelectGroupUsers';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = { modalName: false };
    }
    render() {
        return (
            <div className='users'>
                {(this.state.modalName === 'addgroup' ||
                    this.state.modalName === 'updategroup') &&
                    <SelectGroupUsers
                        allUsers={this.props.users}
                        users={this.props.project.users}
                        vocab={this.props.vocab}
                        onCancel={() => this.setState({ modalName: false })}
                        group={this.props.project.userGroups
                            .find(group => group.id === this.state.modalId)}
                        onSave={(group) => {
                            if (this.state.modalName === 'addgroup') {
                                this.props.onAddGroup(group, this.props.project.id);
                            } else {
                                this.props.onUpdateGroup(update(group,
                                    { $merge: { id: this.state.modalId } }), this.props.project.id);
                            }
                            this.setState({ modalName: false });
                        }}/>
                }
                {
                    this.state.modalName === 'adduser' &&
                    <AddUserModal vocab={this.props.vocab}
                        onCancel={() => this.setState({ modalName: false })}
                        onSave={() => this.setState({ modalName: false })}
                        onAddNewUser={this.props.onAddNewUser}
                        onAddUserToProject={this.props.onAddUserToProject}
                        projectId={this.props.project.id}/>
                }
                <div className='users__action-btn'>
                    <Button className='users__action-btn--left'
                        label={this.props.vocab.PROJECT.ADD_USER}
                        primary
                        onClick={() => this.setState({ modalName: 'adduser' })}/>
                    <Button className='users__action-btn--right'
                        label={this.props.vocab.PROJECT.ADD_USER_GROUP}
                        primary
                        onClick={() => this.setState({ modalName: 'addgroup' })}/>
                </div>
                <hr className='divider'/>
                <Tabs justify='start'>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <PMUsersTab {...this.props}/>
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <PMUserGroupsTab columnHeaders={true}
                            project={this.props.project}
                            users={this.props.users}
                            vocab={this.props.vocab}
                            projectId={this.props.project.id}
                            onDeleteClick={this.props.onDeleteGroup}
                            onGroupClick={groupId =>
                                this.setState({ modalName: 'updategroup', modalId: groupId }) } />
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
    onAddNewUser: PropTypes.func.isRequired,
    onAddUserToProject: PropTypes.func.isRequired,
    onRemoveUserFromProject: PropTypes.func.isRequired,
};

export default Users;
