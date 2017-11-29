import React, { Component } from 'react';

import { Search } from 'grommet';

import Modal from '../../../common/components/Modal';
import { renderName, DATA_STATE, getDataState } from '../../../utils/User';
import PMUserList from '../../../common/components/PMUserList';
import { UserProfileContainer } from '../../../views/UserProfile';
import InviteUserForm from '../../../common/components/InviteUserForm';

class PMAllUsers extends Component {
    constructor(props) {
        super(props);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.filterUser = this.filterUser.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteModalSave = this.handleDeleteModalSave.bind(this);
    }
    handleDeleteClick(userId) {
        getDataState(userId)
        .then(dataState => this.props.actions.pmAllUsersShowDeleteConfirmModal(userId, dataState));
    }
    handleDeleteModalSave(userId) {
        this.props.actions.deleteUser(userId, this.props.vocab.ERROR);
        this.props.actions.pmAllUsersHideDeleteConfirmModal();
    }
    handleSearchSelect(selection) {
        this.props.actions.pmAllUsersSetListQuery('');
        this.props.actions.pmAllUsersShowProfile(selection.suggestion.value.id);
    }
    filterUser(user) {
        return renderName(user).toLowerCase()
            .includes((this.props.ui.listQuery).toLowerCase());
    }
    render() {
        const deleteModal = this.props.ui.showDeleteConfirmModal;
        return (
            <div className='pm-all-users'>
                <div className='pm-all-users__invite-container'>
                    <InviteUserForm vocab={this.props.vocab}
                        onSubmit={(values) => {
                            this.props.actions.addNewUser(
                                values,
                                null, // no project id
                                this.props.organizationId,
                                this.props.vocab.TOAST,
                                this.props.vocab.ERROR,
                            );
                        }}/>
                </div>
                <div className='pm-all-users__search-container'>
                    <Search
                        fill={true}
                        inline={true}
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onDOMChange={evt =>
                            this.props.actions.pmAllUsersSetListQuery(evt.target.value)}
                        value={this.props.ui.listQuery}
                        suggestions={this.props.users.filter(this.filterUser)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
                        onSelect={this.handleSearchSelect}/>
                </div>
                <PMUserList {...this.props}
                    onUserNameClick={this.props.actions.pmAllUsersShowProfile}
                    onUserDeleteClick={this.handleDeleteClick}
                    onUserMailClick={id =>
                        this.props.actions.sendMessage(
                            this.props.users.find(user => user.id === id))}/>
                {
                    this.props.ui.showProfile !== false &&
                    <UserProfileContainer userId={this.props.ui.showProfile}
                        onCancel={() => this.props.actions.pmAllUsersShowProfile(false)}
                        onSave={() => this.props.actions.pmAllUsersShowProfile(false)}/>
                }
                {
                    deleteModal &&
                    <Modal title={this.props.vocab.MODAL.USER_DELETE_CONFIRM.TITLE}
                        bodyText={
                            (
                                deleteModal.promptType === DATA_STATE.HAS_DATA &&
                                this.props.vocab.MODAL.USER_DELETE_CONFIRM.DELETE_WITH_DATA
                            ) ||
                            (
                                deleteModal.promptType === DATA_STATE.HAS_TASKS &&
                                this.props.vocab.MODAL.USER_DELETE_CONFIRM.DELETE_WITH_TASKS
                            ) ||
                            this.props.vocab.MODAL.USER_DELETE_CONFIRM.DELETE_WITH_NOTHING
                        }
                        onCancel={() => this.props.actions.pmAllUsersHideDeleteConfirmModal()}
                        onSave={() => this.handleDeleteModalSave(deleteModal.id)}/>
                }
            </div>
        );
    }
}

export default PMAllUsers;
