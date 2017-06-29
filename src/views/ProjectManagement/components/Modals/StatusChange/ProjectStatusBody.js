import React, { Component } from 'react';
import ConfirmationCheckbox from './ConfirmationCheckbox';

class ProjectStatusBody extends Component {
    render() {
        const vocab = this.props.vocab;
        const projectVocab = this.props.vocab.MODAL.STATUS_CHANGE_MODAL.PROJECT_TAB;
        const confirmVocab = this.props.active ? projectVocab.ACTIVE : projectVocab.INACTIVE;
        return (
      <div>
        <div className='project-status-section project-status-value'>
          <input
            id='project-status-check'
            className='toggle-native-check'
            type='checkbox'
            checked={this.props.active}
            onChange={event => this.props.onCheck('active', event.target.checked)}/>
          <label htmlFor='project-status-check' className='toggle'></label>
          <div className='project-status-field'>
            <div className='project-status-text'>
              {this.props.active ?
                  vocab.PROJECT.STATUS_ACTIVE :
                  vocab.PROJECT.STATUS_INACTIVE}</div>
            <div className='project-status-label'>
              {projectVocab.VALUE_LABEL}
            </div>
          </div>
        </div>
        <hr className='divider'/>
        <div className='project-status-section'>
          <div className='project-status-description'>
            <p>{projectVocab.INSTRUCTION_DEACTIVATE}</p>
            <p>{projectVocab.INSTRUCTION_DRAFT_CONSTRAINT}</p>
            <p>{projectVocab.INSTRUCTION_REACTIVATE}</p>
          </div>
        </div>
        <hr className='divider'/>
        <div className='project-status-section'>
          <div className='project-status-confirmation'>
            <p>{confirmVocab.TITLE}</p>
            <ConfirmationCheckbox
              checked={this.props.draftConfirm}
              onCheck={this.props.onCheck}
              name='draftConfirm'
              label={confirmVocab.CHECKBOX_DRAFT} />
            <br/>
            <ConfirmationCheckbox
              checked={this.props.accessConfirm}
              onCheck={this.props.onCheck}
              name='accessConfirm'
              label={confirmVocab.CHECKBOX_ACCESS}/>
            <br/>
            <ConfirmationCheckbox
              checked={this.props.usersConfirm}
              onCheck={this.props.onCheck}
              name='usersConfirm'
              label={confirmVocab.CHECKBOX_USERS} />
          </div>
        </div>
      </div>
        );
    }
}

export default ProjectStatusBody;
