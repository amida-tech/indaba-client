import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

import Time from '../../../utils/Time';
import FlagCount from '../../../common/components/Dashboard/FlagCount';
import StatusLabel, { StatusLabelType } from '../../../common/components/StatusLabel';

class UserTaskListEntry extends Component {
    render() {
        // TODO: Once INBA-433 is done, this return where is the check goes
        return (
            <Link className='user-task-list-entry'
                to={{
                    pathname: `/task-review/${this.props.projectId}/${this.props.task.id}`,
                    state: { referrer: document.location.pathname },
                }}>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--subject'>
                    {this.props.subject}
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--task'>
                    {this.props.late &&
                    <StatusLabel label={this.props.vocab.COMMON.LATE}
                                 type={StatusLabelType.BAD}/>}
                    {!this.props.late && this.props.new &&
                    <StatusLabel label={this.props.vocab.COMMON.NEW}
                                 type={StatusLabelType.GOOD} />}
                    {this.props.task.title}
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--due'>
                    {
                        Time.renderEndDateForTaskList(
                            this.props.due,
                            this.props.vocab,
                        )
                    }
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--survey'>
                    {this.props.survey}
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--flags'>
                    <FlagCount value={this.props.flags}/>
                </div>
                <div className='user-task-list-entry__cell user-task-list-entry__cell--activity'
                    title={this.props.vocab.PROJECT.ACTIVITY_DESC[this.props.activity]}>
                    {this.props.vocab.PROJECT.ACTIVITY_OPTIONS[this.props.activity]}
                </div>
            </Link>
        );
    }
}

UserTaskListEntry.propTypes = {
    subject: PropTypes.string.isRequired,
    task: PropTypes.object.isRequired,
    due: PropTypes.string.isRequired,
    survey: PropTypes.string.isRequired,
    flags: PropTypes.number.isRequired,
    progress: PropTypes.string.isRequired,
    vocab: PropTypes.object.isRequired,
    new: PropTypes.bool.isRequired,
    late: PropTypes.bool.isRequired,
};

export default UserTaskListEntry;
