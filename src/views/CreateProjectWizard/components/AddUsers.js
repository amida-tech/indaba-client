import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Tabs, Tab, TextInput } from 'grommet';
import Summary from '../../../common/components/Summary';

class UsersTab extends Component {
    render() {
        return (
            <div>
                <Box direction='row'>
                    <TextInput placeholder={this.props.vocab.PROJECT.NEW_USER_FIRST_NAME}/>
                    <TextInput placeholder={this.props.vocab.PROJECT.NEW_USER_LAST_NAME}/>
                    <TextInput placeholder={this.props.vocab.PROJECT.NEW_USER_EMAIL}/>
                    <Button label={this.props.vocab.COMMON.INVITE}/>
                </Box>
                <Box direction='row'>
                    <TextInput
                        fill='horizontal'
                        placeholder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER} />
                </Box>
            </div>
        );
    }
}

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
                        <UsersTab vocab={this.props.vocab} />
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
});

export default connect(mapStateToProps)(AddUsers);
