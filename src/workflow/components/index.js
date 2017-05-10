import React, { Component } from 'react';
import { connect } from 'react-redux';

class WorkflowContainer extends Component {
    render() {
        return (
            <div>Hello World</div>
        );
    }
}

WorkflowContainer.displayName = 'Workflow';

const mapStateToProps = function(store) {
  return {
    data: store
    //vocab: state.getIn(['settings', 'language', 'vocabulary'])
  };
}

export default connect(mapStateToProps)(WorkflowContainer);//connect(mapStateToProps)(WorkflowContainer);
