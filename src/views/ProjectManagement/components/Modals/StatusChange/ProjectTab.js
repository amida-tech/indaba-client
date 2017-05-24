import React, { Component } from 'react';

class ProjectTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: this.props.status === 'Active',
      draftConfirm: false,
      accessConfirm: false,
      usersConfirm: false
    };
  }
  setCheck(name, checked) {
    var newState = Object.assign({}, this.state);
    newState[name] = checked;
    this.setState(newState);
  }
  render() {
    return (
      <div>
        <div className='project-status-section project-status-value'>
          <input
            type='checkbox'
            checked={this.state.active}
            onChange={event => this.setCheck('active', event.target.checked)}/>
          <div className='project-status-field'>
            <div className='project-status-text'>{this.state.active ? 'Active' : 'Inactive'}</div>
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
            <p>Deactivate the project? Check boxes to confirm.</p>
            <label>
              <input type='checkbox'
                checked={this.state.draftConfirm}
                onChange={event => this.setCheck('draftConfirm', event.target.checked)}/>
              Survey can be switched to draft mode while project is active.
            </label><br/>
            <label>
              <input type='checkbox'
                checked={this.state.accessConfirm}
                onChange={event => this.setCheck('accessConfirm', event.target.checked)}/>
              All access to project will be restored.
            </label><br/>
            <label>
              <input type='checkbox'
                checked={this.state.usersConfirm}
                onChange={event => this.setCheck('usersConfirm', event.target.checked)}/>
              All users will be notified of this action.
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectTab;
