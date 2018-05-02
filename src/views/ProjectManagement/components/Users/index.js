import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
// import { Button, Tabs, Tab } from 'grommet';

import PMUsersTab from './PMUsersTab';
import PMUserGroupsTab from './PMUserGroupsTab';
import Tabs from '../../../../common/components/Tabs/Tabs';
import Tab from '../../../../common/components/Tabs/Tab';
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
                        userGroups={this.props.project.userGroups}
                        vocab={this.props.vocab}
                        onCancel={() => this.setState({ modalName: false })}
                        group={this.props.project.userGroups
                            .find(group => group.id === this.state.modalId)}
                        onSave={(group) => {
                            if (this.state.modalName === 'addgroup') {
                                this.props.actions.addUserGroup(
                                    group,
                                    this.props.project.id,
                                    this.props.profile.organizationId,
                                    this.props.vocab.ERROR);
                            } else {
                                this.props.actions.updateUserGroup(
                                    this.state.modalId,
                                    group,
                                    this.props.project.id,
                                    this.props.profile.organizationId,
                                    this.props.vocab.ERROR,
                                );
                            }
                            this.setState({ modalName: false });
                        }}/>
                }
                {
                    this.state.modalName === 'adduser' &&
                    <AddUserModal vocab={this.props.vocab}
                        onCancel={() => this.setState({ modalName: false })}
                        onSave={() => this.setState({ modalName: false })}
                        actions={this.props.actions}
                        projectId={this.props.project.id}
                        organizationId={this.props.profile.organizationId}/>
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
                            onDeleteClick={this.props.actions.deleteUserGroup}
                            onGroupClick={groupId =>
                                this.setState({ modalName: 'updategroup', modalId: groupId }) }
                            ui={this.props.ui}
                            actions={this.props.actions}/>
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
    profile: PropTypes.shape({
        organizationId: PropTypes.number.isRequired,
    }),
    actions: PropTypes.shape({
        addNewUser: PropTypes.func.isRequired,
        addUserGroup: PropTypes.func.isRequired,
        deleteUserGroup: PropTypes.func.isRequired,
        updateUserGroup: PropTypes.func.isRequired,
        removeUser: PropTypes.func.isRequired,
    }).isRequired,
    ui: PropTypes.object.isRequired,
};

export default Users;
