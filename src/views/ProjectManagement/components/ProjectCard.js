import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectCard extends Component {
  render() {
    return (
      <div className='col-md-4'>
        <div>Project<div>{this.props.name}</div></div>
        <div>Project Status<div>{this.props.status}</div></div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
    name: state.project.project.name,
    status: state.project.project.status
})

export default connect(mapStateToProps)(ProjectCard);
