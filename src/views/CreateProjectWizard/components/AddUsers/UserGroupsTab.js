import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Search } from 'grommet';
import UserGroupList from '../../../../common/components/UserGroupList';

class UserGroupsTab extends Component {
    constructor(props) {
        super(props);
        this.filterGroup = this.filterGroup.bind(this);
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
                <Search
                    placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_A_USER}
                    fill={true}
                    inline={true}
                    onSelect={this.handleSearchSelect}/>

                <UserGroupList groups={this.props.groups.filter(this.filterGroup)}
                    users={this.props.allUsers}
                    onDeleteClick={this.props.onRemoveUserGroup}/>
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
    actions: PropTypes.shape({
        removeUser: PropTypes.func.isRequired,
    }).isRequired,
};

export default UserGroupsTab;
