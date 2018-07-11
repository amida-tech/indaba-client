import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { has, get } from 'lodash';

import Tabs from '../../../common/components/Tabs/Tabs';
import Tab from '../../../common/components/Tabs/Tab';
import Modal from '../../../common/components/Modal';

class WizardComplete extends Component {
    constructor(props) {
        super(props);
        this.handleComplete = this.handleComplete.bind(this);
    }

    handleComplete() {
        this.props.onWizardComplete(this.props.projectLink);
    }

    render() {
        const surveyComplete = has(this.props.survey, 'id') &&
            get(this.props.survey, 'sections', []).length > 0 &&
            this.props.survey.sections.some(section => section.questions.length > 0);
        return <Modal>
            <div className='wizard-complete'>
                <h1 className='wizard-complete__header'>
                    {this.props.vocab.PROJECT.PROJECT_CREATE_SUCCESS}
                </h1>
                <Tabs className='wizard-complete__tabs'>
                    <Tab className='wizard-complete__tab'
                        classModifier={surveyComplete ? 'complete' : 'incomplete'}
                        title={this.props.vocab.PROJECT.CREATE_SURVEY}>
                    </Tab>
                    <Tab className='wizard-complete__tab'
                        classModifier={this.props.project.subjects.length > 0 ? 'complete' : 'incomplete'}
                        title={this.props.vocab.PROJECT.ADD_SUBJECTS}>
                    </Tab>
                    <Tab className='wizard-complete__tab'
                        classModifier={this.props.project.users.length > 0 ? 'complete' : 'incomplete'}
                        title={this.props.vocab.PROJECT.ADD_USERS}>
                    </Tab>
                    <Tab className='wizard-complete__tab'
                        classModifier={this.props.project.stages.length > 0 ? 'complete' : 'incomplete'}
                        title={this.props.vocab.PROJECT.ADD_STAGES}>
                    </Tab>
                </Tabs>
                <p className='wizard-complete__explanation'>
                    {this.props.vocab.PROJECT.WIZARD_COMPLETE}
                </p>
                <button className='wizard-complete__button' onClick={this.handleComplete}>
                    <span>{this.props.vocab.PROJECT.GO_TO_PROJECT}</span>
                </button>
            </div>
        </Modal>;
    }
}

WizardComplete.propTypes = {
    project: PropTypes.shape({
        stages: PropTypes.arrayOf(PropTypes.object).isRequired,
        userGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    projectLink: PropTypes.number.isRequired,
    onWizardComplete: PropTypes.func.isRequired,
};

export default WizardComplete;
