import React, { Component } from 'react';
import FilterWrapper from './FilterWrapper';
import MatrixContainer from './MatrixContainer';


class WorkflowContainer extends Component {
    render() {
        return (
            <div className='worklow-container'>
                <FilterWrapper project={this.props.project}
                    vocab={this.props.vocab}
                    onToggleFilter={this.props.projectActions.toggleFilter}
                    onAddStage={this.props.projectActions.addStage}
                    onAddSubject={this.props.projectActions.addSubject}
                    showAddStageModal={this.props.actions.showAddStageModal}
                    closeAddStageModal={this.props.actions.closeAddStageModal}
                    showAddSubjectModal={this.props.actions.showAddSubjectModal}
                    closeAddSubjectModal={this.props.actions.closeAddSubjectModal}
                    ui={this.props.ui} />
                <MatrixContainer {...this.props}/>
            </div>
        );
    }
}

export default WorkflowContainer;
