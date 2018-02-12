import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import { Tabs, Tab } from 'grommet';
import { bindActionCreators } from 'redux';
import { find, has, get } from 'lodash';

import Summary from '../../../common/components/Summary';
import ProjectTitleModal from '../../../common/components/TitleChange/ProjectTitleModal';
import SurveyTitleModal from '../../../common/components/TitleChange/SurveyTitleModal';
import AddSubjects from './AddSubjects';
import AddUsers from './AddUsers';
import AddStages from './AddStages';
import AddSurvey from './AddSurvey';
import NewProjectTitle from './NewProjectTitle';
import WizardFooter from './WizardFooter';
import WizardComplete from './WizardComplete';
import * as actions from '../actions';
import * as projectActions from '../../../common/actions/projectActions';
import * as surveyActions from '../../../common/actions/surveyActions';
import { surveyBuilderReset } from '../../SurveyBuilder/actions';
import { addNewUser } from '../../../common/actions/userActions';

const NUM_WIZARD_STEPS = 4;

class CreateProjectWizard extends Component {
    componentWillMount() {
        this.props.actions.surveyBuilderReset();
        this.props.actions.projectWizardInitialize();
    }
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.changeStep = this.changeStep.bind(this);
    }
    handleBack() {
        this.changeStep(this.props.ui.step - 1);
    }
    handleSkip() {
        this.handleContinue();
    }
    handleCancel() {
        this.props.onWizardCancel();
    }
    handleContinue() {
        if (this.props.ui.step < NUM_WIZARD_STEPS - 1) {
            if (this.props.ui.step === 0) {
                this.props.actions.patchSurvey(
                    this.props.inProgressSurvey,
                    this.props.vocab.SURVEY.SUCCESS,
                    this.props.vocab.ERROR,
                );
            }
            this.changeStep(this.props.ui.step + 1);
        } else {
            this.props.actions.showCompleteWizard(true);
        }
    }
    changeStep(step) {
        const newStep = Math.min(Math.max(step, 0), NUM_WIZARD_STEPS);
        this.props.actions.goToStep(newStep);
    }
    render() {
        const surveyComplete = has(this.props.survey, 'id') &&
            get(this.props.survey, 'sections', []).length > 0 &&
            this.props.survey.sections.some(section => section.questions.length > 0);
        const summary = (
            <Summary project={this.props.project}
                survey={this.props.survey}
                vocab={this.props.vocab}
                actions={this.props.actions}
                onProjectEditClick={this.props.actions.wizardShowProjectTitleModal}
                onSurveyEditClick={this.props.actions.wizardShowSurveyTitleModal} />
        );
        return (!this.props.ui.showComplete ?
            <div className='project-wizard'>
                {this.props.ui.showProjectTitle &&
                    <NewProjectTitle
                        profile={this.props.user.profile}
                        errorMessage={this.props.ui.errorMessage}
                        actions={this.props.actions}
                        onCancel={this.props.onWizardCancel}
                        vocab={this.props.vocab} />
                }
                {
                    this.props.ui.showProjectTitleModal &&
                    <ProjectTitleModal vocab={this.props.vocab}
                        actions={this.props.actions}
                        project={this.props.project}
                        onCloseModal={this.props.actions.wizardHideProjectTitleModal} />
                }
                {
                    this.props.ui.showSurveyTitleModal &&
                    <SurveyTitleModal vocab={this.props.vocab}
                        actions={this.props.actions}
                        survey={this.props.survey}
                        project={this.props.project}
                        onCloseModal={this.props.actions.wizardHideSurveyTitleModal} />
                }
                <Tabs className='project-wizard__tabs'
                    activeIndex={this.props.ui.step}
                    onActive={this.changeStep}
                    responsive={true} >
                    <Tab className={`project-wizard__tab project-wizard__tab--${surveyComplete ? 'complete' : 'incomplete'}`}
                        title={this.props.vocab.PROJECT.CREATE_SURVEY}>
                        {summary}
                        <AddSurvey
                            actions={this.props.actions}
                            project={this.props.project}
                            profile={this.props.user.profile}
                            vocab={this.props.vocab} />
                    </Tab>
                    <Tab className={`project-wizard__tab project-wizard__tab--${this.props.project.subjects.length > 0 ? 'complete' : 'incomplete'}`}
                        title={this.props.vocab.PROJECT.ADD_SUBJECTS}>
                        {summary}
                        <AddSubjects
                            actions={this.props.actions}
                            project={this.props.project}
                            survey={this.props.survey}
                            vocab={this.props.vocab}
                            ui={this.props.ui}/>
                    </Tab>
                    <Tab className={`project-wizard__tab project-wizard__tab--${this.props.project.users.length > 0 ? 'complete' : 'incomplete'}`}
                        title={this.props.vocab.PROJECT.ADD_USERS}>
                        {summary}
                        <AddUsers
                            actions={this.props.actions}
                            project={this.props.project}
                            survey={this.props.survey}
                            ui={this.props.ui.addUsers}
                            vocab={this.props.vocab}
                            user={this.props.user} />
                    </Tab>
                    <Tab className={`project-wizard__tab project-wizard__tab--${this.props.project.stages.length > 0 ? 'complete' : 'incomplete'}`}
                        title={this.props.vocab.PROJECT.ADD_STAGES}>
                        {summary}
                        <AddStages
                            actions={this.props.actions}
                            ui={this.props.ui}
                            project={this.props.project}
                            survey={this.props.survey}
                            vocab={this.props.vocab} />
                    </Tab>
                </Tabs>
                <WizardFooter
                    vocab={this.props.vocab}
                    finalStep={this.props.ui.step === NUM_WIZARD_STEPS - 1}
                    onBack={this.props.ui.step !== 0 ? this.handleBack : undefined}
                    onSkip={this.props.ui.step < (NUM_WIZARD_STEPS - 1) ?
                        this.handleSkip : undefined}
                    onCancel={this.handleCancel}
                    onContinue={ this.handleContinue } />
            </div> :
            <div className='project-wizard project-wizard--complete'>
                <WizardComplete
                    vocab={this.props.vocab}
                    projectLink={this.props.ui.projectLink}
                    project={this.props.project}
                    survey={this.props.survey}/>
            </div>);
    }
}

CreateProjectWizard.propTypes = {
    project: PropTypes.shape({
        subjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    ui: PropTypes.shape({
        errorMessage: PropTypes.string,
        showComplete: PropTypes.bool.isRequired,
        step: PropTypes.number.isRequired,
        projectLink: PropTypes.number.isRequired,
    }),
    vocab: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const project = state.wizard.ui.projectLink > 0 ?
            find(state.projects.data, item => item.id === state.wizard.ui.projectLink) :
            state.wizard.project;
    return {
        project,
        survey: find(state.surveys.data, survey => survey.id === project.surveyId) ||
            { id: -1, name: state.surveys.ui.newSurveyName, status: 'draft', sections: [] },
        inProgressSurvey: state.surveybuilder.form,
        user: state.user,
        ui: state.wizard.ui,
        vocab: state.settings.language.vocabulary,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({},
        actions, projectActions, surveyActions, { addNewUser, surveyBuilderReset }), dispatch),
    onWizardCancel: () => dispatch(goBack()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectWizard);
