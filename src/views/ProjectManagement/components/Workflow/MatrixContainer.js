import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import StageSlot from './StageSlot';
import AssigneeCard from './AssigneeCard';
import Sidebar from './Sidebar';
import StageSummary from './StageSummary';

const _assigneeLookup = (stage, subjectKey, assignees) =>
  assignees.find(
    (element) => element.subject === subjectKey && element.stage === stage.id) ||
    {stage: stage.id, subject: subjectKey, unassigned: true};

class FilteredRow extends Component {
  // methods to determine filter status
  responsesExist(assigneeData) {
    // TODO
    // return assigneeData.responses
    return false;
  };
  responsesComplete(assigneeData) {
    // TODO
    // return assigneeData.responses &&
    // assigneeData.responses.every((response) => response.value);
    return false;
  };
  isLate(assigneeData) {
    var stage = this.props.stages.find(stage => stage.id === assigneeData.stage);
    const dueDate = assigneeData.dueDate || stage.endStage;
    return Date.parse(dueDate) < Date.now()
  };

  assigneeIsFilteredOut(assigneeData) {
    switch (this.props.filter) {
      case 'unassigned':
        return !assigneeData.unassigned;
      case 'late':
        return this.isLate(assigneeData);
      case 'inprogress':
        return this.responsesExist(assigneeData) && !responsesComplete(assigneeData);
      case 'notstarted':
        return !this.responsesExist(assigneeData);
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
            <StageSlot {...assignee} filtered={this.assigneeIsFilteredOut(assignee)}/>
          </td>
        )}
      </tr>
    )
  }
}

class MatrixContainer extends Component {
  /*
   So under the subject headers, we should add the individual stage slots,
   which in turn will be passed the assignee cards.
  */

  render() {
    const assignees = this.props.data.project.workflow.assignees.slice();
    let slot = null;
    const Grid = (
      <table className="table table-bordered workflow-table" key="MatrixContainer">
        <thead>
          <tr key="StageHeader">
            <th></th>
            {this.props.data.project.workflow.stages.map(stage =>
              <th key={stage.id}>{stage.title}</th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr key={'Summary'}>
            <td key='empty-subject-summary-row'></td>
            {this.props.data.project.workflow.stages.map(stage =>
              <td key={`StageSummary-${stage.id}`} className='stage-summary-cell'>
                <StageSummary stage={stage} vocab={this.props.vocab}/>
              </td>)}
          </tr>
          {this.props.data.project.workflow.subjects.map((subject,key) =>
            <FilteredRow key={key}
              subject={{name: subject, key}}
              stages={this.props.data.project.workflow.stages}
              assignees={assignees}
              filter={this.props.data.project.workflow.filter}/>
          )}
        </tbody>
      </table>
    );
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 grid-column">{Grid}</div>
          <div className="col-sm-4"><Sidebar {...this.props} /></div>
        </div>
      </div>
    )
  }

}

export default DragDropContext(HTML5Backend)(MatrixContainer);
