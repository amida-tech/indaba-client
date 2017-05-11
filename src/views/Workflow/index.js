import React, { Component } from 'react';
import { connect } from 'react-redux';

class WorkflowContainer extends Component {
    render() {
        return <div>Hello World</div>
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //vocabulary: state.getIn(['settings', 'language', 'vocabulary'])
  };
}

export default connect(mapStateToProps)(WorkflowContainer);
