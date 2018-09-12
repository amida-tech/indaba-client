import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserGroupListEntry from './UserGroupListEntry';

class UserGroupList extends Component {
    render() {
        return (
            <div className='user-group-list'>
                {
                    this.props.columnHeaders
                    && <div className='user-group-list__header'>
                        <div className={'user-group-list__header-section '
                            + 'user-group-list__header-section--name'}>
                            {this.props.vocab.PROJECT.GROUP_NAME}
                        </div>
                        <div className={'user-group-list__header-section '
                            + 'user-group-list__header-section--members'}>
                            {this.props.vocab.PROJECT.GROUP_MEMBERS}
                        </div>
                        <div className={'user-group-list__header-section '
                            + 'user-group-list__header-section--action'}>
                            { this.props.onDeleteClick && this.props.vocab.COMMON.ACTIONS }
                        </div>
                    </div>
                }
                {this.props.groups.map(group => <UserGroupListEntry
                    key={group.id}
                    group={group}
                    onDeleteClick={this.props.onDeleteClick}
                    onGroupClick={this.props.onGroupClick
                            && (() => this.props.onGroupClick(group.id))}
                    users={this.props.users}/>)}
            </div>
        );
    }
}

UserGroupList.propTypes = {
    columnHeaders: PropTypes.bool,
    groups: PropTypes.arrayOf(PropTypes.object).isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    vocab: PropTypes.object,
    onDeleteClick: PropTypes.func,
    onGroupClick: PropTypes.func,
};
export default UserGroupList;
