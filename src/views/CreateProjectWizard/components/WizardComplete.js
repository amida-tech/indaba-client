import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'grommet';
import { has, get } from 'lodash';

import Tabs from '../../../common/components/Tabs/Tabs';
import Tab from '../../../common/components/Tabs/Tab';
import Modal from '../../../common/components/Modal';

class WizardComplete extends Component {
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
                <Button className='wizard-complete__button'
                    primary
                    label={this.props.vocab.PROJECT.GO_TO_PROJECT}
                    path={`/project/${this.props.projectLink}`}/>
            </div>
        </Modal>;
    }
}

WizardComplete.propTypes = {
    projectLink: PropTypes.number.isRequired,
};

export default WizardComplete;
