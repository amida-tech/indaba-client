import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';
import _ from 'lodash';
import update from 'immutability-helper';
import {
    setWizardProjectTitle,
    addProjectFromWizard,
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
        this.state = {
            step: 0,
            complete: false,
        };
        this.handleBack = this.handleBack.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleContinue = this.handleContinue.bind(this);
        this.goToStep = this.goToStep.bind(this);
    }
    handleBack() {
        this.goToStep(this.state.step - 1);
    }
    handleSkip() {
        this.handleContinue();
    }
    handleCancel() {
    }
    handleContinue() {
        if (this.state.step < NUM_WIZARD_STEPS - 1) {
            this.goToStep(this.state.step + 1);
        } else {
            this.props.onCompleteProject(this.props.wizard);
            this.setState({ complete: true });
        }
    }
    goToStep(step) {
        const newStep = Math.min(Math.max(step, 0), NUM_WIZARD_STEPS);
        this.setState(update(this.state, { step: { $set: newStep } }));
    }
    render() {
        return !this.state.complete ? (
            <div className='project-wizard'>
                {!_.get(this.props.wizard, 'workflow.name') &&
                    <NewProjectTitle onSave={this.props.onSetTitle} />}
                <Tabs className='project-wizard-tabs'
                    activeIndex={this.state.step}
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
                    finalStep={this.state.step === NUM_WIZARD_STEPS - 1}
                    onBack={this.state.step !== 0 ? this.handleBack : undefined}
                    onSkip={this.state.step < (NUM_WIZARD_STEPS - 1) ?
                        this.handleSkip : undefined}
                    onCancel={this.handleCancel}
                    onContinue={ this.handleContinue } />
            </div>) : (
            <div className='project-wizard--complete'>
                <WizardComplete vocab={this.props.vocab} />
                <ProjectManagementContainer />
            </div>);
    }
}

const mapStateToProps = state => ({
    wizard: state.projectwizard,
    vocab: state.settings.language.vocabulary,
});
const mapDispatchToProps = dispatch => ({
    onSetTitle: title => dispatch(setWizardProjectTitle(title)),
    onCompleteProject: project => dispatch(addProjectFromWizard(project)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectWizard);
