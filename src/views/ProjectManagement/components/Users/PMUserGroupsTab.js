import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import apiService from '../../../../services/api';
import Modal from '../../../../common/components/Modal';
import UserGroupList from '../../../../common/components/UserGroupList';
import Search from '../../../../common/components/Search';
import { updateUserGroupListSearchQuery } from '../../actions';

const NO_STAGES = 0;
const STAGES = 1;

class PMUserGroupsTab extends Component {
    constructor(props) {
        super(props);

        this.filterGroup = this.filterGroup.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteModalSave = this.handleDeleteModalSave.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
    }

    getDataState(userGroupId) {
        if (!this.props.project.stages.some(stage => stage.userGroups.includes(userGroupId))) {
            return NO_STAGES;
        }
        return STAGES;
    }

    handleDeleteClick(userGroupId) {
        const dataState = this.getDataState(userGroupId);
        if (dataState === NO_STAGES) {
            this.props.actions.pmShowUserGroupDeleteConfirmModal(userGroupId, dataState);
        } else if (this.props.project.status === 1) {
            toast(this.props.vocab.ERROR.NO_DELETE_USER_GROUP_WITH_STAGES,
                { autoClose: false, type: 'error' });
        } else {
            this.props.actions.pmShowUserGroupDeleteConfirmModal(userGroupId, dataState);
        }
    }

    handleDeleteModalSave() {
        apiService.projects.deleteGroup(this.props.ui.showUserGroupDeleteConfirmModal.id)
            .catch(() => toast(this.props.vocab.ERROR.GROUP_DELETE,
                { autoClose: false, type: 'error' }))
            .then(() => {
                this.props.actions.getProjectById(this.props.project.id, this.props.vocab.ERROR);
                this.props.actions.pmHideUserGroupDeleteConfirmModal();
            });
    }

    handleSearchSelect(selection) {
            this.props.actions.updateUserGroupListSearchQuery('');
            // this.props.actions. ADD GROUP WHATEVER
        }

    filterGroup(group) {
        return group.title.toLowerCase()
            .includes((this.props.ui.userGroupListSearchQuery).toLowerCase())
            && group.projectId !== this.props.project.id;
    }

    render() {
        const deleteModal = this.props.ui.showUserGroupDeleteConfirmModal;
        return (
            <div className='pm-user-groups-tab'>
                {
                    deleteModal
                    && <Modal title={this.props.vocab.MODAL.USER_GROUP_DELETE_CONFIRM.TITLE}
                        bodyText={
                            deleteModal.dataState === NO_STAGES
                                ? this.props.vocab.MODAL.USER_GROUP_DELETE_CONFIRM.DELETE_WITH_NOTHING
                                : this.props.vocab.MODAL.USER_GROUP_DELETE_CONFIRM.DELETE_WITH_STAGES
                        }
                        onCancel={this.props.actions.pmHideUserGroupDeleteConfirmModal}
                        onSave={this.handleDeleteModalSave}
                        saveLabel={this.props.vocab.COMMON.REMOVE}/>
                }
                <div className='pm-user-groups-tab__search-container'>
                    <Search
                        placeholder={this.props.vocab.PROJECT.SEARCH_FOR_COPY_USER_GROUP}
                        value={this.props.ui.userGroupListSearchQuery}
                        list={this.props.groups.filter(this.filterGroup)
                            .map(group => ({
                                label: group.title,
                                value: group,
                                hint: `(${this.props.vocab.PROJECT.z_PROJECT} "${group.projectName}",
                                    ${this.props.vocab.PROJECT.USER_COUNT}
                                    ${group.userIds.length})`
                            }))}
                        onChange={evt =>
                            this.props.actions.updateUserGroupListSearchQuery(evt.target.value)}
                        onSelect={this.handleSearchSelect}/>
                </div>
                <UserGroupList columnHeaders={true}
                    groups={this.props.project.userGroups
                        .filter(group => this.filterGroup(group, this.props.query))}
                    users={this.props.users}
                    vocab={this.props.vocab}
                    onDeleteClick={this.handleDeleteClick}
                    onGroupClick={this.props.onGroupClick} />
            </div>
        );
    }
}

PMUserGroupsTab.propTypes = {
    columnHeaders: PropTypes.bool,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    project: PropTypes.object.isRequired,
    vocab: PropTypes.object,
    onDeleteClick: PropTypes.func,
    onGroupClick: PropTypes.func,
    onSearch: PropTypes.func,
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default PMUserGroupsTab;
