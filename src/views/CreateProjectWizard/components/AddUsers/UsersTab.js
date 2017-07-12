import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Box, List, ListItem, SearchInput } from 'grommet';
import DeleteIconButton from '../../../../common/components/DeleteIconButton';
import UserBadge from '../../../../common/components/UserBadge';
import InviteUserForm from '../../../../common/components/InviteUserForm';
import { renderName } from '../../../../utils/User';

import { addUsersSetUsersFilter } from '../../actions';

class UsersTab extends Component {
    constructor(props) {
        super(props);

        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleUserRemove = this.handleUserRemove.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
        this.renderUserEntry = this.renderUserEntry.bind(this);
    }
    handleSearchSelect(selection) {
        this.props.onSetFilter('');
        this.props.onAddUserToProject(selection.suggestion.value);
    }
    handleUserRemove(userId) {
        this.props.onRemoveUserFromProject(userId);
    }
    searchFilter(user) {
        return renderName(user).toLowerCase().includes(this.props.filter.toLowerCase());
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
                <div className='users-tab__search'>
                    <SearchInput
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onDOMChange={evt => this.props.onSetFilter(evt.target.value)}
                        value={this.props.filter}
                        suggestions={this.props.allUsers.filter(this.searchFilter)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
                        onSelect={this.handleSearchSelect}/>
                </div>
                <List>
                    {this.props.projectUsers.map(this.renderUserEntry)}
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filter: state.projectwizard.ui.addUsers.usersFilter,
});

const mapDispatchToProps = dispatch => ({
    onSetFilter: filter => dispatch(addUsersSetUsersFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersTab);
