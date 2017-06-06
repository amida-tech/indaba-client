import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import MatrixContainer from './MatrixContainer';
import * as ProjectActions from '../../actions';

class WorkflowContainer extends Component {
  render() {
    return (
      <MatrixContainer {...this.props}/>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return {
        assignTask: (assignment) => {
            dispatch(ProjectActions.assignTask(assignment));
        },
    };
}

function mapStateToProps(state, ownProps) {
    return {
        data: state,
        vocab: state.settings.language.vocabulary
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkflowContainer);
