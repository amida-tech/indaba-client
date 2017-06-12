import React, { Component } from 'react';
import { Tabs, Tab, Button } from 'grommet';
import Modal from '../../../common/Modal';

class WizardComplete extends Component {
    render() {
        return <Modal>
            <div className='wizard-complete'>
                <h1 className='wizard-complete__header'>
                    {this.props.vocab.PROJECT.PROJECT_CREATE_SUCCESS}
                </h1>
                <Tabs className='project-wizard-tabs'>
                    <Tab className='project-wizard-tabs--tab'
                        title={this.props.vocab.PROJECT.CREATE_SURVEY}>
                    </Tab>
                    <Tab className='project-wizard-tabs--tab'
                        title={this.props.vocab.PROJECT.ADD_SUBJECTS}>
                    </Tab>
                    <Tab className='project-wizard-tabs--tab'
                        title={this.props.vocab.PROJECT.ADD_USERS}>
                    </Tab>
                    <Tab className='project-wizard-tabs--tab'
                        title={this.props.vocab.PROJECT.ADD_STAGES}>
                    </Tab>
                </Tabs>
                <p className='wizard-complete__explanation'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Ut pretium pretium tempor. Ut eget imperdiet neque.
                    In volutpat ante semper diam molestie, et aliquam erat laoreet.
                    Sed sit amet arcu aliquet, molestie justo at, auctor nunc.
                    Phasellus ligula
                </p>
                <Button className='wizard-complete__button'
                    primary
                    label={this.props.vocab.PROJECT.GO_TO_PROJECT}
                    path='/project'/>
            </div>
        </Modal>;
    }
}

export default WizardComplete;
