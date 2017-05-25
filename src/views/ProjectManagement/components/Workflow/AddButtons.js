import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'grommet';
import { modalIDs } from '../Modals';
import { showModal } from '../../actions';

class AddButtons extends Component {
  render() {
    return (
      <div className='add-button-panel'>
        <Button primary={true} label={this.props.vocab.PROJECT.ADD_NEW_STAGE}/>
        <Button primary={true} label={this.props.vocab.PROJECT.ADD_SUBJECT}
          onClick={this.props.onAddSubjectClick}/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
    vocab: state.settings.language.vocabulary
});

const mapDispatchToProps = dispatch => ({
  onAddSubjectClick: () => dispatch(showModal(modalIDs.ADD_SUBJECT_MODAL))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddButtons);
