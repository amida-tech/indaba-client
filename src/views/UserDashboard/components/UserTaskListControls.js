import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserTaskFilter from './UserTaskFilter';
import SearchInput from '../../../common/components/Dashboard/SearchInput';

class UserTaskListControls extends Component {
    render() {
        return (
            <div className='user-task-list-controls'>
                <SearchInput className='user-task-list-controls__search'
                    placeholder={this.props.vocab.COMMON.SEARCH}
                    onChange={evt => this.props.actions.setSearchQuery(evt.target.value)}/>
                <UserTaskFilter active={this.props.filter}
                    vocab={this.props.vocab}
                    onSetFilter={this.props.actions.setFilter} />
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
