import React, { Component } from 'react';
import DateTime from 'grommet/components/DateTime';
import PropTypes from 'prop-types';

import { renderName } from '../../../utils/User';

class TaskDetails extends Component {
    render() {
        return (
            <div className='task-details'>
                <div className='task-details__header'>
                    <div className='task-details__header--label'>
                        {this.props.vocab.PROJECT.TASK_VIEW}
                    </div>
                    <div className='task-details__header--name'>
                        {renderName(this.props.taskedUser)}
                    </div>
                </div>

                <div className='task-details__info'>
                    <div className='task-details__info-box task-details__info-box--first'>
                        <div className='task-details__info-box-label'>
                            {this.props.vocab.PROJECT.STAGE}
                        </div>
                        <div className='task-details__info-box-title'>
                            {this.props.stage.title}
                        </div>
                    </div>
                    <div className='task-details__info-box'>
                        <div className='task-details__info-box-label'>
                            {this.props.vocab.PROJECT.SUBJECT}
                        </div>
                        <div className='task-details__info-box-title'>
                            {this.props.subject}
                        </div>
                    </div>
                    <div className='task-details__info-box'>
                    <div className='task-details__info-box-label'>
                        {this.props.vocab.PROJECT.TASK_DUE_DATE}
                    </div>
                    <DateTime id='taskDueDate' className='task-details__info-box-datetime'
                        format='MM/DD/YYYY'
                        onChange={event =>
                            this.props.updateTaskDueDate(
                                this.props.task.id,
                                this.props.projectId,
                                event)}
                        value={this.props.task.dueDate ||
                        this.props.stage.endStage}/><br/>
                    </div>
                    <div className='task-details__info-box'>
                        <div className='task-details__info-box-label'>
                            {this.props.vocab.PROJECT.SURVEY}
                        </div>
                        <div className='task-details__info-box--survey'>
                            {this.props.surveyName}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TaskDetails.propTypes = {
    stage: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    taskedUser: PropTypes.object.isRequired,
    surveyName: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default TaskDetails;
