import React, { Component } from 'react';
import StageSlot from './StageSlot';
import TaskStatus from '../../../../utils/TaskStatus';

const _assigneeLookup = (stage, subjectKey, assignees) =>
  assignees.find(
    (element) => element.subject === subjectKey && element.stage === stage.id) ||
    {stage: stage.id, subject: subjectKey, startDate: stage.startStage,
      endDate: stage.endStage, unassigned: true};

class FilteredRow extends Component {

  assigneeIsFilteredOut(assigneeData) {
    switch (this.props.filter) {
      case 'unassigned':
        return !assigneeData.unassigned;
      case 'late':
        return !(TaskStatus.dueDateInPast(assigneeData, this.props.stages) &&
                !TaskStatus.responsesComplete(assigneeData));
      case 'inprogress':
        return !(TaskStatus.responsesExist(assigneeData) &&
                !TaskStatus.responsesComplete(assigneeData));
      case 'notstarted':
        return TaskStatus.responsesExist(assigneeData);
      case 'flagged':
        return !assigneeData.flag;
      default:
        return false;
    }
  }
  rowIsFilteredOut(assigneesData) {
    return assigneesData.every(this.assigneeIsFilteredOut.bind(this));
  }
  render() {
    const assigneeData =
      this.props.stages.map(
        stage => _assigneeLookup(stage, this.props.subject.key, this.props.assignees));
    return this.rowIsFilteredOut(assigneeData) ? null : (
      <tr key={`SubjectHeader-${this.props.subject.key}`}>
        <td key={this.props.subject.key} className='grid-subject'>
          {this.props.subject.name}
        </td>
        {assigneeData.map(assignee =>
          <td key={`StageSlot-${assignee.subject}-${assignee.stage}`}
            className='stage-slot-cell'>
            <StageSlot assignee={assignee}
              filtered={this.assigneeIsFilteredOut(assignee)}
              stageData={this.props.stages.find(s => s.id === assignee.stage)}
              vocab={this.props.vocab.PROJECT.CARD}/>
          </td>
        )}
      </tr>
    )
  }
}

export default FilteredRow;
