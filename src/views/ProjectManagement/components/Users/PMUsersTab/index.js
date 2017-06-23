import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserProfile from './UserProfile';

class UserListEntry extends Component {
    render() {
        const groups = this.props.groups.filter(g => g.users.includes(this.props.user.id))
            .map(g => g.name).join(', ');
        return (
            <div className='user-list-row'>
                <div className='user-list-entry__cell'
                    onClick={this.props.onNameClick}>
                    {this.props.user.firstName}
                </div>
                <div className='user-list-entry__cell'>
                    {this.props.user.lastName}
                </div>
                <div className='user-list-entry__cell'>
                    {groups}
                </div>
            </div>
        );
    }
}

UserListEntry.propTypes = {
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
    }).isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    onNameClick: PropTypes.func.isRequired,
};

const UserListHeader = props => (
    <div className='pm-users-list-header'>
        <div className='pm-users-list-header__cell'>
            {props.vocab.COMMON.FIRST_NAME}
        </div>
        <div className='pm-users-list-header__cell'>
            {props.vocab.COMMON.LAST_NAME}
        </div>
        <div className='pm-user-list-header__cell'>
            {props.vocab.PROJECT.USER_GROUPS}
        </div>
        <div className='pm-user-list-header__cell'>
            {props.vocab.PROJECT.SUBJECT}
        </div>
        <div className='pm-user-list-header__cell'>
            {props.vocab.COMMON.ACTIONS}
        </div>
    </div>
);

class PMUsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = { userProfileId: false };
        this.showUserProfileModal = this.showUserProfileModal.bind(this);
    }
    showUserProfileModal(userId) {
        this.setState({ userProfileId: userId });
    }
    render() {
        return (
            <div className='pm-users-tab'>
                {this.state.userProfileId !== false &&
                    <UserProfile userId={this.state.userProfileId}
                        {...this.props}
                        onCancel={() => this.setState({ userProfileId: false })}/>
                }
                <UserListHeader vocab={this.props.vocab} />
                {this.props.users.map(user =>
                    <UserListEntry user={user}
                        groups={this.props.project.userGroups}
                        key={user.id}
                        onNameClick={() => this.showUserProfileModal(user.id)}/>)}
            </div>
        );
    }
}

PMUsersTab.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PMUsersTab;
