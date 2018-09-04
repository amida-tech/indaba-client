import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DeleteIconButton from '../../../../common/components/DeleteIconButton';
import UserBadge from '../../../../common/components/UserBadge';
import InviteUserForm from '../../../../common/components/InviteUserForm';
import Search from '../../../../common/components/Search';
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
        this.props.actions.addUser(
            selection.value.id,
            this.props.projectId,
            this.props.vocab.ERROR);
    }

    handleUserRemove(userId, projectId) {
        this.props.actions.removeUser(userId, projectId, this.props.vocab.ERROR);
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
                <DeleteIconButton onClick={() =>
                    this.handleUserRemove(userId, this.props.projectId)} />
            </div>
        );
    }

    render() {
        return (
            <div className='users-tab'>
            <div className='users-tab__wrapper'>
                <InviteUserForm vocab={this.props.vocab}
                    onSubmit={(values) => {
                        this.props.actions.addNewUser(
                            values,
                            this.props.projectId,
                            this.props.profile.organizationId,
                            this.props.vocab.TOAST,
                            this.props.vocab.ERROR);
                    }} />
                <div className='users-tab__search'>
                    <Search
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        value={this.props.filter}
                        list={this.props.allUsers.filter(this.searchFilter)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
                        onChange={evt =>
                            this.props.actions.addUsersSetUsersFilter(evt.target.value)}
                        onSelect={this.handleSearchSelect}/>
                        </div>
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
    projectId: PropTypes.number.isRequired,
    projectUsers: PropTypes.arrayOf(PropTypes.number).isRequired,
    profile: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default UsersTab;
