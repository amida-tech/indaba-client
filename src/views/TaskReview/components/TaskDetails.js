import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Time from '../../../utils/Time';
import { renderName } from '../../../utils/User';
import DateInput from '../../../common/components/DateInput';

class TaskDetails extends Component {
    render() {
        return (
            <div className='task-details'>
                <div className='task-details__header'>
                    <div className='task-details__header-left'>
                        <div className='task-details__header-label'>
                            {this.props.vocab.PROJECT.TASK_VIEW}
                        </div>
                        <div className='task-details__header-name'>
                            {renderName(this.props.taskedUser)}
                        </div>
                    </div>
                    <div className='task-details__header-right'>
                        <div className='task-details__header-label'>
                            {this.props.vocab.PROJECT.ACTIVITY}
                        </div>
                        <div className='task-details__header-permissions'
                            title={this.props.vocab.PROJECT.ACTIVITY_DESC[this.props.activity]}>
                            {this.props.vocab.PROJECT.ACTIVITY_OPTIONS[this.props.activity]}
                        </div>
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
                            {this.props.subject.name}
                        </div>
                    </div>
                    <div className='task-details__info-box'>
                    <div className='task-details__info-box-label'>
                        {this.props.vocab.PROJECT.TASK_DUE_DATE}
                    </div>
                    { this.props.profile.roleID === 2 ?
                        <DateInput value={this.props.task.endDate}
                            onChange={(event) => {
                                this.props.actions.updateTask(
                                    this.props.task.id,
                                    this.props.task.userIds,
                                    new Date(event),
                                    this.props.vocab.ERROR);
                            }}
                            expanded={false} /> :
                        <div className='task-details__info-box-title'>
                            {Time.renderCommon(this.props.task.endDate)}
                        </div>
                    }
                    </div>
                    <div className='task-details__info-box'>
                        <div className='task-details__info-box-label'>
                            {this.props.vocab.PROJECT.SURVEY}
                        </div>
                        <div className='task-details__info-box-survey'>
                            {this.props.surveyName}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TaskDetails.propTypes = {
    profile: PropTypes.shape({
        roleID: PropTypes.number,
    }).isRequired,
    actions: PropTypes.shape({
        updateTask: PropTypes.func.isRequired,
    }).isRequired,
    stage: PropTypes.shape({
        title: PropTypes.string,
    }).isRequired,
    task: PropTypes.shape({
        userIds: PropTypes.array,
        endDate: PropTypes.date,
    }),
    taskedUser: PropTypes.object.isRequired,
    surveyName: PropTypes.string.isRequired,
    subject: PropTypes.object.isRequired,
    projectId: PropTypes.number.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default TaskDetails;
