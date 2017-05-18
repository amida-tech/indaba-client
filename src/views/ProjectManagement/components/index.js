import React, { Component } from 'react';
import { connect } from 'react-redux';
import Summary from './Summary';
import WorflowContainer from './Workflow';

class ProjectManagementContainer extends Component {
//<div><Summary {...this.props} /></div>
    render() {
        return (
          <div>
            <WorflowContainer />
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
