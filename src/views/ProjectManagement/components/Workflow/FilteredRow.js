import React, { Component } from 'react';
import _ from 'lodash';

import StageSlot from './StageSlot';
import TaskStatus from '../../../../utils/TaskStatus';

const _taskLookup = (stage, subjectId, tasks, responses) => {
    const newTask = Object.assign({}, tasks.find(
        element => element.uoaId === subjectId && element.stepId === stage.id) ||
        { stepId: stage.id, uoaId: subjectId, userIds: [] });
    const response = _.find(responses, chat => chat.taskId === newTask.id);
    if (response) newTask.response = response.discuss;
    return newTask;
};

class FilteredRow extends Component {
    taskIsFilteredOut(taskData) {
        switch (this.props.filter) {
        case 'unassigned':
            return !_.isEmpty(taskData.userIds);
        case 'late':
            return !taskData.userIds ||
                (!(TaskStatus.endDateInPast(taskData) &&
                !TaskStatus.responsesComplete(taskData, this.props.surveySize)));
        case 'inprogress':
            return !taskData.userIds ||
                (!(TaskStatus.responsesExist(taskData) &&
                !TaskStatus.responsesComplete(taskData, this.props.surveySize)));
        case 'notstarted':
            return !taskData.userIds || TaskStatus.responsesExist(taskData);
        case 'flagged':
            return !taskData.userIds || !TaskStatus.responsesFlagged(taskData);
        default:
            return '';
        }
    }

    rowIsFilteredOut(taskData) {
        return taskData.every(this.taskIsFilteredOut.bind(this));
    }

    render() {
        const taskData =
            this.props.stages.map(
                stage => _taskLookup(stage, this.props.subject.id,
                this.props.tasks, this.props.responses));
        return this.rowIsFilteredOut(taskData) ? null : (
            <tr key={`SubjectHeader-${this.props.subject.key}`}
                className='filtered-row'>
            <td key={this.props.subject.key} className='grid-subject'>
                {this.props.subject.name}
            </td>
            {taskData.map(task =>
                <td key={`StageSlot-${task.uoaId}-${task.stepId}`}
                    className='filtered-row__cell'>
                    <StageSlot task={task}
                        user={_.find(this.props.users, user => user.id === task.userIds[0])}
                        users={this.props.users}
                        filtered={this.taskIsFilteredOut(task)}
                        stageData={this.props.stages.find(stage =>
                            stage.id === task.stepId)}
                        surveySize={this.props.surveySize}
                        project={this.props.project}
                        vocab={this.props.vocab}/>
                </td>,
            )}
            </tr>
        );
    }
}

export default FilteredRow;
