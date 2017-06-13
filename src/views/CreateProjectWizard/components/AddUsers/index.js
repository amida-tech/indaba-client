import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Tabs, Tab } from 'grommet';
import Summary from '../../../../common/components/Summary';
import UsersTab from './UsersTab';
import UserGroupsTab from './UserGroupsTab';
import AddUserGroup from './AddUserGroup';
import {
    addUserToWizard,
    removeUserFromWizard,
    addUserGroupToWizard,
    removeUserGroupFromWizard,
} from '../../actions';

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
        this.setState({ tab });
    }
    handleCreateModal(show) {
        this.setState({ createModal: show });
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
                        onSave={(role) => {
                            this.props.onAddUserGroup(role);
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
                            roles={this.props.roles}
                            allUsers={this.props.allUsers}
                            onRemoveUserGroup={this.props.onRemoveUserGroup}/>
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
    roles: state.projectwizard.workflow.roles,
});
const mapDispatchToProps = dispatch => ({
    onAddUserToProject: user => dispatch(addUserToWizard(user)),
    onRemoveUserFromProject: userId => dispatch(removeUserFromWizard(userId)),
    onAddUserGroup: group => dispatch(addUserGroupToWizard(group)),
    onRemoveUserGroup: id => dispatch(removeUserGroupFromWizard(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
