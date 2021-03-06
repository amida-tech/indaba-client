import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserTaskFilter from './UserTaskFilter';

class UserTaskListControls extends Component {
    render() {
        return (
            <div className='user-task-list-controls'>
                <div className='user-task-list-controls__filter'>
                    <UserTaskFilter active={this.props.filter}
                        vocab={this.props.vocab}
                        onSetFilter={this.props.actions.setFilter} />
                </div>
            </div>
        );
    }
}

UserTaskListControls.propTypes = {
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    filter: PropTypes.string.isRequired,
};

export default UserTaskListControls;
