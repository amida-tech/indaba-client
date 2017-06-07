import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Button, Tabs, Tab, TextInput } from 'grommet';
import update from 'immutability-helper';
import Summary from '../../../common/components/Summary';

class UsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            query: '',
        };

        this.handleFirstNameInput = this.handleFirstNameInput.bind(this);
        this.handleLastNameInput = this.handleLastNameInput.bind(this);
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handleSearchInput = this.handleSearchInput.bind(this);
    }
    handleFirstNameInput(evt) {
        this.setState(update(this.state, { firstName: { $set: evt.target.value } }));
    }
    handleLastNameInput(evt) {
        this.setState(update(this.state, { lastName: { $set: evt.target.value } }));
    }
    handleEmailInput(evt) {
        this.setState(update(this.state, { lastName: { $set: evt.target.value } }));
    }
    handleSearchInput(evt) {
        this.setState(update(this.state, { query: { $set: evt.target.value } }));
    }
    render() {
        return (
            <div>
                <Box direction='row'>
                    <TextInput
                        placeHolder={this.props.vocab.PROJECT.NEW_USER_FIRST_NAME}
                        onDOMChange={this.handleFirstNameInput}
                        value={this.state.firstName}/>
                    <TextInput
                        placeHolder={this.props.vocab.PROJECT.NEW_USER_LAST_NAME}
                        onDOMChange={this.handleLastNameInput}
                        value={this.state.lastName}/>
                    <TextInput
                        placeHolder={this.props.vocab.PROJECT.NEW_USER_EMAIL}
                        onDOMChange={this.handleEmailInput}
                        value={this.state.email}/>
                    <Button label={this.props.vocab.COMMON.INVITE}/>
                </Box>
                <Box direction='row'>
                    <TextInput
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onDOMChange={this.handleSearchInput}
                        value={this.state.query}/>
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
