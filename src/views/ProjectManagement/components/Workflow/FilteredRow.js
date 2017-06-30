import React, { Component } from 'react';
import _ from 'lodash';

import StageSlot from './StageSlot';
import TaskStatus from '../../../../utils/TaskStatus';

const _taskLookup = (stage, subjectKey, tasks, responses) => {
    const task = tasks.find(
        element => element.subject === subjectKey && element.stage === stage.id) ||
        { stage: stage.id, subject: subjectKey };
    const response = _.find(responses, chat => chat.taskId === task.id);
    if (response) task.response = response.discuss;
    return task;
};
class FilteredRow extends Component {
    taskIsFilteredOut(taskData) {
        switch (this.props.filter) {
        case 'unassigned':
            return taskData.userId;
        case 'late':
            return !(TaskStatus.dueDateInPast(taskData, this.props.stages) &&
                        !TaskStatus.responsesComplete(taskData, this.props.surveySize));
        case 'inprogress':
            return !(TaskStatus.responsesExist(taskData) &&
                        !TaskStatus.responsesComplete(taskData, this.props.surveySize));
        case 'notstarted':
            return TaskStatus.responsesExist(taskData);
        case 'flagged':
            return !TaskStatus.responsesFlagged(taskData);
        default:
            return false;
        }
    }

    rowIsFilteredOut(taskData) {
        return taskData.every(this.taskIsFilteredOut.bind(this));
    }

    render() {
        const taskData =
            this.props.stages.map(
                stage => _taskLookup(stage, this.props.subject.key,
                this.props.tasks, this.props.responses));
        return this.rowIsFilteredOut(taskData) ? null : (
            <tr key={`SubjectHeader-${this.props.subject.key}`}>
            <td key={this.props.subject.key} className='grid-subject'>
                {this.props.subject.name}
            </td>
            {taskData.map(task =>
                <td key={`StageSlot-${task.subject}-${task.stage}`}>
                    <StageSlot task={task}
                        user={_.find(this.props.users, user => user.id === task.userId)}
                        filtered={this.taskIsFilteredOut(task)}
                        stageData={this.props.stages.find(stage =>
                            stage.id === task.stage)}
                        surveySize={this.props.surveySize}
                        project={this.props.project}
                        vocab={this.props.vocab.PROJECT.CARD}/>
                </td>,
            )}
            </tr>
        );
    }
}

export default FilteredRow;
