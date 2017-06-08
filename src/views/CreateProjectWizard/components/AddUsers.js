import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Tabs, Tab } from 'grommet';
import Summary from '../../../common/components/Summary';
import UsersTab from './UsersTab';
import AddUserGroup from './AddUserGroup';

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
                        <UsersTab vocab={this.props.vocab} users={this.props.users}/>
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
    users: state.user.users,
});

export default connect(mapStateToProps)(AddUsers);
