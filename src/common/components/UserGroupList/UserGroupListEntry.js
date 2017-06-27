import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';
import UserBadge from '../UserBadge';

class UserGroupListEntry extends Component {
    render() {
        const users = this.props.group.users.map(
            userId => this.props.users.find(user => user.id === userId));
        return (
            <div className='user-group-list-entry'>
                <div className='user-group-list-entry__name'
                    onClick={this.props.onGroupClick}>
                    {this.props.group.name}
                </div>
                <div className='user-group-list-entry__badge-string'
                    onClick={this.props.onGroupClick}>
                    {users.map(user =>
                        <UserBadge key={user.id} user={user}/>,
                    )}
                </div>
                {this.props.onDeleteClick &&
                <div className='user-group-list-entry__delete'
                    onClick={() =>
                        this.props.onDeleteClick(this.props.group.id, this.props.projectId)}>
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
    onGroupClick: PropTypes.func,
};

export default UserGroupListEntry;
