import React, { Component } from 'react';
import { Box, TextInput, Button, List, ListItem, SearchInput } from 'grommet';
import IonIcon from 'react-ionicons';
import UserBadge from './UserBadge';
import { renderName } from '../../../../utils/User';

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
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleUserRemove = this.handleUserRemove.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
        this.renderUserEntry = this.renderUserEntry.bind(this);
    }
    handleFirstNameInput(evt) {
        this.setState({ firstName: evt.target.value });
    }
    handleLastNameInput(evt) {
        this.setState({ lastName: evt.target.value });
    }
    handleEmailInput(evt) {
        this.setState({ email: evt.target.value });
    }
    handleSearchInput(evt) {
        this.setState({ query: evt.target.value });
    }
    handleSearchSelect(selection) {
        this.setState({ query: '' });
        this.props.onAddUserToProject(selection.suggestion.value);
    }
    handleUserRemove(userId) {
        this.props.onRemoveUserFromProject(userId);
    }
    searchFilter(user) {
        return !this.state.query ||
            renderName(user).toLowerCase().includes(this.state.query.toLowerCase());
    }
    renderUserEntry(userId) {
        const user = this.props.allUsers.find(user => user.id === userId);
        return (
            <ListItem key={userId}
                direction='row'
                pad={{ horizontal: 'large', vertical: 'small' }}
                justify='between'
                className='user-list-entry'>
                <Box direction='row' align='center' pad={{ between: 'small' }}>
                    <UserBadge user={user}/>
                    <div>{renderName(user)}</div>
                </Box>
                <div onClick={() => this.handleUserRemove(userId)}>
                    <IonIcon icon='ion-android-delete' color='#7E848F'/>
                </div>
            </ListItem>
        );
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
                    <SearchInput
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onDOMChange={this.handleSearchInput}
                        value={this.state.query}
                        suggestions={this.props.allUsers.filter(this.searchFilter)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
                        onSelect={this.handleSearchSelect}/>
                </Box>
                <List>
                    {this.props.projectUsers.map(this.renderUserEntry)}
                </List>
            </div>
        );
    }
}

export default UsersTab;
