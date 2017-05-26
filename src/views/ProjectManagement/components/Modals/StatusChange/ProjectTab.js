import React, { Component } from 'react';
import ConfirmationCheckbox from './ConfirmationCheckbox';

class ProjectTab extends Component {
  render() {
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
            <div className='project-status-text'>{this.props.active ? 'Active' : 'Inactive'}</div>
            <div className='project-status-label'>Project Status</div>
          </div>
        </div>
        <hr className='divider'/>
        <div className='project-status-section'>
          <div className='project-status-description'>
            <p>Deactivate the project when you need to make changes to the workflow.</p>
            <p>You can switch the survey to draft mode while the project is inactive.</p>
            <p>Reactivate the project once workflow changes have been made and you're
              ready to notify the user of the change.</p>
          </div>
        </div>
        <hr className='divider'/>
        <div className='project-status-section'>
          <div className='project-status-confirmation'>
            <p>{this.props.active ? 'Activate' : 'Dectivate'} the project? Check boxes to confirm.</p>
            <ConfirmationCheckbox
              checked={this.props.draftConfirm}
              onCheck={this.props.onCheck}
              name='draftConfirm'
              label='Survey can be switched to draft mode while project is inactive.' />
            <br/>
            <ConfirmationCheckbox
              checked={this.props.accessConfirm}
              onCheck={this.props.onCheck}
              name='accessConfirm'
              label={this.props.active ?
                'All access to project will be restored.' :
                'All access to project will be suspended until activated.'}/>
            <br/>
            <ConfirmationCheckbox
              checked={this.props.usersConfirm}
              onCheck={this.props.onCheck}
              name='usersConfirm'
              label='All users will be notified of this action.' />
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectTab;
