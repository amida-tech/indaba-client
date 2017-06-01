import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import StageSlot from './StageSlot';
import AssigneeCard from './AssigneeCard';
import Sidebar from './Sidebar';
import StageSummary from './StageSummary';

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
            <tr key={`SubjectHeader-${key}`}>
              <td key={key} className='grid-subject'>{subject}</td>
              {this.props.data.project.workflow.stages.map(stage =>
                <td key={`StageSlot-${key}-${stage.id}`} className='stage-slot-cell'>
                  <StageSlot {...this._assignmentCheck(stage, subject, key, assignees)}/>
                </td>)}
              </tr>
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

  _assignmentCheck(stage, subject, key, assignees) {
    for(var i = 0; i < assignees.length; i++){
      if(assignees[i].subject === key && assignees[i].stage === stage.id){
        var goal = assignees[i];
        //goal.stageInfo = stage;
        goal.vocab = this.props.vocab.PROJECT.CARD;
        return(goal);
      } // TODO: Was splicing assignees before but this altered state. Investigate.
    }
    return({'stage': stage.id, 'subject': key, 'startDate': stage.startStage,
      'endDate': stage.endStage, 'vocab' : this.props.vocab.PROJECT.CARD});
  }
}

export default DragDropContext(HTML5Backend)(MatrixContainer);
