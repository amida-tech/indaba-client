import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubNav from './SubNav';
import Summary from './Summary';
import WorkflowContainer from './Workflow';

class ProjectManagementContainer extends Component {
    render() {
        return (
          <div>
            <SubNav />
            <hr className='divider' />
            <Summary {...this.props} />
            <div><WorkflowContainer {...this.props} /></div>
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
