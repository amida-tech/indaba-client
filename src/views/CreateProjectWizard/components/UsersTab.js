import React, { Component } from 'react';
import update from 'immutability-helper';
import { Box, TextInput, Button } from 'grommet';

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

export default UsersTab;
