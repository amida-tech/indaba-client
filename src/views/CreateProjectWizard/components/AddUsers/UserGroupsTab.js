import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import apiService from '../../../../services/api';
import UserGroupList from '../../../../common/components/UserGroupList';

class UserGroupsTab extends Component {
    constructor(props) {
        super(props);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    handleDeleteClick(groupId) {
        apiService.projects.deleteGroup(groupId)
            .then(() => {
                this.props.actions.getProjectById(this.props.projectId, false, this.props.vocab.ERROR);
            })
            .catch(() => {
                toast(this.props.vocab.ERROR.GROUP_DELETE, { autoClose: false, type: 'error' });
            });
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='user-groups-tab'>
                    <UserGroupList columnHeaders={true}
                        vocab={this.props.vocab}
                        groups={this.props.groups}
                        users={this.props.allUsers}
                        onDeleteClick={this.handleDeleteClick}/>
                </div>
            </div>

        );
    }
}

UserGroupsTab.propTypes = {
    allUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object.isRequired,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    projectId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        removeUser: PropTypes.func.isRequired,
    }).isRequired,
};

export default UserGroupsTab;
