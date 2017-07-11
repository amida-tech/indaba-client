import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserGroupList from '../../../../../../common/components/UserGroupList';

class ProfileUserGroupsTab extends Component {
    render() {
        const groups = this.props.project.userGroups
            .filter(group => group.users.includes(this.props.userId));
        return (
            <UserGroupList {...this.props} groups={groups}/>
        );
    }
}

ProfileUserGroupsTab.propTypes = {
    project: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object.isRequired,
};

export default ProfileUserGroupsTab;
