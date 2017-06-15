import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import Subjects from './Subjects';
import Users from './Users';
import StatusChange from './Modals/StatusChange';
import {
    updateStatusChange,
    setProjectStatus,
    deleteSubject,
    addSubject,
} from '../actions';
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
        case 'users':
            body = <Users />;
            break;
        default:
            body = null;
            break;
        }
        return (
                <div>
                    { this.props.ui.statusModalId &&
                        <StatusChange vocab={this.props.vocab}
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
    const id = ownProps.id !== undefined ? ownProps.id : ownProps.params.id;
    const project = state.project.projects.find(project =>
            `${project.id}` === id) || state.project.projects[0];
    return {
        vocab: state.settings.language.vocabulary,
        project,
        ui: state.project.ui,
        survey: _.find(state.surveys, survey => survey.projectId === project.id),
        tab: state.project.ui.subnav,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = parseInt(ownProps.id !== undefined ? ownProps.id : ownProps.params.id, 10) || 0;
    return {
        updateStatusChange: status => dispatch(updateStatusChange(status)),
        onSetProjectStatus: status => dispatch(setProjectStatus(status, id)),
        onSetSurveyStatus: status => dispatch(setSurveyStatus(status, id)),
        onDeleteSubject: subject => dispatch(deleteSubject(subject, id)),
        onAddSubject: subject => dispatch(addSubject(subject, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
