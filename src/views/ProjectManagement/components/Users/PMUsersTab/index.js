import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { renderName } from '../../../../../utils/User';

import { UserProfileContainer } from '../../../../UserProfile';
import PMUserListRow from './PMUserListRow';
import PMUserListHeader from './PMUserListHeader';
import InviteUserForm from '../../../../../common/components/InviteUserForm';

class PMUsersTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userProfileId: false,
            search: '',
        };
        this.showUserProfileModal = this.showUserProfileModal.bind(this);
        this.filterUser = this.filterUser.bind(this);
    }
    showUserProfileModal(userId) {
        this.setState({ userProfileId: userId });
    }
    filterUser(user) {
        return renderName(user).toLowerCase().includes((this.state.search || '').toLowerCase());
    }
    render() {
        return (
            <div className='pm-users-tab'>
                {this.state.userProfileId !== false &&
                    <UserProfileContainer userId={this.state.userProfileId}
                        projectId={this.props.project.id}
                        onCancel={() => this.setState({ userProfileId: false })}
                        onSave={() => this.setState({ userProfileId: false })}/>
                }
                <div className='pm-users-tab__invite-container'>
                    <InviteUserForm vocab={this.props.vocab}
                        onSubmit={(values) => {
                            this.props.actions.addNewUser(
                                values,
                                this.props.project.id,
                                this.props.profile.organizationId,
                                this.props.vocab.TOAST,
                                this.props.vocab.ERROR,
                            );
                        }}/>
                </div>
                <div className='pm-users-tab__search-container'>
                    <input className='pm-users-tab__text-input'
                        type='text'
                        placeholder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onChange={evt => this.setState({ search: evt.target.value })} />
                </div>
                <PMUserListHeader vocab={this.props.vocab} />
                {this.props.users
                    .filter(this.filterUser)
                    .map(user =>
                    <PMUserListRow user={user}
                        groups={this.props.project.userGroups}
                        key={user.id}
                        onNameClick={() => this.showUserProfileModal(user.id)}
                        onDeleteClick={() => this.props.actions.removeUser(
                            user.id,
                            this.props.project.id,
                            this.props.vocab.ERROR)}
                        vocab={this.props.vocab}/>)}
            </div>
        );
    }
}

PMUsersTab.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    profile: PropTypes.shape({
        organizationId: PropTypes.number.isRequired,
    }),
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
        addNewUser: PropTypes.func.isRequired,
        removeUser: PropTypes.func.isRequired,
    }).isRequired,
};

export default PMUsersTab;
