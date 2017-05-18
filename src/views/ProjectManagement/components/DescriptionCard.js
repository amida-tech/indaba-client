import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editSummaryDescription } from '../actions';

class DescriptionCard extends Component {
  render() {
    return (
      <div className='col-md-4'>
        <div>Description<div>{this.props.description}</div></div>
        <div><a onClick={() => this.props.onEditDetails(this.props.id)}>Edit Details</a></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  description: state.project.project.description,
  id: state.project.project.id
})
const mapDispatchToProps = (dispatch) => ({
  onEditDetails: editSummaryDescription()(dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionCard);
