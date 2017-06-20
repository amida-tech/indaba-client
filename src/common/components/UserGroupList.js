import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

import UserBadge from './UserBadge';

class UserGroupListEntry extends Component {
    render() {
        const users = this.props.group.users.map(
            userId => this.props.users.find(user => user.id === userId));
        return (
            <div className='user-group-list-entry'>
                <div className='user-group-list-entry__name'>
                    {this.props.group.name}
                </div>
                <div className='user-group-list__badge-string'>
                    {users.map(user =>
                        <UserBadge key={user.id} user={user}/>,
                    )}
                </div>
                {this.props.onDeleteClick &&
                <div className='user-group-list__delete'
                    onClick={() => this.props.onDeleteClick(this.props.group.id)}>
                    <IonIcon icon='ion-android-delete' />
                </div>}
            </div>
        );
    }
}

UserGroupListEntry.propTypes = {
    group: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteClick: PropTypes.func,
};

class UserGroupList extends Component {
    render() {
        return (
            <div className='user-group-list'>
                {this.props.groups.map(group =>
                    <UserGroupListEntry
                        key={group.id}
                        group={group}
                        onDeleteClick={this.props.onDeleteClick}
                        users={this.props.users}/>)}
            </div>
        );
    }
}

UserGroupList.propTypes = {
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDeleteClick: PropTypes.func,
};

export default UserGroupList;
