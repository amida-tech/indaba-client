import React, { Component } from 'react';
import { connect } from 'react-redux';

class SurveyCard extends Component {
  render() {
    return (
      <div>
        <div>Survey<div>{this.props.name}</div></div>
        <div>Survey Status<div>{this.props.status}</div></div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    name: state.projectmanagement.survey.name,
    status: state.projectmanagement.survey.status
})

export default connect(mapStateToProps)(SurveyCard);
