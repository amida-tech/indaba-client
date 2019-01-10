import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { filter } from 'lodash';

import Search from '../../../../common/components/Search';
import apiService from '../../../../services/api';
import UserGroupList from '../../../../common/components/UserGroupList';

class UserGroupsTab extends Component {
    constructor(props) {
        super(props);
        this.filterGroup = this.filterGroup.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
    }

    filterGroup(group) {
        return group.title.toLowerCase().includes(this.props.filter.toLowerCase())
            && group.projectId !== this.props.project.id;
    }

    handleChange(evt) {
        this.props.actions.addUsersSetGroupsFilter(evt.target.value);
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

    handleSearchSelect(selection) {
        const duplicates = filter(this.props.project.userGroups, group =>
            group.title === selection.value.title);
        if (duplicates.length > 0) {
            toast(this.props.vocab.ERROR.DUPLICATE_GROUP_CHOICE);
        } else {
            this.props.actions.addUsersSetGroupsFilter('');
            this.props.actions.addUserGroup(
                selection.value,
                this.props.project.id,
                this.props.organizationId,
                this.props.vocab.ERROR
            );
        }
    }

    render() {
        return (
            <div className='wrapper'>
                <div className='user-groups-tab'>
                    <Search className='user-groups-tab__search-input'
                        placeholder={this.props.vocab.PROJECT.SEARCH_FOR_COPY_USER_GROUP}
                        value={this.props.filter}
                        list={this.props.groups.filter(this.filterGroup)
                            .map(group => ({
                                label: group.title,
                                value: group,
                                hint: `(${this.props.vocab.PROJECT.OF_PROJECT} "${group.projectName}",
                                    ${this.props.vocab.PROJECT.USER_COUNT}
                                    ${group.users.length})`
                            }))}
                        onChange={this.handleChange}
                        onSelect={this.handleSearchSelect}/>
                    <UserGroupList groups={this.props.project.userGroups}
                        users={this.props.users}
                        onDeleteClick={this.handleDeleteClick}/>
                </div>
            </div>

        );
    }
}

UserGroupsTab.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        userGroups: PropTypes.array.isRequired,
    }).isRequired,
    filter: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    groups: PropTypes.arrayOf(PropTypes.shape({
        projectId: PropTypes.number,
        projectName: PropTypes.string.isRequired,
        id: PropTypes.number,
        title: PropTypes.string.isRequired,
        users: PropTypes.array.isRequired,
    })).isRequired,
    organizationId: PropTypes.number.isRequired,
    projectId: PropTypes.number.isRequired,
    actions: PropTypes.shape({
        removeUser: PropTypes.func.isRequired,
    }).isRequired,
};

export default UserGroupsTab;
