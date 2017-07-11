import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';

import {
    updateWizardProjectTitle,
    updateWizardProjectSummary,
    setWizardProjectTitle,
    addProjectFromWizard,
    goToStep,
    completeWizard,

} from '../actions';
import SurveyEditorStep from './SurveyEditorStep';
import AddSubjects from './AddSubjects';
import AddUsers from './AddUsers';
import AddStages from './AddStages';
import NewProjectTitle from './NewProjectTitle';
import WizardFooter from './WizardFooter';
import WizardComplete from './WizardComplete';
import { ProjectManagementContainer } from '../../ProjectManagement';

const NUM_WIZARD_STEPS = 4;

class CreateProjectWizard extends Component {
    constructor(props) {
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.goToStep = this.goToStep.bind(this);
    }
    handleBack() {
        this.goToStep(this.props.step - 1);
    }
    handleSkip() {
        this.handleContinue();
    }
    handleCancel() {
    }
    handleContinue() {
        if (this.props.step < NUM_WIZARD_STEPS - 1) {
            this.goToStep(this.props.step + 1);
        } else {
            this.props.onCompleteProject(this.props.wizard);
            this.props.onCompleteWizard();
        }
    }
    goToStep(step) {
        const newStep = Math.min(Math.max(step, 0), NUM_WIZARD_STEPS);
        this.props.onGoToStep(newStep);
    }
    render() {
        return !this.props.complete ? (
            <div className='project-wizard'>
                {this.props.wizard.ui.projectTitle.show &&
                    <NewProjectTitle
                        title={this.props.wizard.project.name}
                        summary={this.props.wizard.project.summary}
                        updateTitle={this.props.updateWizardProjectTitle}
                        updateSummary={this.props.updateWizardProjectSummary}
                        onSave={this.props.onSetTitle}
                        vocab={this.props.vocab} />
                }
                <Tabs className='project-wizard-tabs'
                    activeIndex={this.props.step}
                    onActive={this.goToStep}>
                    <Tab className='project-wizard-tabs--tab'
                        title={this.props.vocab.PROJECT.CREATE_SURVEY}>
                        <SurveyEditorStep />
                    </Tab>
                    <Tab className='project-wizard-tabs--tab'
                        title={this.props.vocab.PROJECT.ADD_SUBJECTS}>
                        <AddSubjects /></Tab>
                    <Tab className='project-wizard-tabs--tab'
                        title={this.props.vocab.PROJECT.ADD_USERS}>
                        <AddUsers />
                    </Tab>
                    <Tab className='project-wizard-tabs--tab'
                        title={this.props.vocab.PROJECT.ADD_STAGES}>
                        <AddStages />
                    </Tab>
                </Tabs>
                <WizardFooter
                    vocab={this.props.vocab}
                    finalStep={this.props.step === NUM_WIZARD_STEPS - 1}
                    onBack={this.props.step !== 0 ? this.handleBack : undefined}
                    onSkip={this.props.step < (NUM_WIZARD_STEPS - 1) ?
                        this.handleSkip : undefined}
                    onCancel={this.handleCancel}
                    onContinue={ this.handleContinue } />
            </div>) : (
            <div className='project-wizard--complete'>
                <WizardComplete vocab={this.props.vocab} />
                <ProjectManagementContainer params={{ projectId: '41' }}/>
            </div>);
    }
}

CreateProjectWizard.propTypes = {
    wizard: PropTypes.shape({
        project: PropTypes.object.isRequired,
        survey: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
    }).isRequired,
    vocab: PropTypes.object.isRequired,
    step: PropTypes.number.isRequired,
    complete: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    wizard: state.projectwizard,
    vocab: state.settings.language.vocabulary,
    step: state.projectwizard.ui.step,
    complete: state.projectwizard.ui.complete,
});
const mapDispatchToProps = dispatch => ({
    updateWizardProjectTitle: title => dispatch(updateWizardProjectTitle(title)),
    updateWizardProjectSummary: summary => dispatch(updateWizardProjectSummary(summary)),
    onSetTitle: () => dispatch(setWizardProjectTitle()),
    onCompleteProject: wizard => dispatch(addProjectFromWizard(wizard)),
    onGoToStep: step => dispatch(goToStep(step)),
    onCompleteWizard: () => dispatch(completeWizard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectWizard);
