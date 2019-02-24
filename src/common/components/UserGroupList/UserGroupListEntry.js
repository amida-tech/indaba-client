import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserBadge from '../UserBadge';

class UserGroupListEntry extends Component {
    render() {
        const users = this.props.group.users.map(
            userId => this.props.users.find(user => user.id === userId),
        );
        return (
            <div className='user-group-list-entry'
                onClick={this.props.onGroupClick} >
                <div className='user-group-list-entry__name'>
                    {this.props.group.title}
                </div>
                <div className='user-group-list-entry__badge-string'>
                    {users.map(user => user && <UserBadge key={user.id} user={user}/>)}
                </div>
                {this.props.onDeleteClick
                    && <i className='far fa-trash-alt fa-lg small-icon' onClick={(event) => {
                        this.props.onDeleteClick(this.props.group.id);
                        event.stopPropagation();
                    } } />
                }
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
