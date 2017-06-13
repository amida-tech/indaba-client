import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubNav from './SubNav';
import Summary from '../../../common/components/Summary';
import WorkflowContainer from './Workflow';
import FilterWrapper from './Workflow/FilterWrapper';
import StatusChange from './Modals/StatusChange';
import { setProjectStatus, setSurveyStatus } from '../actions';

class ProjectManagementContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { statusModalId: false,
        };
    }
    render() {
        const modalEntities = {
            projectstatusmodal: 'project',
            surveystatusmodal: 'survey',
        };
        return (
                <div>
                    { this.state.statusModalId &&
                        <StatusChange vocab={this.props.vocab}
                            onStatusChangeClose={() => this.setState({ statusModalId: false })}
                            entity={modalEntities[this.state.statusModalId]}
                            projectStatus={this.props.project.workflow.status}
                            surveyStatus={this.props.project.survey.status}
                            onSetProjectStatus={this.props.onSetProjectStatus}
                            onSetSurveyStatus={this.props.onSetSurveyStatus}/> }
                    <SubNav />
                    <hr className='divider' />
                    <Summary
                        workflow={this.props.project.workflow}
                        survey={this.props.project.survey}
                        onStatusChangeClick={id => this.setState({ statusModalId: id })}
                        vocab={this.props.vocab} />
                    <hr className='divider' />
                    <FilterWrapper project={this.props.project}/>
                    <div><WorkflowContainer {...this.props} /></div>
                </div>
        );
    }
}

ProjectManagementContainer.displayName = 'Project Manager';

const mapStateToProps = (state, ownProps) => ({
    vocab: state.settings.language.vocabulary,
    modal: state.project.navigation.modal,
    project: state.project.projects.find(p => `${p.id}` === ownProps.params.id) ||
        state.project.projects[0],
});

const mapDispatchToProps = (dispatch, ownProps) => {
    const id = parseInt(ownProps.params.id, 10);
    return {
        onSetProjectStatus: status => dispatch(setProjectStatus(status, id)),
        onSetSurveyStatus: status => dispatch(setSurveyStatus(status, id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectManagementContainer);
