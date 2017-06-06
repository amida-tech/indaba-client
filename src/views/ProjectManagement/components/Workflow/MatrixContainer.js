import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import AssigneeCard from './AssigneeCard';
import UserSidebar from './UserSidebar';
import StageSummary from './StageSummary';
import FilteredRow from './FilteredRow';

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
              user={this.props.data.user}
              vocab={this.props.vocab}
              filter={this.props.data.project.workflow.filter}/>
          )}
        </tbody>
      </table>
    );
    return(
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-8 grid-column">{Grid}</div>
          <div className="col-sm-4"><UserSidebar {...this.props} /></div>
        </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(MatrixContainer);
