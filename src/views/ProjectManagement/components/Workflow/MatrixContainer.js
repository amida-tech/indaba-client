import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

import TaskOptions from '../Modals/TaskOptions';
import AssigneeContainer from './AssigneeContainer';
import StageSummary from './StageSummary';
import FilteredRow from './FilteredRow';
import {
    closeTaskOptionsModal,
    updateTaskOptionsChoice,
    updateTaskOptionsReassignUser,
    updateTaskOptionsNotify,
    updateTaskOptionsMessage,
} from '../../actions';
import { setTaskOptions } from '../../../../common/actions/tasksActions';

class MatrixContainer extends Component {
    render() {
        return (
            <div className='container-fluid'>
                {this.props.ui.taskOptions.show &&
                    <TaskOptions
                        vocab={this.props.vocab.PROJECT.OPTIONS_MODAL}
                        taskOptions={this.props.ui.taskOptions}
                        users={this.props.users}
                        projectId={this.props.project.id}
                        calls={this.props.calls} />}
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
                              surveySize={this.props.surveySize}
                              stages={this.props.project.stages}
                              tasks={this.props.tasks}
                              users={this.props.users}
                              vocab={this.props.vocab}
                              project={this.props.project}
                              filter={this.props.project.filter}/>,
                          )}
                        </tbody>
                      </table>
                  </div>
                  <div className='col-sm-4'><AssigneeContainer {...this.props} /></div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const projectId = parseInt(ownProps.params.projectId, 10) ||
        state.project.projects[0].id;
    return {
        ui: state.project.ui,
        users: state.user.users,
        tasks: _.find(state.tasks, tasks => tasks.projectId === projectId).tasks,
        project: _.find(state.project.projects, project =>
            project.id === projectId) || state.project.projects[0],
        surveySize: _.find(state.surveys, survey =>
            survey.projectId === projectId).questions.length,
        vocab: state.settings.language.vocabulary,
    };
};

const mapDispatchToProps = dispatch => ({
    calls: {
        closeTaskOptionsModal: () => dispatch(closeTaskOptionsModal()),
        updateTaskOptionsChoice: choice => dispatch(updateTaskOptionsChoice(choice)),
        updateTaskOptionsReassignUser: reassignUser =>
            dispatch(updateTaskOptionsReassignUser(reassignUser)),
        updateTaskOptionsNotify: notify => dispatch(updateTaskOptionsNotify(notify)),
        updateTaskOptionsMessage: message => dispatch(updateTaskOptionsMessage(message)),
        setTaskOptions: () => dispatch(setTaskOptions()),
    },
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    DragDropContext(HTML5Backend),
)(MatrixContainer);
