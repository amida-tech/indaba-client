import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Tabs, Tab } from 'grommet';
import update from 'immutability-helper';
import Summary from '../../../../common/components/Summary';
import UsersTab from './UsersTab';
import UserGroupsTab from './UserGroupsTab';
import AddUserGroup from './AddUserGroup';
import { addUserToProject, removeUserFromProject, addUserGroup } from '../../actions';

class AddUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 0,
            createModal: false,
        };
        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleCreateModal = this.handleCreateModal.bind(this);
    }
    handleTabChange(tab) {
        this.setState(update(this.state,
            { tab: { $set: tab } },
        ));
    }
    handleCreateModal(show) {
        this.setState(update(this.state,
            { createModal: { $set: show } },
        ));
    }
    render() {
        return (
            <div>
                {this.state.createModal &&
                    <AddUserGroup
                        vocab={this.props.vocab}
                        users={this.props.projectUsers}
                        allUsers={this.props.allUsers}
                        onCancel={() => this.handleCreateModal(false)}
                        onSave={(group) => {
                            this.props.onAddUserGroup(group);
                            this.handleCreateModal(false);
                        }}/>}
                <Summary
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <hr className='divider' />
                <Box direction='row' justify='end'
                    pad={{ vertical: 'small', horizontal: 'medium', between: 'small' }}>
                    {this.state.tab === 1 &&
                        <Button
                            label={this.props.vocab.PROJECT.CREATE_USER_GROUP}
                            primary
                            onClick={() => this.handleCreateModal(true)}/>}
                    <Button label={this.props.vocab.PROJECT.IMPORT_USERS} />
                </Box>
                <hr className='divider' />
                {this.props.vocab.PROJECT.ADD_USERS_CLARIFICATION.map(sentence =>
                    <p key={sentence}>{sentence}</p>,
                )}
                <Tabs onActive={this.handleTabChange}>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <UsersTab
                            vocab={this.props.vocab}
                            allUsers={this.props.allUsers}
                            projectUsers={this.props.projectUsers}
                            onAddUserToProject={this.props.onAddUserToProject}
                            onRemoveUserFromProject={this.props.onRemoveUserFromProject}/>
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <UserGroupsTab
                            vocab={this.props.vocab}
                            userGroups={this.props.userGroups}
                            allUsers={this.props.allUsers}/>
                    </Tab>
                </Tabs>
            </div>);
    }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary,
    project: state.projectwizard.project,
    survey: state.projectwizard.survey,
    allUsers: state.user.users,
    projectUsers: state.projectwizard.users,
    userGroups: state.projectwizard.userGroups,
});
const mapDispatchToProps = dispatch => ({
    onAddUserToProject: user => dispatch(addUserToProject(user)),
    onRemoveUserFromProject: userId => dispatch(removeUserFromProject(userId)),
    onAddUserGroup: group => dispatch(addUserGroup(group)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
