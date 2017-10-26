import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Toast } from 'grommet';

import Summary from '../../../common/components/Summary';
import StageModal from '../../ProjectManagement/components/Modals/Stage';
import StageSummary from '../../ProjectManagement/components/Workflow/StageSummary';

class AddStages extends Component {
    render() {
        return (<div className='add-stages-step'>
            {this.props.ui.showAddStage && <StageModal
                vocab={this.props.vocab}
                userGroups={this.props.project.userGroups}
                onCancel={() => this.props.actions.showAddStageWizardModal(false)}
                onAddStage={(stage) => {
                    this.props.actions.showAddStageWizardModal(false);
                    this.props.actions.putStage(
                        this.props.project,
                        stage,
                        true,
                        this.props.vocab.ERROR);
                }}/>}
                {this.props.project.stages.length > 3 &&
                    <Toast status='ok'>
                        {this.props.vocab.PROJECT.MAX_STAGES}
                    </Toast>
                    }
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
                    return <StageSummary stage={stage}
                        vocab={this.props.vocab}
                        userGroups={this.props.project.userGroups}
                        key={stage.id} />;
                })}
                {this.props.project.stages.length <= 3 &&
                    <div className='add-stage-placeholder'
                        onClick={() => this.props.actions.showAddStageWizardModal(true)}>
                        <div className='workflow-stage-title'>
                            {this.props.vocab.PROJECT.STAGE_TITLE}
                        </div>
                        <div className='workflow-stage-summary'>
                            {this.props.vocab.PROJECT.SELECT_TO_EDIT_STAGE}
                        </div>
                    </div>
                }
            </Box>
        </div>);
    }
}

AddStages.propTypes = {
    ui: PropTypes.object.isRequired,
    project: PropTypes.shape({
        stages: PropTypes.arrayOf(PropTypes.object).isRequired,
        userGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default AddStages;
