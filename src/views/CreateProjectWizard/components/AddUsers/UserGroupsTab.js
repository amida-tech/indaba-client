import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import Search from '../../../../common/components/Search';
import apiService from '../../../../services/api';
import UserGroupList from '../../../../common/components/UserGroupList';

class UserGroupsTab extends Component {
    constructor(props) {
        super(props);
        this.filterGroup = this.filterGroup.bind(this);
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

    filterGroup(group) {
        return group.title.toLowerCase().includes(this.props.filter.toLowerCase());
    }

    lookupUser(userId) {
        return this.props.allUsers.find(user => user.id === userId);
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='user-groups-tab'>
                    <Search className='user-groups-tab__search-input'
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                        value={this.props.filter}
                        list={this.props.filterGroup}
                        onSelect={this.lookupUser}/>

                    <UserGroupList groups={this.props.groups.filter(this.filterGroup)}
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
    filter: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        removeUser: PropTypes.func.isRequired,
    }).isRequired,
};

export default UserGroupsTab;
