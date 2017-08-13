import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

import Summary from '../../../common/components/Summary';
import AddStageModal from '../../ProjectManagement/components/Modals/AddStage';
import StageSummary from '../../ProjectManagement/components/Workflow/StageSummary';

class AddStages extends Component {
    render() {
        return (<div className='add-stages-step'>
            {this.props.ui.showAddStage && <AddStageModal
                vocab={this.props.vocab}
                userGroups={this.props.project.userGroups}
                onCancel={() => this.props.actions.closeAddStageWizardModal()}
                onAddStage={(stage) => {
                    this.props.actions.closeAddStageWizardModal();
                    this.props.actions.onAddStage(stage);
                }}/>}
            <Summary
                project={this.props.project}
                survey={this.props.survey}
                vocab={this.props.vocab} />
            <hr className='divider'/>
            <Box direction='row' justify='end'
                pad={{ vertical: 'small', horizontal: 'medium' }}>
                <Button label={this.props.vocab.PROJECT.IMPORT_STAGE} />
            </Box>
            <hr className='divider' />
            <p className='wizard-clarification'>
                {this.props.vocab.PROJECT.ADD_STAGES_CLARIFICATION}
            </p>
            <hr className='divider' />
            <Box direction='row'>
                {this.props.project.stages.map((stage) => {
                    return <StageSummary stage={stage} vocab={this.props.vocab}
                        userGroups={this.props.project.userGroups}
                        key={stage.id}/>;
                })}
                <div className='add-stage-placeholder'
                    onClick={() => this.props.actions.showAddStageWizardModal()}>
                    <div className='workflow-stage-title'>
                        {this.props.vocab.PROJECT.STAGE_TITLE}
                    </div>
                    <div className='workflow-stage-summary'>
                        {this.props.vocab.PROJECT.SELECT_TO_EDIT_STAGE}
                    </div>
                </div>
            </Box>
        </div>);
    }
}

AddStages.propTypes = {
    ui: PropTypes.object.isRequired,
    project: PropTypes.shape({
        userGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default AddStages;
