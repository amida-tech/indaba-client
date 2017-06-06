import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'grommet';
import _ from 'lodash';
import ModalContent from '../../ProjectManagement/components/Modals';
import { setProjectTitle } from '../actions';

class CreateProjectWizard extends Component {
    render() {
        return (
            <div>
                {!_.get(this.props.wizard, 'title') &&
                    <ModalContent id='newprojecttitle' onSave={this.props.onSetTitle}/>}
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

const mapStateToProps = state => ({
    wizard: state.projectwizard,
});
const mapDispatchToProps = dispatch => ({
    onSetTitle: title => dispatch(setProjectTitle(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProjectWizard);
