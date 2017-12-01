import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import HTML5Backend from 'react-dnd-html5-backend';

import TaskOptionsModal from '../Modals/TaskOptions';
import AssigneeContainer from './AssigneeContainer';
import StageSummary from './StageSummary';
import FilteredRow from './FilteredRow';

class MatrixContainer extends Component {
    render() {
        return (
            <div className='matrix-container'>
                {this.props.ui.taskOptions.show &&
                    <TaskOptionsModal
                        vocab={this.props.vocab}
                        task={this.props.ui.taskOptions.task}
                        userGroups={this.props.ui.taskOptions.userGroups}
                        users={this.props.users}
                        profile={this.props.profile}
                        projectId={this.props.project.id}
                        actions={this.props.actions} />}
                    <div className='matrix-container__task-matrix'>
                        <table className='table table-bordered workflow-table'
                            key='MatrixContainer'>
                            <thead>
                                <tr key={'Summary'}>
                                    <td className='matrix-container__subject'
                                        key='empty-subject-summary-row'>
                                            {this.props.vocab.COMMON.SUBJECTS}
                                    </td>
                                    {this.props.project.stages.map(stage =>
                                    <td key={`StageSummary-${stage.id}`} className='stage-summary-cell'>
                                        <StageSummary stage={stage}
                                            actions={this.props.actions}
                                            userGroups={this.props.project.userGroups}
                                            vocab={this.props.vocab}/>
                                    </td>)}
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.project.subjects.map((subject, key) =>
                                    <FilteredRow key={key}
                                      subject={{ name: subject.name, id: subject.id, key }}
                                      surveySize={this.props.survey.questions ?
                                          this.props.survey.questions.length : 0}
                                      stages={this.props.project.stages}
                                      tasks={this.props.tasks}
                                      responses={this.props.responses}
                                      users={this.props.users}
                                      vocab={this.props.vocab}
                                      project={this.props.project}
                                      filter={this.props.project.filter}/>,
                                )}
                            </tbody>
                        </table>
                    </div>
                <div className='matrix-container__sidebar'>
                    <AssigneeContainer {...this.props} />
                </div>
            </div>
        );
    }
}

export default compose(
    withRouter,
    DragDropContext(HTML5Backend),
)(MatrixContainer);
