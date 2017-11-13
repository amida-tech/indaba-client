import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PMUserListHeader from './PMUserListHeader';
import PMUserListRow from './PMUserListRow';

class PMUserList extends Component {
    render() {
        return (
            <div className='pm-user-list'>
                <PMUserListHeader vocab={this.props.vocab} groups={!!this.props.groups} />
                {
                    this.props.users.map(user =>
                        <PMUserListRow user={user}
                            groups={this.props.groups}
                            key={user.id}
                            onNameClick={() => this.props.onUserNameClick(user.id)}
                            onDeleteClick={() => this.props.onUserDeleteClick(user.id)}
                            onMailClick={() => this.props.onUserMailClick(user.id)}
                            vocab={this.props.vocab}/>)
                }
            </div>
        );
    }
}

PMUserList.propTypes = {
    vocab: PropTypes.object.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onUserNameClick: PropTypes.func.isRequired,
    onUserDeleteClick: PropTypes.func.isRequired,
    onUserMailClick: PropTypes.func.isRequired,

    // Group column not rendered if absent
    groups: PropTypes.arrayOf(PropTypes.object),
};

export default PMUserList;
