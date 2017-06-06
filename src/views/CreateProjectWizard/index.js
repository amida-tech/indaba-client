import React, { Component } from 'react';
import { Tabs, Tab } from 'grommet';
import ModalContent from '../ProjectManagement/components/Modals';

class CreateProjectWizard extends Component {
    render() {
        return (
            <div>
                {this.props.location.state &&
                    this.props.location.state.showTitleModal &&
                    <ModalContent id='newprojecttitle' />}
                <Tabs>
                    <Tab title='Create Survey'>Create a survey!</Tab>
                    <Tab title='Add Subjects'>Add subjects!</Tab>
                    <Tab title='Add Users'>Add users!</Tab>
                    <Tab title='Add Stages'>Add stages!</Tab>
                </Tabs>
            </div>
        );
    }
}

export default CreateProjectWizard;
