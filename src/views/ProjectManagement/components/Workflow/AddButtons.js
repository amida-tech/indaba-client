import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'grommet';
import { modalIDs } from '../Modals';
import { showModal } from '../../actions';

class AddButtons extends Component {
  render() {
    return (
      <div className='add-button-panel'>
        <Button primary={true} label='Add New Stage'/>
        <Button primary={true} label='Add Subject' onClick={this.props.onAddSubjectClick}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  onAddSubjectClick: () => dispatch(showModal(modalIDs.ADD_SUBJECT_MODAL))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddButtons);
