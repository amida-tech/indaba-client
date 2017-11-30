import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import apiService from '../../../../services/api';
import Modal from '../../../../common/components/Modal';
import UserGroupList from '../../../../common/components/UserGroupList';
import { updateUserGroupListSearchQuery } from '../../actions';

const NO_STAGES = 0;
const STAGES_ACTIVE = 1;
const STAGES_INACTIVE = 2;

class PMUserGroupsTab extends Component {
    constructor(props) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleDeleteModalSave = this.handleDeleteModalSave.bind(this);
    }
    getDataState(userGroupId) {
        if (!this.props.project.stages.some(stage => stage.userGroups.includes(userGroupId))) {
            return NO_STAGES;
        }
        return this.props.project.status === 1 ? STAGES_ACTIVE : STAGES_INACTIVE;
    }
    handleDeleteClick(userGroupId) {
        const dataState = this.getDataState(userGroupId);
        if (dataState === STAGES_ACTIVE) {
            toast(this.props.vocab.ERROR.NO_DELETE_USER_GROUP_WITH_STAGES,
                { autoClose: false, type: 'error' });
        } else {
            this.props.actions.pmShowUserGroupDeleteConfirmModal(userGroupId, dataState);
        }
    }
    handleDeleteModalSave() {
        apiService.projects.deleteGroup(
            this.props.ui.showUserGroupDeleteConfirmModal.id,
            (err) => {
                if (err) {
                    toast(this.props.vocab.ERROR.GROUP_DELETE,
                        { autoClose: false, type: 'error' });
                }
                this.props.actions.getProjectById(this.props.project.id, this.props.vocab.ERROR);
                this.props.actions.pmHideUserGroupDeleteConfirmModal();
            },
        );
    }
    filterGroup(group, query) {
        return group.title.toLowerCase().includes(query.toLowerCase());
    }
    render() {
        const deleteModal = this.props.ui.showUserGroupDeleteConfirmModal;
        return (
            <div className='pm-user-groups-tab'>
                {
                    deleteModal &&
                    <Modal title={this.props.vocab.MODAL.USER_GROUP_DELETE_CONFIRM.TITLE}
                        bodyText={
                            deleteModal.dataState === NO_STAGES ?
                            this.props.vocab.MODAL.USER_GROUP_DELETE_CONFIRM.DELETE_WITH_NOTHING :
                            this.props.vocab.MODAL.USER_GROUP_DELETE_CONFIRM.DELETE_WITH_STAGES
                        }
                        onCancel={this.props.actions.pmHideUserGroupDeleteConfirmModal}
                        onSave={this.handleDeleteModalSave}/>
                }
                <div className='pm-user-groups-tab__search-container'>
                    <input type='text' className='pm-user-groups-tab__input'
                        onChange={evt => this.props.onSearch(evt.target.value)}
                        placeholder={this.props.vocab.COMMON.SEARCH} />
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
    project: PropTypes.object.isRequired,
    vocab: PropTypes.object,
    onDeleteClick: PropTypes.func,
    onGroupClick: PropTypes.func,
    onSearch: PropTypes.func,
    ui: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    query: state.manager.ui.userGroupListSearchQuery,
});

const mapDispatchToProps = dispatch => ({
    onSearch: query => dispatch(updateUserGroupListSearchQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PMUserGroupsTab);
