import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTime from 'grommet/components/DateTime';
import PropTypes from 'prop-types';

import { updateTaskDueDate } from '../actions';

class TaskDetails extends Component {
    constructor(props) {
        super(props);
        this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
    }

    handleTaskDueDateChange(event){
        this.props.updateTaskDueDate(this.props.task.id, this.props.projectId, event);
    }

    render() {
        return (
            <div className='task-details'>
                <div className='task-details__header'>
                    <span className='task-details__header-name'>{this.props.user.name}</span><br/>
                    <span>{this.props.vocab.PROJECT.TASK_VIEW}</span>
                </div>
                <div className='task-details__info'>
                    <div className='task-details__info-box'>
                        <span>{this.props.stage.title}</span><br/>
                        <span>{this.props.vocab.PROJECT.STAGE}</span>
                    </div>
                    <div className='task-details__info-box'>
                        <span>{this.props.subject}</span><br/>
                        <span>{this.props.vocab.PROJECT.SUBJECT}</span>
                    </div>
                    <div className='task-details__info-box'>
                        <DateTime id='taskDueDate'
                            format='MM/DD/YYYY'
                            onChange={this.handleTaskDueDateChange}
                            value={this.props.task.dueDate ||
                            this.props.stage.endStage}/><br/>
                        <span>{this.props.vocab.PROJECT.TASK_DUE_DATE}</span>
                    </div>
                    <div className='task-details__info-box'>
                        <span>{this.props.surveyName}</span><br/>
                        <span>{this.props.vocab.PROJECT.SURVEY}</span>
                    </div>
                </div>
            </div>
        )
    }
}

TaskDetails.propTypes = {
    stage: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    task: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    surveyName: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    projectId: PropTypes.number.isRequired,
    updateTaskDueDate: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  updateTaskDueDate: (assigneeId, projectId, dueDate) =>
    dispatch(updateTaskDueDate(assigneeId, projectId, dueDate))
});

export default connect(null, mapDispatchToProps)(TaskDetails);
