import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

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
                        this.props.vocab.ERROR);
                }}/>}
            <Summary
                project={this.props.project}
                survey={this.props.survey}
                vocab={this.props.vocab} />
            <hr className='divider'/>
            <div className='add-stages-step__import-row'>

                <Button className='add-stages__import-row__add'
                    primary={true} label={this.props.vocab.PROJECT.ADD_STAGE}
                    onClick={() => this.props.showAddStageModal()}/>
                <Button className='add-stages-step__import-row__imp'
                 label={this.props.vocab.PROJECT.IMPORT_STAGE} />
            </div>
            <hr className='divider' />
            <p className='add-stages-step__instructions'>
                {this.props.vocab.PROJECT.ADD_STAGES_CLARIFICATION}
            </p>
            <hr className='divider' />
            <Box className='add-stages-step__grid' direction='row'>
                {this.props.project.stages.map((stage) => {
                    return <StageSummary stage={stage}
                        vocab={this.props.vocab}
                        userGroups={this.props.project.userGroups}
                        key={stage.id} />;
                })}
                <div className='add-stages-step__grid-row'
                    onClick={() => this.props.actions.showAddStageWizardModal(true)}>
                    <div className='add-stages-step__grid-row--title'>
                        {this.props.vocab.PROJECT.STAGE_TITLE}
                    </div>
                    <div className='add-stages-step__grid-row--summary'>
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
        stages: PropTypes.arrayOf(PropTypes.object).isRequired,
        userGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
};

export default AddStages;
