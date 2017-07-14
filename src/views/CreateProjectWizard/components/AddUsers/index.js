import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Button, Tabs, Tab } from 'grommet';
import Summary from '../../../../common/components/Summary';
import SelectGroupUsers from '../../../../common/components/SelectGroupUsers';
import UsersTab from './UsersTab';
import UserGroupsTab from './UserGroupsTab';
import {
    addUserToWizard,
    removeUserFromWizard,
    addUserGroupToWizard,
    removeUserGroupFromWizard,
    addUsersSetTab,
    addUsersShowSelectGroupUsers,
} from '../../actions';
import {
    addNewUser,
} from '../../../../common/actions/userActions';

class AddUsers extends Component {
    render() {
        return (
            <div className='add-users'>
                {this.props.ui.showSelectGroupUsers &&
                    <SelectGroupUsers
                        vocab={this.props.vocab}
                        users={this.props.project.users}
                        allUsers={this.props.allUsers}
                        onCancel={() => this.props.onShowSelectGroupUsers(false)}
                        onSave={(role) => {
                            this.props.onAddUserGroup(role);
                            this.props.onShowSelectGroupUsers(false);
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
                            onClick={() => this.props.onShowSelectGroupUsers(true)}/>}
                    <Button className='add-users__button-panel-button'
                        label={this.props.vocab.PROJECT.IMPORT_USERS} />
                </div>
                <hr className='divider' />
                {this.props.vocab.PROJECT.ADD_USERS_CLARIFICATION.map(sentence =>
                    <p key={sentence} className='add-users__clarification'>
                        {sentence}
                    </p>,
                )}
                <Tabs onActive={this.props.onSetTab}>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <UsersTab
                            vocab={this.props.vocab}
                            allUsers={this.props.allUsers}
                            projectUsers={this.props.project.users}
                            onAddUserToProject={this.props.onAddUserToProject}
                            onRemoveUserFromProject={this.props.onRemoveUserFromProject}
                            onAddNewUser={this.props.onAddNewUser}/>
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <UserGroupsTab
                            vocab={this.props.vocab}
                            groups={this.props.groups}
                            allUsers={this.props.allUsers}
                            onRemoveUserGroup={this.props.onRemoveUserGroup}/>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}

AddUsers.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
    groups: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    project: state.projectwizard.project,
    survey: state.projectwizard.survey,
    allUsers: state.user.users,
    groups: state.projectwizard.project.userGroups,
    ui: state.projectwizard.ui.addUsers,
});
const mapDispatchToProps = dispatch => ({
    onAddUserToProject: user => dispatch(addUserToWizard(user)),
    onRemoveUserFromProject: userId => dispatch(removeUserFromWizard(userId)),
    onAddUserGroup: group => dispatch(addUserGroupToWizard(group)),
    onRemoveUserGroup: id => dispatch(removeUserGroupFromWizard(id)),
    onSetTab: tab => dispatch(addUsersSetTab(tab)),
    onShowSelectGroupUsers: show => dispatch(addUsersShowSelectGroupUsers(show)),
    onAddNewUser: user => dispatch(addNewUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
