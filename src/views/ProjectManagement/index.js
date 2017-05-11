import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectManagementContainer extends Component {
    render() {
        return <div>I am in your project. Managing your micros.</div>
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    //vocabulary: state.getIn(['settings', 'language', 'vocabulary'])
  };
}

export default connect(mapStateToProps)(ProjectManagementContainer);
