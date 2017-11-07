import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PMUserListHeader from './PMUserListHeader';
import PMUserListRow from './PMUserListRow';

class PMUserList extends Component {
    render() {
        return (
            <div className='pm-user-list'>
                <PMUserListHeader vocab={this.props.vocab} />
                {this.props.users
                    .map(user =>
                    <PMUserListRow user={user}
                        groups={this.props.project.userGroups}
                        key={user.id}
                        onNameClick={() => this.props.actions.pmProjectShowProfile(user.id)}
                        onDeleteClick={() => this.props.actions.removeUser(
                            user.id,
                            this.props.project.id,
                            this.props.vocab.ERROR)}
                        vocab={this.props.vocab}/>)}
            </div>
        );
    }
}

PMUserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
    })).isRequired,
};

export default PMUserList;
