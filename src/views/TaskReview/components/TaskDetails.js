import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTime from 'grommet/components/DateTime';

import { updateTaskDueDate } from '../actions';

class TaskDetails extends Component {
    constructor(props) {
        super(props);
        this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
    }

    handleTaskDueDateChange(event){
        this.props.updateTaskDueDate(this.props.assignee.id, 0, event);
    }

    render() {
        return (
            <div className='task-details'>
                <div className='task-details__header'>
                    <span className='task-details__header-name'>{this.props.assignee.name}</span><br/>
                    <span>{this.props.vocab.PROJECT.TASK_VIEW}</span>
                </div>
                <div className='task-view__detail-block'>
                    <div className='task-details__detail-box'>
                        <span>{this.props.stage.title}</span><br/>
                        <span>{this.props.vocab.PROJECT.STAGE}</span>
                    </div>
                    <div className='task-details__detail-box'>
                        <span>{this.props.subject}</span><br/>
                        <span>{this.props.vocab.PROJECT.SUBJECT}</span>
                    </div>
                    <div className='task-details__detail-box'>
                        <DateTime id='taskDueDate'
                            format='MM/DD/YYYY'
                            onChange={this.handleTaskDueDateChange}
                            value={this.props.assignee.dueDate ||
                            this.props.stage.endStage}/><br/>
                        <span>{this.props.vocab.PROJECT.TASK_DUE_DATE}</span>
                    </div>
                    <div className='task-details__detail-box'>
                        <span>{this.props.surveyName}</span><br/>
                        <span>{this.props.vocab.PROJECT.SURVEY}</span>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  updateTaskDueDate: (assigneeId, projectId, dueDate) =>
    dispatch(updateTaskDueDate(assigneeId, projectId, dueDate))
});

export default connect(null, mapDispatchToProps)(TaskDetails);
