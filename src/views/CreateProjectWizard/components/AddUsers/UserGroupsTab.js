import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Box, TextInput } from 'grommet';
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
            <Box className='user-groups-tab'
                pad={{ horizontal: 'medium', vertical: 'medium', between: 'small' }}>
                <div className='user-groups-tab__search-header'>
                    <TextInput
                        placeHolder={this.props.vocab.PROJECT.SEARCH_FOR_USER_GROUPS}
                        value={this.props.filter}
                        onDOMChange={evt =>
                            this.props.actions.addUsersSetGroupsFilter(evt.target.value)}/>
                </div>
                <UserGroupList
                    groups={this.props.groups.filter(this.filterGroup)}
                    users={this.props.allUsers}
                    onDeleteClick={this.props.actions.removeUser}/>
            </Box>
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
