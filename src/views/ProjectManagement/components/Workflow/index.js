import React, { Component } from 'react';
import { connect } from 'react-redux';
import FilterWrapper from './FilterWrapper';
import MatrixContainer from './MatrixContainer';
import * as TasksActions from '../../../../common/actions/tasksActions';

class WorkflowContainer extends Component {
    render() {
        return (
            <div className='worklow-container'>
                <FilterWrapper project={this.props.project} />
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

function mapStateToProps(state, ownProps) {
    return {
        data: state,
        vocab: state.settings.language.vocabulary,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer);
