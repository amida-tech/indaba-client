import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'grommet';

import { renderName } from '../../../../../utils/User';

import { PROMPT_TYPE } from '../../../constants';
import apiService from '../../../../../services/api';
import Modal from '../../../../../common/components/Modal';
import { UserProfileContainer } from '../../../../UserProfile';
import PMUserList from '../../../../../common/components/PMUserList';
import InviteUserForm from '../../../../../common/components/InviteUserForm';

class PMUsersTab extends Component {
    constructor(props) {
        super(props);
        this.filterUser = this.filterUser.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteModalSave = this.handleDeleteModalSave.bind(this);
    }
    getDataState(userId) {
        return new Promise((resolve, reject) => {
            apiService.tasks.getTasksByUser(userId, (tasksErr, tasks) => {
                if (tasksErr) {
                    reject(tasksErr);
                } else {
                    const statusPromises = (tasks || []).map(task =>
                        new Promise((statusResolve, statusReject) =>
                            apiService.surveys.getAssessmentAnswersStatus(
                                task.assessmentId,
                                (statusErr, statusResponse) =>
                                (statusErr ?
                                    statusReject(statusErr) :
                                    statusResolve(statusResponse)))));
                    if (statusPromises.length > 0) {
                        Promise.all(statusPromises)
                        .then(statuses => statuses.some(status => status.status !== 'new'))
                        .then(hasData => resolve(hasData ?
                            PROMPT_TYPE.HAS_DATA :
                            PROMPT_TYPE.HAS_TASKS))
                        .catch(reject);
                    } else {
                        resolve(PROMPT_TYPE.NEITHER);
                    }
                }
            });
        });
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
            selection.suggestion.value.id,
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
                                deleteModal.promptType === PROMPT_TYPE.HAS_DATA &&
                                this.props.vocab.MODAL.USER_DELETE_CONFIRM.REMOVE_WITH_DATA
                            ) ||
                            (
                                deleteModal.promptType === PROMPT_TYPE.HAS_TASKS &&
                                this.props.vocab.MODAL.USER_DELETE_CONFIRM.REMOVE_WITH_TASKS
                            ) ||
                            this.props.vocab.MODAL.USER_DELETE_CONFIRM.REMOVE_WITH_NOTHING
                        }
                        onCancel={() => this.props.actions.pmHideUserDeleteConfirmModal()}
                        onSave={this.handleDeleteModalSave}/>
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
                        fill={true}
                        inline={true}
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        onDOMChange={evt =>
                            this.props.actions.updateUserListSearchQuery(evt.target.value)}
                        value={this.props.ui.userListSearchQuery}
                        suggestions={this.props.allUsers.filter(this.filterUser)
                            .map(user => ({ label: renderName(user),
                                value: user }))}
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
