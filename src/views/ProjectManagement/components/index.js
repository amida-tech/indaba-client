import React, { Component } from 'react';
import { connect } from 'react-redux';
import Summary from './Summary';
import Workflow from './Workflow';

class ProjectManagementContainer extends Component {
    render() {
        return (
          <div>
            <div className='container-fluid'><Summary {...this.props} /></div>
            <div><Workflow {...this.props} /></div>
          </div>
        )
    }
}

ProjectManagementContainer.displayName = 'Project Manager';

function mapStateToProps(state, ownProps) {
  return {
    data: state
    //vocabulary: state.getIn(['settings', 'language', 'vocabulary'])
  }
}

export default connect(mapStateToProps)(ProjectManagementContainer);
