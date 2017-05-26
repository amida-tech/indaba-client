import React, { Component } from 'react';
import ConfirmationCheckbox from './ConfirmationCheckbox';

class SurveyTab extends Component {
  render() {
    return (
      <div>
        <div className='project-status-section project-status-value'>
          <input
            id='survey-status-check'
            type='checkbox'
            className='toggle-native-check'
            checked={this.props.published}
            onChange={event => this.props.onCheck('published', event.target.checked)}/>
          <label htmlFor='survey-status-check' className='toggle'></label>
          <div className='project-status-field'>
            <div className='project-status-text'>{this.props.published ? 'Published' : 'Draft Mode'}</div>
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
            <p>{this.props.published ? 'Unpublish' : 'Publish'} the survey? Check boxes to confirm.</p>
            <ConfirmationCheckbox
              checked={this.props.accessConfirm}
              onCheck={this.props.onCheck}
              name='accessConfirm'
              label= 'All assignee access to survey will be suspended until republished.'
              />
            <br/>
            <ConfirmationCheckbox
              checked={this.props.usersConfirm}
              onCheck={this.props.onCheck}
              name='usersConfirm'
              label='All Users assigned to survey will be notified of this action.'/>
            <br/>
            <ConfirmationCheckbox
              checked={this.props.editConfirm}
              onCheck={this.props.onCheck}
              name='editConfirm'
              label= 'Only you and specified users can edit survey in draft mode.' />
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyTab;
