import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import StageSlot from './StageSlot';
import AssigneeCard from './AssigneeCard';
import Sidebar from './Sidebar';

class MatrixContainer extends Component {
  /*
   So under the subject headers, we should add the individual stage slots,
   which in turn will be passed the assignee cards.
  */

  render() {
    const assignees = this.props.data.project.workflow.assignees.slice();
    let slot = null;
    const Grid = (
      <div className="container" key="MatrixContainer">
        <div className="row" key="StageHeader">
          <div className="col-md-1" key="blank"> </div>
          {this.props.data.project.workflow.stages.map(stage =>
            <div className="col-md-3" key={stage.id}>{stage.title}</div>
          )}
        </div>
        {this.props.data.project.workflow.subjects.map((subject, key) =>
          <div className="row" key={"SubjectHeader-"+key}>
            <div className="col-md-1" key={key}>{subject}</div>
            {this.props.data.project.workflow.stages.map(stage =>
              <div className="col-md-3" key={"StageSlot-"+key+stage.id}>
                <StageSlot {...this._assignmentCheck(stage, subject, key, assignees)} />
              </div>
              )
            }
          </div>
        )}
      </div>
    );
    return(
      <div className="row">
        <div className="col-md-7">{Grid}</div>
        <div className="col-md-3"><Sidebar {...this.props} /></div>
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
