import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { renderName } from '../../../../../utils/User';

import UserProfile from './UserProfile';
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
                    <UserProfile userId={this.state.userProfileId}
                        {...this.props}
                        onCancel={() => this.setState({ userProfileId: false })}
                        onSave={() => this.setState({ userProfileId: false })}/>
                }
                <div className='pm-users-tab__invite-container'>
                    <InviteUserForm vocab={this.props.vocab}
                        onSubmit={(values) => {
                            this.props.onAddNewUser({
                                firstName: values.firstName,
                                lastName: values.lastName,
                                email: values.email,
                            }).then(userData =>
                                this.props.onAddUserToProject(userData.id, this.props.project.id),
                            );
                        }}/>
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
                        stages={this.props.project.stages}
                        tasks={this.props.tasks}
                        subjects={this.props.project.subjects}
                        onNameClick={() => this.showUserProfileModal(user.id)}
                        onDeleteClick={() =>
                            this.props.onRemoveUserFromProject(user.id, this.props.project.id)}
                        vocab={this.props.vocab}/>)}
            </div>
        );
    }
}

PMUsersTab.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onAddNewUser: PropTypes.func.isRequired,
    onAddUserToProject: PropTypes.func.isRequired,
    onRemoveUserFromProject: PropTypes.func.isRequired,
};

export default PMUsersTab;
