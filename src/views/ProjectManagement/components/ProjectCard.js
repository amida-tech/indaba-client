import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectCard extends Component {
  render() {
    return (
      <div>
        <div>Project<div>{this.props.name}</div></div>
        <div>Project Status<div>{this.props.status}</div></div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    name: state.projectmanagement.project.name,
    status: state.projectmanagement.project.status
})

export default connect(mapStateToProps)(ProjectCard);
