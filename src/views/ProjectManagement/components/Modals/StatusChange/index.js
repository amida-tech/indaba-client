import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';
import { setProjectStatus, setSurveyStatus } from '../../../actions';
import Modal from '../../../../../common/Modal';
import ProjectTab from './ProjectTab';
import SurveyTab from './SurveyTab';

class StatusChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 0,
      survey: {
        published: this.props.surveyStatus === 'Published',
        accessConfirm: false,
        usersConfirm: false,
        editConfirm: false,
      },
      project: {
        active: this.props.projectStatus === 'Active',
        draftConfirm: false,
        accessConfirm: false,
        usersConfirm: false
      }
    };
  }
  projectConfirmed() {
    return
      this.state.project.draftConfirm &&
      this.state.project.accessConfirm &&
      this.state.project.usersConfirm;
  }
  projectCheck(name, checked) {
    let newState = Object.assign({}, this.state);
    newState.project[name] = checked;
    this.setState(newState);
  }
  surveyCheck(name, checked) {
    let newState = Object.assign({}, this.state);
    newState.survey[name] = checked;
    this.setState(newState);
  }
  surveyConfirmed() {
    return
      this.state.survey.accessConfirm &&
      this.state.survey.usersConfirm &&
      this.state.survey.editConfirm;
  }
  save() {
    if (this.state.tab === 0) {
      if (this.projectConfirmed()) {
        this.props.setProjectStatus(this.state.project.active ? 'Active' : 'Inactive');
      }
    } else {
      if (this.surveyConfirmed()) {
        this.props.setSurveyStatus(this.state.survey.published ? 'Published' : 'Draft')
      }
    }
  }
  render() {
    const body = (
      <Tabs justify='start' onActive={(tab) => this.setState(Object.assign({}, this.state, {tab}))}>
        <Tab
          title='Project'>
          <ProjectTab {...this.state.project} onCheck={ this.projectCheck.bind(this) }/>
        </Tab>
        <Tab
          title='Survey'>
          <SurveyTab {...this.state.survey} onCheck={ this.surveyCheck.bind(this) }/>
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
