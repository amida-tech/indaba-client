import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';
import { bindActionCreators } from 'redux';

import * as actions from '../actions';
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
        this.changeStep = this.changeStep.bind(this);
    }
    handleBack() {
        this.changeStep(this.props.wizard.ui.step - 1);
    }
    handleSkip() {
        this.handleContinue();
    }
    handleCancel() {
    }
    handleContinue() {
        if (this.props.wizard.ui.step < NUM_WIZARD_STEPS - 1) {
            this.changeStep(this.props.wizard.ui.step + 1);
        } else {
            this.props.actions.addProjectFromWizard(this.props.wizard);
            this.props.actions.completeWizard();
        }
    }
    changeStep(step) {
        const newStep = Math.min(Math.max(step, 0), NUM_WIZARD_STEPS);
        this.props.actions.goToStep(newStep);
    }
    render() {
        return (!this.props.wizard.ui.complete ?
            <div className='project-wizard'>
                {this.props.wizard.ui.projectTitle.show &&
                    <NewProjectTitle
                        title={this.props.wizard.project.name}
                        summary={this.props.wizard.project.summary}
                        updateTitle={this.props.actions.updateWizardProjectTitle}
                        updateSummary={this.props.actions.updateWizardProjectSummary}
                        profile={this.props.profile}
                        errorMessage={this.props.wizard.ui.errorMessage}
                        onSave={this.props.actions.createProjectPart}
                        vocab={this.props.vocab} />
                }
                <Tabs className='project-wizard__tabs'
                    activeIndex={this.props.wizard.ui.step}
                    onActive={this.changeStep}>
                    <Tab className='project-wizard__tab'
                        title={this.props.vocab.PROJECT.CREATE_SURVEY}>
                        <SurveyEditorStep />
                    </Tab>
                    <Tab className='project-wizard__tab'
                        title={this.props.vocab.PROJECT.ADD_SUBJECTS}>
                        <AddSubjects
                            actions={this.props.actions}
                            wizard={this.props.wizard}
                            vocab={this.props.vocab} />
                    </Tab>
                    <Tab className='project-wizard__tab'
                        title={this.props.vocab.PROJECT.ADD_USERS}>
                        <AddUsers />
                    </Tab>
                    <Tab className='project-wizard__tab'
                        title={this.props.vocab.PROJECT.ADD_STAGES}>
                        <AddStages
                            actions={this.props.actions}
                            wizard={this.props.wizard}
                            vocab={this.props.vocab} />
                    </Tab>
                </Tabs>
                <WizardFooter
                    vocab={this.props.vocab}
                    finalStep={this.props.wizard.ui.step === NUM_WIZARD_STEPS - 1}
                    onBack={this.props.wizard.ui.step !== 0 ? this.handleBack : undefined}
                    onSkip={this.props.wizard.ui.step < (NUM_WIZARD_STEPS - 1) ?
                        this.handleSkip : undefined}
                    onCancel={this.handleCancel}
                    onContinue={ this.handleContinue } />
            </div> :
            <div className='project-wizard project-wizard--complete'>
                <WizardComplete vocab={this.props.vocab} />
                <ProjectManagementContainer params={{ projectId: '41' }}/>
            </div>);
    }
}

CreateProjectWizard.propTypes = {
    wizard: PropTypes.shape({
        project: PropTypes.shape({
            subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
        }).isRequired,
        survey: PropTypes.object.isRequired,
        task: PropTypes.object.isRequired,
        ui: PropTypes.shape({
            errorMessage: PropTypes.string,
            complete: PropTypes.bool.isRequired,
            step: PropTypes.number.isRequired,
        }),
    }).isRequired,
    vocab: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.user.profile,
    wizard: state.projectwizard,
    vocab: state.settings.language.vocabulary,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions), dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectWizard);
