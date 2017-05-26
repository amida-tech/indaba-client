import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubNav from './SubNav';
import Summary from './Summary';
import WorkflowContainer from './Workflow';
import Modal from '../../../common/Modal';
import ModalContent from './Modals';
import FilterWrapper from './Workflow/FilterWrapper.js';
import { addSubject, closeModal } from '../actions';

class ProjectManagementContainer extends Component {
  render() {
    const modal = this.props.modal ?
      <Modal
        onClose={this.props.onCancel}
        content={
          <ModalContent
            id={this.props.modal} {...this.props} /> }/> :
      null;
    return (
      <div>
        {modal}
        <SubNav />
        <hr className='divider' />
        <Summary {...this.props} />
        <hr className='divider' />
        <FilterWrapper />
        <div><WorkflowContainer {...this.props} /></div>
      </div>
    )
  }
}

ProjectManagementContainer.displayName = 'Project Manager';

const mapStateToProps = (state, ownProps) => ({
  data: state,
  vocab: state.settings.language.vocabulary,
  modal: state.project.navigation.modal
});
const mapDispatchToProps = (dispatch) => ({
  onAddSubject: (subject) => {
    dispatch(addSubject(subject));
  },
  onCancel: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
