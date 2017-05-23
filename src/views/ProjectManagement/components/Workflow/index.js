import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import MatrixContainer from './MatrixContainer';
import Sidebar from './Sidebar';

class WorkflowContainer extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-4"><MatrixContainer {...this.props}/></div>
        <div className="col-md-3"><Sidebar {...this.props} /></div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state.settings.language.vocabulary);
  return {
    data: state,
    vocab: state.settings.language.vocabulary
  }
}

export default connect(mapStateToProps)(WorkflowContainer);
