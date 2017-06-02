import React, { Component } from 'react';
import StageSlot from './StageSlot';

const _assigneeLookup = (stage, subjectKey, assignees) =>
  assignees.find(
    (element) => element.subject === subjectKey && element.stage === stage.id) ||
    {stage: stage.id, subject: subjectKey, startDate: stage.startStage,
      endDate: stage.endStage, unassigned: true};

class FilteredRow extends Component {
  // methods to determine filter status
  responsesExist(assigneeData) {
    return !!assigneeData.response;
  };
  responsesComplete(assigneeData) {
    return assigneeData.response &&
      assigneeData.response.every((response) => !!response.value);
  };
  dueDateInPast(assigneeData) {
    var stage = this.props.stages.find(stage => stage.id === assigneeData.stage);
    const dueDate = assigneeData.dueDate || stage.endStage;
    return Date.parse(dueDate) < Date.now();
  };

  assigneeIsFilteredOut(assigneeData) {
    switch (this.props.filter) {
      case 'unassigned':
        return !assigneeData.unassigned;
      case 'late':
        return !(this.dueDateInPast(assigneeData) && !this.responsesComplete(assigneeData));
      case 'inprogress':
        return !(this.responsesExist(assigneeData) && !this.responsesComplete(assigneeData));
      case 'notstarted':
        return this.responsesExist(assigneeData);
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
            <StageSlot {...assignee}
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
