import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';

import AssigneeCard from './AssigneeCard';
import UserSidebar from './UserSidebar';
import StageSummary from './StageSummary';
import FilteredRow from './FilteredRow';

class MatrixContainer extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <div className='row'>
                  <div className='col-sm-8 grid-column'>
                      <table className='table table-bordered workflow-table' key='MatrixContainer'>
                        <thead>
                          <tr key='StageHeader'>
                            <th></th>
                            {this.props.project.stages.map(stage =>
                              <th key={stage.id}>{stage.title}</th>,
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr key={'Summary'}>
                            <td key='empty-subject-summary-row'></td>
                            {this.props.project.stages.map(stage =>
                              <td key={`StageSummary-${stage.id}`} className='stage-summary-cell'>
                                <StageSummary stage={stage}
                                    userGroups={this.props.project.userGroups}
                                    vocab={this.props.vocab}/>
                              </td>)}
                          </tr>
                          {this.props.project.subjects.map((subject, key) =>
                            <FilteredRow key={key}
                              subject={{ name: subject, key }}
                              stages={this.props.project.stages}
                              tasks={this.props.project.tasks}
                              users={this.props.users}
                              vocab={this.props.vocab}
                              project={this.props.project}
                              filter={this.props.project.filter}/>,
                          )}
                        </tbody>
                      </table>
                  </div>
                  <div className='col-sm-4'><UserSidebar {...this.props} /></div>
                </div>
            </div>
        );
    }
}

//Use lodash here James to get the proper project.
const mapStateToProps = (state, ownProps) => ({
    users: state.user.users,
    project: state.project.projects[ownProps.params.projectId || 0],
    vocab: state.settings.language.vocabulary
})

export default compose(
    connect(mapStateToProps),
    withRouter,
    DragDropContext(HTML5Backend)
)(MatrixContainer);
