import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import Subjects from './Subjects';
import StatusChange from './Modals/StatusChange';
import { updateStatusChange, setProjectStatus, deleteSubject, addSubject } from '../actions';
import { setSurveyStatus } from '../../../common/actions/surveysActions';

class ProjectManagementContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const modalEntities = {
            projectstatusmodal: 'project',
            surveystatusmodal: 'survey',
        };
        let body;
        switch (this.props.tab) {
            case 'workflow':
                body = <WorkflowContainer {...this.props} />;
                break;
            case 'subject':
                body = <Subjects vocab={this.props.vocab}
                    subjects={this.props.project.subjects}
                    onDeleteSubject={this.props.onDeleteSubject}
                    onAddSubject={this.props.onAddSubject}/>;
                break;
            default:
                body = null;
        }
        return (
                <div>
                    { this.props.ui.statusModalId &&
                        <StatusChange vocab={this.props.vocab}
                            project={this.props.project}
                            onStatusChangeClose={() => this.props.updateStatusChange(false)}
                            entity={modalEntities[this.props.ui.statusModalId]}
                            projectStatus={this.props.project.status}
                            surveyStatus={this.props.survey.status}
                            onSetProjectStatus={this.props.onSetProjectStatus}
                            onSetSurveyStatus={this.props.onSetSurveyStatus}/> }
                    <SubNav />
                    <hr className='divider' />
                    <Summary
                        project={this.props.project}
                        survey={this.props.survey}
                        onStatusChangeClick={id => this.props.updateStatusChange(id)}
                        vocab={this.props.vocab} />
                    <hr className='divider' />
                    {body}
                </div>
        );
    }
}

ProjectManagementContainer.displayName = 'Project Manager';

ProjectManagementContainer.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    tab: PropTypes.string.isRequired,

    onSetProjectStatus: PropTypes.func.isRequired,
    onSetSurveyStatus: PropTypes.func.isRequired,
    onDeleteSubject: PropTypes.func.isRequired,
    onAddSubject: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const project = ownProps.params.projectId != undefined ?
        _.find(state.project.projects, (project) => project.id === ownProps.params.projectId) :
        state.project.projects[0];
    return {
        project: project,
        vocab: state.settings.language.vocabulary,
        ui: state.project.ui,
        survey: _.find(state.surveys, (survey) => survey.projectId === project.id),
        tab: state.project.ui.subnav,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateStatusChange: status => dispatch(updateStatusChange(status)),
        onSetProjectStatus: (status, projectId) => dispatch(setProjectStatus(status, projectId)),
        onSetSurveyStatus: (status, projectId) => dispatch(setSurveyStatus(status, projectId)),
        onDeleteSubject: (subject, projectId) => dispatch(deleteSubject(subject, projectId)),
        onAddSubject: (subject, projectId) => dispatch(addSubject(subject, projectId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
