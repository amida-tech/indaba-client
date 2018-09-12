import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Box from 'grommet/components/Box';
import { toast } from 'react-toastify';

import Modal from '../../../common/components/Modal';
import StageModal from '../../ProjectManagement/components/Modals/Stage';
import StageSummary from '../../ProjectManagement/components/Workflow/StageSummary';

class AddStages extends Component {
    handleStageDelete(stageId) {
        this.props.actions.wizardShowStageDeleteConfirmModal(stageId);
    }

    render() {
        return (<div className='add-stages'>
            {
                this.props.ui.showAddStage && !this.props.ui.showStageDeleteConfirmModal
                && <StageModal vocab={this.props.vocab}
                    userGroups={this.props.project.userGroups}
                    onCancel={() => this.props.actions.wizardShowStageModal(false)}
                    stageId={this.props.ui.stageEditId}
                    project={this.props.project}
                    onDeleteClick={() => this.handleStageDelete(this.props.ui.stageEditId)}
                    onAddStage={(stage) => {
                        this.props.actions.wizardShowStageModal(false);
                        this.props.actions.putStage(
                            this.props.project,
                            stage,
                            true,
                            this.props.vocab.ERROR,
                        );
                    }}
                    actions={this.props.actions} />
            }
            {
                this.props.ui.showStageDeleteConfirmModal
                && <Modal title={this.props.vocab.MODAL.STAGE_DELETE_CONFIRM.TITLE}
                    bodyText={this.props.vocab.MODAL.STAGE_DELETE_CONFIRM.DELETE_NO_DATA}
                    onCancel={this.props.actions.wizardHideStageDeleteConfirmModal}
                    onSave={() => this.props.actions.wizardDeleteStage(
                        this.props.project.id,
                        this.props.ui.showStageDeleteConfirmModal.stageId,
                    )
                        .then(() => {
                            this.props.actions.wizardShowStageModal(false);
                            this.props.actions.wizardHideStageDeleteConfirmModal();
                        }).catch(() => {
                            toast(this.props.vocab.ERROR.STAGE_REQUEST,
                                { type: 'error', autoClose: false });
                            this.props.actions.wizardHideStageDeleteConfirmModal();
                        }) } />
            }
            <hr className='divider'/>
            <div className='add-stages__import-row'>
                <button className='add-stages__import-button' disabled>
                    <span>{this.props.vocab.PROJECT.IMPORT_STAGE}</span>
                </button>
            </div>
            <hr className='divider' />
            <p className='add-stages__instructions'>
                {this.props.vocab.PROJECT.ADD_STAGES_CLARIFICATION}
            </p>
            <hr className='divider' />
            <Box className='add-stages__grid' direction='row'>
                {this.props.project.stages.map((stage) => {
                    return <StageSummary stage={stage}
                        onClick={() => this.props.actions.wizardShowStageModal(true, stage.id)}
                        vocab={this.props.vocab}
                        userGroups={this.props.project.userGroups}
                        key={stage.id} />;
                })}

                {
                    this.props.project.stages.length <= 3
                    && <div className='add-stages__grid-row'
                        onClick={() => this.props.actions.wizardShowStageModal(true)}>
                        <div className='add-stages__grid-row--title'>
                            {this.props.vocab.PROJECT.STAGE_TITLE}
                        </div>
                        <div className='add-stages__grid-row--summary'>
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
