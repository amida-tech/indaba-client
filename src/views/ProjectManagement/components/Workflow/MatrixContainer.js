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
    {stage: stage.id, subject: subjectKey, startDate: stage.startStage,
      endDate: stage.endStage, unassigned: true};

class FilteredRow extends Component {
  assigneeIsFilteredOut(assigneeData) {
    switch (this.props.filter) {
      case 'unassigned':
        return !assigneeData.unassigned;
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
        {this.props.stages.map(stage =>
          <td key={`StageSlot-${this.props.subject.key}-${stage.id}`}
            className='stage-slot-cell'>
            <StageSlot {..._assigneeLookup(stage, this.props.subject.key, this.props.assignees)}
              vocab={this.props.vocab.PROJECT.CARD}/>
          </td>)}
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
              vocab={this.props.vocab}
              filter={this.props.data.project.filter}/>
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
