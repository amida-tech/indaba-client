import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';
import { setProjectStatus } from '../../../actions';
import Modal from '../../../../../common/Modal';
import ProjectTab from './ProjectTab';
import SurveyTab from './SurveyTab';

class StatusChange extends Component {
  render() {
    const body = (
      <Tabs justify='start'>
        <Tab
          title='Project'>
          <ProjectTab status={this.props.projectStatus}/>
        </Tab>
        <Tab
          title='Survey'>
          <SurveyTab status={this.props.surveyStatus}/>
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
  projectStatus: state.project.workflow.status,
  surveyStatus: state.project.survey.status
});
const mapDispatchToProps = dispatch => ({
  onSetProjectStatus: (status) => dispatch(setProjectStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatusChange);
