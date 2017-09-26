import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import SurveyEditorStep from './SurveyEditorStep';
import AddSubjects from './AddSubjects';
import AddUsers from './AddUsers';
import AddStages from './AddStages';
import NewProjectTitle from './NewProjectTitle';
import WizardFooter from './WizardFooter';
import WizardComplete from './WizardComplete';
import * as actions from '../actions';
import * as projectActions from '../../../common/actions/projectActions';
import { addNewUser } from '../../../common/actions/userActions';

const NUM_WIZARD_STEPS = 4;

class CreateProjectWizard extends Component {
    componentWillMount() {
        if (this.props.ui.showComplete) {
            this.props.actions.projectWizardInitialize();
        }
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
    }
    handleContinue() {
        if (this.props.ui.step < NUM_WIZARD_STEPS - 1) {
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
        return (!this.props.ui.showComplete ?
            <div className='project-wizard'>
                {this.props.ui.showProjectTitle &&
                    <NewProjectTitle
                        title={this.props.project.name}
                        summary={this.props.project.summary}
                        updateTitle={this.props.actions.updateWizardProjectTitle}
                        updateSummary={this.props.actions.updateWizardProjectSummary}
                        profile={this.props.user.profile}
                        errorMessage={this.props.ui.errorMessage}
                        onSave={this.props.actions.postProject}
                        vocab={this.props.vocab} />
                }

                <Tabs className='project-wizard__tabs'
                    activeIndex={this.props.ui.step}
                    onActive={this.changeStep}>
                    <Tab className='project-wizard__tab project-wizard__tab--complete'
                        title={this.props.vocab.PROJECT.CREATE_SURVEY}>
                        <SurveyEditorStep />
                    </Tab>
                    <Tab className='project-wizard__tab project-wizard__tab--incomplete'
                        title={this.props.vocab.PROJECT.ADD_SUBJECTS}>
                        <AddSubjects
                            actions={this.props.actions}
                            project={this.props.project}
                            survey={this.props.survey}
                            vocab={this.props.vocab} />
                    </Tab>
                    <Tab className='project-wizard__tab project-wizard__tab--incomplete'
                        title={this.props.vocab.PROJECT.ADD_USERS}>
                        <AddUsers
                            actions={this.props.actions}
                            project={this.props.project}
                            survey={this.props.survey}
                            ui={this.props.ui.addUsers}
                            vocab={this.props.vocab}
                            user={this.props.user} />
                    </Tab>
                    <Tab className='project-wizard__tab project-wizard__tab--incomplete'
                        title={this.props.vocab.PROJECT.ADD_STAGES}>
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
                    projectLink={this.props.ui.projectLink} />
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

const mapStateToProps = state => ({
    project: state.wizard.ui.projectLink > 0 ?
            _.find(state.projects.data, project => project.id === state.wizard.ui.projectLink) :
            state.wizard.project,
    survey: state.wizard.survey,
    user: state.user,
    ui: state.wizard.ui,
    vocab: state.settings.language.vocabulary,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({},
        actions, projectActions, { addNewUser }), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectWizard);
