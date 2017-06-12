import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';
import _ from 'lodash';
import update from 'immutability-helper';
import ModalContent from '../../ProjectManagement/components/Modals';
import { setProjectTitle } from '../actions';
import SurveyEditorStep from './SurveyEditorStep';
import AddSubjects from './AddSubjects';
import AddUsers from './AddUsers';
import WizardFooter from './WizardFooter';

const NUM_WIZARD_STEPS = 4;

class CreateProjectWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
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
        this.goToStep(this.state.step + 1);
    }
    goToStep(step) {
        const newStep = Math.min(Math.max(step, 0), NUM_WIZARD_STEPS);
        this.setState(update(this.state, { step: { $set: newStep } }));
    }
    render() {
        return (
            <div>
                {!_.get(this.props.wizard, 'project.name') &&
                    <ModalContent id='newprojecttitle' onSave={this.props.onSetTitle}/>}
                <Tabs activeIndex={this.state.step} onActive={this.goToStep}>
                    <Tab title='Create Survey'>
                        <SurveyEditorStep />
                    </Tab>
                    <Tab title='Add Subjects'><AddSubjects /></Tab>
                    <Tab title='Add Users'><AddUsers /></Tab>
                    <Tab title='Add Stages'>Add stages!</Tab>
                </Tabs>
                <WizardFooter
                    onBack={this.state.step !== 0 ? this.handleBack : undefined}
                    onSkip={this.state.step < (NUM_WIZARD_STEPS - 1) ?
                        this.handleSkip : undefined}
                    onCancel={this.handleCancel}
                    onContinue={this.state.step < (NUM_WIZARD_STEPS - 1) ?
                        this.handleContinue : undefined} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    wizard: state.projectwizard,
});
const mapDispatchToProps = dispatch => ({
    onSetTitle: title => dispatch(setProjectTitle(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectWizard);
