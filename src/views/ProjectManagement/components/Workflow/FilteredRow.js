import React, { Component } from 'react';
import StageSlot from './StageSlot';
import TaskStatus from '../../../../utils/TaskStatus';
import _ from 'lodash';

const _taskLookup = (stage, subjectKey, tasks) =>
    tasks.find(
        element => element.subject === subjectKey && element.stage === stage.id) ||
        { stage: stage.id,
            subject: subjectKey,
            startDate: stage.startStage,
            endDate: stage.endStage,
            unassigned: true };

class FilteredRow extends Component {
    taskIsFilteredOut(taskData) {
        switch (this.props.filter) {
        case 'unassigned':
            return !taskData.unassigned;
        case 'late':
            return !(TaskStatus.dueDateInPast(taskData, this.props.stages) &&
                    !TaskStatus.responsesComplete(taskData));
        case 'inprogress':
            return !(TaskStatus.responsesExist(taskData) &&
                    !TaskStatus.responsesComplete(taskData));
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
                this.props.tasks));
        return this.rowIsFilteredOut(taskData) ? null : (
            <tr key={`SubjectHeader-${this.props.subject.key}`}>
            <td key={this.props.subject.key} className='grid-subject'>
                {this.props.subject.name}
            </td>
            {taskData.map(task =>
                <td key={`StageSlot-${task.subject}-${task.stage}`}
                    className='stage-slot-cell'>
                <StageSlot task={task}
                    user={_.find(this.props.users, (user) => user.id === task.userId)}
                    filtered={this.taskIsFilteredOut(task)}
                    stageData={this.props.stages.find(stage =>
                        stage.id === task.stage)}
                    project={this.props.project}
                    vocab={this.props.vocab.PROJECT.CARD}/>
                </td>,
            )}
            </tr>
        );
    }
}

export default FilteredRow;
