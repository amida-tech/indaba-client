import React, { Component } from 'react';
import { SearchInput } from 'grommet';
import PropTypes from 'prop-types';

import DeleteIconButton from '../../../../common/components/DeleteIconButton';
import UserBadge from '../../../../common/components/UserBadge';
import InviteUserForm from '../../../../common/components/InviteUserForm';
import { renderName } from '../../../../utils/User';

class UsersTab extends Component {
    constructor(props) {
        super(props);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleUserRemove = this.handleUserRemove.bind(this);
        this.searchFilter = this.searchFilter.bind(this);
        this.renderUserEntry = this.renderUserEntry.bind(this);
    }

    handleSearchSelect(selection) {
        this.props.actions.addUsersSetUsersFilter('');
        this.props.actions.addUserToWizard(selection.suggestion.value);
    }

    handleUserRemove(userId) {
        this.props.actions.removeUserFromWizard(userId);
    }

    searchFilter(user) {
        return renderName(user).toLowerCase().includes(this.props.filter.toLowerCase());
    }

    renderUserEntry(userId) {
        const user = this.props.allUsers.find(userElement => userElement.id === userId);
        return (
            <div key={userId}
                className='users-tab__entry'>
                <div className='users-tab__name-container'>
                    <UserBadge user={user}/>
                    <div className='users-tab__name'>{renderName(user)}</div>
                </div>
                <DeleteIconButton onClick={() => this.handleUserRemove(userId)} />
            </div>
        );
    }

    render() {
        return (
            <div className='users-tab'>
                <InviteUserForm vocab={this.props.vocab}
                    onSubmit={(values) => {
                        const userData = {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            roleID: 3,
                            password: values.email + Math.floor((Math.random() * 1000000) + 1),
                            email: values.email,
                            isActive: false,
                            organizationId: this.props.profile.organizationId,
                        };
                        this.props.actions.addNewUser(
                            userData,
                            this.props.vocab.ERROR.INSERT_USER,
                            this.props.actions.addUserToWizard);
                    }} />
                <div className='users-tab__search'>
                    <SearchInput
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onDOMChange={evt =>
                            this.props.actions.addUsersSetUsersFilter(evt.target.value)}
                        value={this.props.filter}
                        suggestions={this.props.allUsers.filter(this.searchFilter)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
                        onSelect={this.handleSearchSelect}/>
                </div>
                <div className='users-tab__user-list'>
                    {this.props.projectUsers.map(this.renderUserEntry)}
                </div>
            </div>
        );
    }
}

UsersTab.propTypes = {
    actions: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    projectUsers: PropTypes.arrayOf(PropTypes.number).isRequired,
    profile: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UsersTab;
