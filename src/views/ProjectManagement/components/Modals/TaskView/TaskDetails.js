import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTime from 'grommet/components/DateTime';
import { updateTaskDueDate } from '../../../actions';

class TaskDetails extends Component {
    constructor(props) {
        super(props);
        this.handleTaskDueDateChange = this.handleTaskDueDateChange.bind(this);
    }

    handleTaskDueDateChange(event){
        this.props.updateTaskDueDate(this.props.assignee.id, event);
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
                            onChange={this.handleTaskDueDateChange}
                            value={this.props.assignee.dueDate ||
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

const mapDispatchToProps = dispatch => ({
  updateTaskDueDate: (assignee, dueDate) => dispatch(updateTaskDueDate(assignee, dueDate))
});

export default connect(null, mapDispatchToProps)(TaskDetails);
