import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tabs from '../../../../common/components/Tabs/Tabs';
import Tab from '../../../../common/components/Tabs/Tab';
import SelectGroupUsers from '../../../../common/components/SelectGroupUsers';
import UsersTab from './UsersTab';
import UserGroupsTab from './UserGroupsTab';

class AddUsers extends Component {
    render() {
        return (
            <div className='add-users'>
                {this.props.ui.showSelectGroupUsers
                    && <SelectGroupUsers
                        vocab={this.props.vocab}
                        users={this.props.project.users}
                        userGroups={this.props.project.userGroups}
                        allUsers={this.props.user.users}
                        onCancel={() => this.props.actions.showAddUserGroupWizardModal(false)}
                        onSave={(groupData) => {
                            this.props.actions.addUserGroup(
                                groupData,
                                this.props.project.id,
                                this.props.user.profile.organizationId,
                                this.props.vocab.ERROR,
                            );
                            this.props.actions.showAddUserGroupWizardModal(false);
                        }}/>}
                <hr className='divider' />
                <div className='add-users__control-row'>
                    {this.props.ui.tab === 1
                        && <button className='add-users__control-row-button'
                            onClick={() => this.props.actions.showAddUserGroupWizardModal(true)}>
                            <span>{this.props.vocab.PROJECT.CREATE_USER_GROUP}</span>
                        </button>
                    }
                    <button className='add-users__control-row-import-button' disabled>
                        <span>{this.props.vocab.PROJECT.IMPORT_USERS}</span>
                    </button>
                </div>
                <hr className='divider' />
                <p className='add-users__instructions add-users__instructions--top'>
                    {this.props.vocab.PROJECT.ADD_USERS_CLARIFICATION_1}
                </p>
                <p className='add-users__instructions add-users__instructions--bottom'>
                    {this.props.vocab.PROJECT.ADD_USERS_CLARIFICATION_2}
                </p>
                <Tabs onActive={this.props.actions.addUsersSetTab}
                    className='add-users__tabs'>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <UsersTab
                            vocab={this.props.vocab}
                            profile={this.props.user.profile}
                            projectId={this.props.project.id}
                            allUsers={this.props.user.users}
                            projectUsers={this.props.project.users}
                            filter={this.props.ui.usersFilter}
                            actions={this.props.actions} />
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <UserGroupsTab
                            vocab={this.props.vocab}
                            groups={this.props.project.userGroups}
                            allUsers={this.props.user.users}
                            actions={this.props.actions}
                            projectId={this.props.project.id}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

AddUsers.propTypes = {
    actions: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    project: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        userGroups: PropTypes.array.isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    user: PropTypes.shape({
        errorMessage: PropTypes.string,
        users: PropTypes.arrayOf(PropTypes.object).isRequired,
        profile: PropTypes.object.isRequired,
    }),
};

export default AddUsers;
