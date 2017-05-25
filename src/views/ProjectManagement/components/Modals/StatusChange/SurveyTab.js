import React, { Component } from 'react';

class SurveyTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      published: this.props.status === 'Published',
      accessConfirm: false,
      usersConfirm: false,
      editConfirm: false
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
            checked={this.state.published}
            onChange={event => this.setCheck('published', event.target.checked)}/>
          <div className='project-status-field'>
            <div className='project-status-text'>{this.state.published ? 'Published' : 'Draft Mode'}</div>
            <div className='project-status-label'>Survey Status</div>
          </div>
        </div>
        <hr className='divider'/>
        <div className='project-status-section'>
          <div className='project-status-description'>
            <p>Publish the survey when you're ready for assignees to access it.</p>
            <p>Once published, you must deactivate the project to edit the survey.</p>
            <p>This action does not change the project status.</p>
          </div>
        </div>
        <hr className='divider'/>
        <div className='project-status-section'>
          <div className='project-status-confirmation'>
            <p>{this.state.published ? 'Unpublish' : 'Publish'} the survey? Check boxes to confirm.</p>
            <label>
              <input type='checkbox'
                checked={this.state.accessConfirm}
                onChange={event => this.setCheck('accessConfirm', event.target.checked)}/>
              All assignee access to survey will be suspended until republished.
            </label><br/>
            <label>
              <input type='checkbox'
                checked={this.state.usersConfirm}
                onChange={event => this.setCheck('usersConfirm', event.target.checked)}/>
              All Users assigned to survey will be notified of this action.
            </label><br/>
            <label>
              <input type='checkbox'
                checked={this.state.editConfirm}
                onChange={event => this.setCheck('editConfirm', event.target.checked)}/>
              Only you and specified users can edit survey in draft mode.
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyTab;
