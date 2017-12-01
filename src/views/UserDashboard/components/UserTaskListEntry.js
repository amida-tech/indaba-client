import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import Time from '../../../utils/Time';
import FlagCount from '../../../common/components/Dashboard/FlagCount';
import StatusLabel, { StatusLabelType } from '../../../common/components/StatusLabel';

class UserTaskListEntry extends Component {
    render() {
        // TODO: Once INBA-433 is done, this return where is the check goes
        return (
            <div className='user-task-list-entry'
                onClick={() => this.props.router.push(`/task-review/${this.props.projectId}/${this.props.task.id}`)}>
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
                <div className='user-task-list-entry__cell user-task-list-entry__cell--progress'>
                    {this.props.progress}
                </div>
            </div>
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

export default withRouter(UserTaskListEntry);
