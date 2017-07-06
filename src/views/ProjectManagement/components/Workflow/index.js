import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterWrapper from './FilterWrapper';
import MatrixContainer from './MatrixContainer';
import * as TasksActions from '../../../../common/actions/tasksActions';

class WorkflowContainer extends Component {
    render() {
        return (
            <div className='worklow-container'>
                <FilterWrapper project={this.props.project}
                    onToggleFilter={this.props.onToggleFilter}
                    onAddStage={this.props.onAddStage}
                    onAddSubject={this.props.onAddSubject}
                    showAddStageModal={this.props.showAddStageModal}
                    closeAddStageModal={this.props.closeAddStageModal}
                    showAddSubjectModal={this.props.showAddSubjectModal}
                    closeAddSubjectModal={this.props.closeAddSubjectModal}
                    ui={this.props.ui} />
                <MatrixContainer {...this.props}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        assignTask: (user, task) => {
            dispatch(TasksActions.assignTask(user, task, ownProps.project.id));
        },
    };
}

export default connect(null, mapDispatchToProps)(WorkflowContainer);
