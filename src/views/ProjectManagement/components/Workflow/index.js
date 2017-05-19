import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import MatrixContainer from './MatrixContainer';

class WorkflowContainer extends Component {
  render() {
    return (
      <div>
        <MatrixContainer />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state
    //vocabulary: state.getIn(['settings', 'language', 'vocabulary'])
  }
}

export default connect(mapStateToProps)(WorkflowContainer);
