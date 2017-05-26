import React, { Component } from 'react';

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
            <label>
              <input type='checkbox'
                checked={this.props.draftConfirm}
                onChange={
                  event => { this.props.onCheck('draftConfirm', event.target.checked) }
                }/>
              Survey can be switched to draft mode while project is inactive.
            </label><br/>
            <label>
              <input type='checkbox'
                checked={this.props.accessConfirm}
                onChange={event => this.props.onCheck('accessConfirm', event.target.checked)}/>
              {this.props.active ?
                'All access to project will be restored.' :
                'All access to project will be suspended until activated.'
              }
            </label><br/>
            <label>
              <input type='checkbox'
                checked={this.props.usersConfirm}
                onChange={event => this.props.onCheck('usersConfirm', event.target.checked)}/>
              All users will be notified of this action.
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectTab;
