import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { renderName } from '../../../../../utils/User';

import UserProfile from './UserProfile';
import PMUserListRow from './PMUserListRow';
import PMUserListHeader from './PMUserListHeader';
import InviteUserForm from './InviteUserForm';

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
                <InviteUserForm vocab={this.props.vocab}
                    onSubmit={(values) => {
                        const NEW_USER_ID = 21;
                        this.props.onAddNewUser({
                            id: NEW_USER_ID,
                            firstName: values.firstName,
                            lastName: values.lastName,
                            email: values.email,
                        });
                        this.props.onAddUserToProject(NEW_USER_ID, this.props.project.id);
                    }}/>
                <input className='pm-users-tab__text-input'
                    type='text'
                    placeholder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                    onChange={evt => this.setState({ search: evt.target.value })} />
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
                        vocab={this.props.vocab}/>)}
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
