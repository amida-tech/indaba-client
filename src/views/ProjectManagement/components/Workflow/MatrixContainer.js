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
}

export default DragDropContext(HTML5Backend)(MatrixContainer);
