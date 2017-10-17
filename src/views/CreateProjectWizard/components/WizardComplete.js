import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab, Button } from 'grommet';
import Modal from '../../../common/components/Modal';

class WizardComplete extends Component {
    render() {
        return <Modal>
            <div className='wizard-complete'>
                <h1 className='wizard-complete__header'>
                    {this.props.vocab.PROJECT.PROJECT_CREATE_SUCCESS}
                </h1>
                <Tabs className='wizard-complete__tabs'>
                    <Tab className='wizard-complete__tab wizard-complete__tab--incomplete'
                        title={this.props.vocab.PROJECT.CREATE_SURVEY}>
                    </Tab>
                    <Tab className={`wizard-complete__tab wizard-complete__tab--${this.props.project.subjects.length > 0 ? 'complete' : 'incomplete'}`}
                        title={this.props.vocab.PROJECT.ADD_SUBJECTS}>
                    </Tab>
                    <Tab className={`wizard-complete__tab wizard-complete__tab--${this.props.project.users.length > 0 ? 'complete' : 'incomplete'}`}
                        title={this.props.vocab.PROJECT.ADD_USERS}>
                    </Tab>
                    <Tab className={`wizard-complete__tab wizard-complete__tab--${this.props.project.stages.length > 0 ? 'complete' : 'incomplete'}`}
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
