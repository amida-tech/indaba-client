import React, { Component } from 'react';
import DateTime from 'grommet/components/DateTime';

class TaskDetails extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='task-view__text-container'>
                    <span className='task-view__name'>{this.props.assignee.name}</span><br/>
                    <span>{this.props.vocab.PROJECT.TASK_VIEW}</span>
                </div>
                <div className='task-view__detail-block'>
                    <div className='task-view__detail-box'>
                        <span>{this.props.stageData.title}</span><br/>
                        <span>{this.props.vocab.PROJECT.STAGE}</span>
                    </div>
                    <div className='task-view__detail-box'>
                        <span>{this.props.subject}</span><br/>
                        <span>{this.props.vocab.PROJECT.SUBJECT}</span>
                    </div>
                    <div className='task-view__detail-box'>
                        <DateTime id='taskDueDate'
                            format='MM/DD/YYYY'
                            onChange= {this.props.handleTaskDueDateChange}
                            value = {this.props.assignee.dueDate ||
                            this.props.stageData.endStage}/><br/>
                        <span>{this.props.vocab.PROJECT.TASK_DUE_DATE}</span>
                    </div>
                    <div className='task-view__detail-box'>
                        <span>{this.props.surveyName}</span><br/>
                        <span>{this.props.vocab.PROJECT.SURVEY}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default TaskDetails;
