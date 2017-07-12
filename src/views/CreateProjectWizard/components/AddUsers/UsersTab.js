import React, { Component } from 'react';
import { Box, List, ListItem, SearchInput } from 'grommet';
import DeleteIconButton from '../../../../common/components/DeleteIconButton';
import UserBadge from '../../../../common/components/UserBadge';
import InviteUserForm from '../../../../common/components/InviteUserForm';
import { renderName } from '../../../../utils/User';

class UsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };

        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleUserRemove = this.handleUserRemove.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
        this.renderUserEntry = this.renderUserEntry.bind(this);
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
        const user = this.props.allUsers.find(userElement => userElement.id === userId);
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
                <DeleteIconButton onClick={() => this.handleUserRemove(userId)} />
            </ListItem>
        );
    }
    render() {
        return (
            <div>
                <InviteUserForm vocab={this.props.vocab}
                    onSubmit={(values) => {
                        this.props.onAddNewUser({
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                        }).then(userData =>
                            this.props.onAddUserToProject(userData));
                    }} />
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
