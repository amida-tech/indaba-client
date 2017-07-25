import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FlagCount from '../../../common/components/Dashboard/FlagCount';

class UserTaskListEntry extends Component {
    render() {
        return (
            <div className='user-task-list-entry'>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--subject'>
                    {this.props.subject}
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--task'>
                    {this.props.task}
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--due'>
                    {this.props.due}
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--survey'>
                    {this.props.survey}
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--flags'>
                    <FlagCount value={this.props.flags} />
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--progress'>
                    {this.props.progress}
                </div>
            </div>
        );
    }
}

UserTaskListEntry.propTypes = {
    subject: PropTypes.string.isRequired,
    task: PropTypes.string.isRequired,
    due: PropTypes.string.isRequired,
    survey: PropTypes.string.isRequired,
    flags: PropTypes.number.isRequired,
    progress: PropTypes.string.isRequired,
};

export default UserTaskListEntry;
