import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Tabs, Tab } from 'grommet';

import Summary from '../../../../common/components/Summary';
import SelectGroupUsers from '../../../../common/components/SelectGroupUsers';
import UsersTab from './UsersTab';
import UserGroupsTab from './UserGroupsTab';

class AddUsers extends Component {
    render() {
        return (
            <div className='add-users'>
                {this.props.ui.showSelectGroupUsers &&
                    <SelectGroupUsers
                        vocab={this.props.vocab}
                        users={this.props.project.users}
                        allUsers={this.props.allUsers}
                        onCancel={() => this.props.actions.addUsersShowSelectGroupUsers(false)}
                        onSave={(role) => {
                            this.props.actions.addUserGroupToWizard(role);
                            this.props.actions.addUsersShowSelectGroupUsers(false);
                        }}/>}
                <Summary
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <hr className='divider' />
                <div className='add-users__button-panel'>
                    {this.props.ui.tab === 1 &&
                        <Button className='add-users__button-panel-button'
                            label={this.props.vocab.PROJECT.CREATE_USER_GROUP}
                            primary
                            onClick={() => this.props.actions.addUsersShowSelectGroupUsers(true)}/>}
                    <Button className='add-users__button-panel-button'
                        label={this.props.vocab.PROJECT.IMPORT_USERS} />
                </div>
                <hr className='divider' />
                {this.props.vocab.PROJECT.ADD_USERS_CLARIFICATION.map(sentence =>
                    <p key={sentence} className='add-users__clarification'>
                        {sentence}
                    </p>,
                )}
                <Tabs onActive={this.props.actions.addUsersSetTab}>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <UsersTab
                            vocab={this.props.vocab}
                            allUsers={this.props.allUsers}
                            projectUsers={this.props.project.users}
                            filter={this.props.ui.usersFilter}
                            actions={this.props.actions} />
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <UserGroupsTab
                            vocab={this.props.vocab}
                            groups={this.props.project.userGroups}
                            filter={this.props.ui.groupsFilter}
                            allUsers={this.props.allUsers}
                            actions={this.props.actions} />
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
        userGroups: PropTypes.array.isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AddUsers;
