import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';
import { setProjectStatus } from '../../../actions';
import Modal from '../../../../../common/Modal';
import ProjectTab from './ProjectTab';

class StatusChange extends Component {
  render() {
    const body = (
      <Tabs justify='start'>
        <Tab
          title='Project'>
          <ProjectTab />
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

export default connect(mapStateToProps, mapDispatchToProps)(StatusChange);
