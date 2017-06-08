import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Tabs, Tab } from 'grommet';
import Summary from '../../../common/components/Summary';
import UsersTab from './UsersTab';
import AddUserGroup from './AddUserGroup';
import { addUserToProject } from '../actions';

class UserGroupsTab extends Component {
    render() {
        return (<div></div>);
    }
}

class AddUsers extends Component {
    render() {
        return (
            <div>
                <Summary
                    project={this.props.project}
                    survey={this.props.survey}
                    vocab={this.props.vocab} />
                <hr className='divider' />
                <Box direction='row' justify='end'
                    pad={{ vertical: 'small', horizontal: 'medium' }}>
                    <Button label={this.props.vocab.PROJECT.IMPORT_USERS} />
                </Box>
                <hr className='divider' />
                {this.props.vocab.PROJECT.ADD_USERS_CLARIFICATION.map(sentence =>
                    <p key={sentence}>{sentence}</p>,
                )}
                <Tabs>
                    <Tab title={this.props.vocab.PROJECT.USERS}>
                        <UsersTab
                            vocab={this.props.vocab}
                            allUsers={this.props.allUsers}
                            projectUsers={this.props.projectUsers}
                            onAddUserToProject={this.props.onAddUserToProject}/>
                    </Tab>
                    <Tab title={this.props.vocab.PROJECT.USER_GROUPS}>
                        <UserGroupsTab vocab={this.props.vocab} />
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
});
const mapDispatchToProps = dispatch => ({
    onAddUserToProject: user => dispatch(addUserToProject(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUsers);
