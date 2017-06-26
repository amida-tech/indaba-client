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
        this.props.updateTaskDueDate(this.props.task.id, 0, event);
    }

    render() {
        return (
            <div className='task-details'>
                <div className='task-details__header'>
                    <div className='task-details__header-name-label'>{this.props.vocab.PROJECT.TASK_VIEW}</div>
                    <div className='task-details__header-name'>{this.props.user.name}</div>
                </div>
                <table className='task-details__info'>

                <thead className='task-details__info-box'>
                        <td className='task-details__info-box-label'>{this.props.vocab.PROJECT.STAGE}</td>
                        <tr>
                        <td className='task-details__info-box-title'>{this.props.stage.title}</td>
                        </tr>
                    </thead>

                    <thead className='task-details__info-box'>
                        <td className='task-details__info-box-label'>{this.props.vocab.PROJECT.SUBJECT}</td>
                        <tr>
                        <td className='task-details__info-box-title'>{this.props.subject}</td>
                        </tr>
                    </thead>
                    <thead className='task-details__info-box'>
                    <td className='task-details__info-box-label'>{this.props.vocab.PROJECT.TASK_DUE_DATE}</td>
                        <DateTime id='taskDueDate' className='task-details__info-box-datetime'
                            format='MM/DD/YYYY'
                            onChange={this.handleTaskDueDateChange}
                            value={this.props.task.dueDate ||
                            this.props.stage.endStage}/><br/>
                    </thead>
                    <thead className='task-details__info-box'>
                        <td className='task-details__info-box-label'>{this.props.vocab.PROJECT.SURVEY}</td>
                        <tr>
                        <td className='task-details__info-box-survey'>{this.props.surveyName}</td>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
  updateTaskDueDate: (assigneeId, projectId, dueDate) =>
    dispatch(updateTaskDueDate(assigneeId, projectId, dueDate))
});

export default connect(null, mapDispatchToProps)(TaskDetails);
