import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { renderName, DATA_STATE, getDataState } from '../../../../../utils/User';
import Modal from '../../../../../common/components/Modal';
import { UserProfileContainer } from '../../../../UserProfile';
import PMUserList from '../../../../../common/components/PMUserList';
import InviteUserForm from '../../../../../common/components/InviteUserForm';
import Search from '../../../../../common/components/Search';

class PMUsersTab extends Component {
    constructor(props) {
        super(props);
        this.filterUser = this.filterUser.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteModalSave = this.handleDeleteModalSave.bind(this);
    }
    getDataState(userId) {
        return getDataState(userId, this.props.project.id);
    }
    handleDeleteClick(userId) {
        this.getDataState(userId).then((promptType) => {
            this.props.actions.pmShowUserDeleteConfirmModal(userId, promptType);
        });
    }
    handleDeleteModalSave() {
        this.props.actions.removeUser(
            this.props.ui.showUserDeleteConfirmModal.id,
            this.props.project.id,
            this.props.vocab.ERROR);
        this.props.actions.pmHideUserDeleteConfirmModal();
    }
    filterUser(user) {
        return renderName(user).toLowerCase()
            .includes((this.props.ui.userListSearchQuery).toLowerCase());
    }
    handleSearchSelect(selection) {
        this.props.actions.updateUserListSearchQuery('');
        this.props.actions.addUser(
            selection.value.id,
            this.props.project.id,
            this.props.vocab.ERROR);
    }
    render() {
        const deleteModal = this.props.ui.showUserDeleteConfirmModal;
        return (
            <div className='pm-users-tab'>
                {this.props.ui.showProfile !== false &&
                    <UserProfileContainer userId={this.props.ui.showProfile}
                        projectId={this.props.project.id}
                        onCancel={() => this.props.actions.pmProjectShowProfile(false)}
                        onSave={() => this.props.actions.pmProjectShowProfile(false)}/>
                }
                {
                    this.props.ui.showUserDeleteConfirmModal &&
                    <Modal title={this.props.vocab.MODAL.USER_DELETE_CONFIRM.TITLE}
                        bodyText={
                            (
                                deleteModal.promptType === DATA_STATE.HAS_DATA &&
                                this.props.vocab.MODAL.USER_DELETE_CONFIRM.REMOVE_WITH_DATA
                            ) ||
                            (
                                deleteModal.promptType === DATA_STATE.HAS_TASKS &&
                                this.props.vocab.MODAL.USER_DELETE_CONFIRM.REMOVE_WITH_TASKS
                            ) ||
                            this.props.vocab.MODAL.USER_DELETE_CONFIRM.REMOVE_WITH_NOTHING
                        }
                        onCancel={() => this.props.actions.pmHideUserDeleteConfirmModal()}
                        onSave={this.handleDeleteModalSave}
                        saveLabel={this.props.vocab.COMMON.REMOVE}/>
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
                    <Search
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        value={this.props.ui.userListSearchQuery}
                        list={this.props.allUsers.filter(this.filterUser)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
                        onChange={evt =>
                            this.props.actions.updateUserListSearchQuery(evt.target.value)}
                        onSelect={this.handleSearchSelect}/>
                </div>
                <PMUserList
                    users={this.props.users}
                    vocab={this.props.vocab}
                    groups={this.props.project.userGroups}
                    onUserNameClick={this.props.actions.pmProjectShowProfile}
                    onUserDeleteClick={this.handleDeleteClick}
                    onUserMailClick={id => this.props.actions.sendMessage(
                        this.props.users.find(user => user.id === id))}/>
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
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
        addNewUser: PropTypes.func.isRequired,
        removeUser: PropTypes.func.isRequired,
        pmProjectShowProfile: PropTypes.func.isRequired,
        updateUserListSearchQuery: PropTypes.func.isRequired,
    }).isRequired,
    userProfileId: PropTypes.any,
    ui: PropTypes.object.isRequired,
};

export default PMUsersTab;
