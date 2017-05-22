import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import StageSlot from './StageSlot';
import AssigneeCard from './AssigneeCard';

class MatrixContainer extends Component {
  /*
   So under the subject headers, we should add the individual stage slots,
   which in turn will be passed the assignee cards.
  */

  render() {
    const assignees = this.props.data.project.workflow.assignees;
    let slot = null;
    const Grid = (
      <div className="container" key="MatrixContainer">
        <div className="row" key="StageHeader">
          <div className="col-md-2" key="blank"> </div>
          {this.props.data.project.workflow.stages.map(stage =>
            <div className="col-md-2" key={stage.id}>{stage.title}</div>
          )}
        </div>
        {this.props.data.project.workflow.subjects.map((subject, key) =>
          <div className="row" key={"SubjectHeader-"+key}>
            <div className="col-md-2" key={key}>{subject}</div>
            {this.props.data.project.workflow.stages.map(stage =>
              <div className="col-md-2"><StageSlot {...this._assignmentCheck(stage, subject, key, assignees)} /></div>
              )
            }
          </div>
        )}
      </div>
    );
    return(
      <div>
      {Grid}
      </div>
    )
  }

  _assignmentCheck(stage, subject, key, assignees) {
    for(var i = 0; i < assignees.length; i++){
      if(assignees[i].subject === key && assignees[i].stage === stage.id){
        var goal = assignees[i];
        assignees = assignees.splice(i,1);
        return(goal);
      }
    }
    return(null);
  }
}

export default DragDropContext(HTML5Backend)(MatrixContainer);
