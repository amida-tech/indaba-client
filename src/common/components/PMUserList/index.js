import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PMUserListHeader from './PMUserListHeader';
import PMUserListRow from './PMUserListRow';

class PMUserList extends Component {
    render() {
        return (
            <div className='pm-user-list'>
                <PMUserListHeader vocab={this.props.vocab} />
                {
                    this.props.users.map(user =>
                        <PMUserListRow user={user}
                            groups={this.props.project.userGroups}
                            key={user.id}
                            onNameClick={() => this.props.onUserNameClick(user.id)}
                            onDeleteClick={() => this.props.onUserDeleteClick(user.id)}
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
};

export default PMUserList;
