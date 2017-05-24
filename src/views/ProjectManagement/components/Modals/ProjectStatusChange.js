import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProjectStatus } from '../../actions';
import { Tabs, Tab } from 'grommet';
import Modal from '../../../../common/Modal';

class ProjectStatusChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: this.props.status
    };
  }
  setStatus(active) {
    this.setState(Object.assign({}, this.state, {status: active ? 'Active' : 'Inactive'}));
  }
  render() {
    const body = (
      <Tabs justify='start'>
        <Tab
          title='Project'>
          <div className='project-status-value-bar'>
            <div className='project-status-field'>
              <span className='project-status-text'>{this.state.status}</span>
              <span className='project-status-label'>Project Status</span>
            </div>
            <input
              type='checkbox'
              checked={this.state.status === 'Active'}
              onChange={x => this.setStatus(x.target.checked)}/>
          </div>
          <hr className='divider'/>
          <div className='project-status-description'>
            <p>Deactivate the project when you need to make changes to the workflow.</p>
            <p>You can switch the survey to draft mode while the project is inactive.</p>
            <p>Reactivate the project once workflow changes have been made and you're
            ready to notify the user of the change.</p>
          </div>
          <hr className='divider'/>
          <div className='project-status-confirmation'>
            <p>Deactivate the project? Check boxes to confirm.</p>
            <label><input type='checkbox'/> Survey can be switched to draft mode while project is active.</label><br/>
            <label><input type='checkbox'/> All access to project will be restored.</label><br/>
            <label><input type='checkbox'/> All users will be notified of this action.</label>
          </div>
        </Tab>
        <Tab
          title='Survey'>
          <div className='project-status-value-bar'>
            <span className='project-status-text'>{this.props.status}</span>
          </div>
          <hr className='divider' />
        </Tab>
      </Tabs>
    );
    return (
      <Modal
        class='project-status-change-layer'
        title='Change Status'
        content={body}
        data={this.props.data}/>
    );
  }
}

const mapStateToProps = state => ({
  status: state.project.workflow.status
});
const mapDispatchToProps = dispatch => ({
  onSetProjectStatus: (status) => dispatch(setProjectStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectStatusChange);
