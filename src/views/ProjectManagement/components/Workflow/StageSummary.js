import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';
import _ from 'lodash';

import TaskStatus from '../../../../utils/TaskStatus';

class StageSummary extends Component {
    render() {
        const userGroups = this.props.stage.userGroups.map(stageGroup =>
            _.find(this.props.userGroups, userGroup => userGroup.id === stageGroup));
        let permissions = 0;
        if (this.props.stage.allowEdit) {
            permissions = 3;
        } else if (this.props.stage.discussionParticipation) {
            permissions = 2;
        } else if (this.props.stage.blindReview) {
            permissions = 1;
        }

        return (
            <div className='stage-summary'
                onClick={() => this.props.actions.showStageModal(true, this.props.stage.id)}>
                <div className='stage-summary__header'>
                    {this.props.stage.title}
                </div>
                <Box direction='row'
                    justify='between'
                    responsive={false}
                    className='stage-summary__row'>
                    <div className='stage-summary__left'>
                        <div className='stage-summary__value'>
                            {TaskStatus.formatDate(this.props.stage.startDate)}
                        </div>
                        <div className='stage-summary__label'>
                            {this.props.vocab.STAGE.START_STAGE}
                        </div>
                    </div>
                    <div className='stage-summary__right'>
                        <div className='stage-summary__value'>
                            {TaskStatus.formatUserGroups(userGroups)}
                        </div>
                        <div className='stage-summary__label'>
                            {this.props.vocab.STAGE.USER_GROUP}
                        </div>
                    </div>
                </Box>
                <Box direction='row'
                    justify='between'
                    responsive={false}
                    className='stage-summary__row'>
                    <div className='stage-summary__left'>
                        <div className='stage-summary__value'>
                            {TaskStatus.formatDate(this.props.stage.endDate)}
                        </div>
                        <div className='stage-summary__label'>
                            {this.props.vocab.STAGE.END_STAGE}
                        </div>
                    </div>
                    <div className='stage-summary__right'>
                        <div className='stage-summary__value'>
                            {this.props.vocab.PROJECT.PERM_ARRAY[permissions]}
                        </div>
                        <div className='stage-summary__label'>
                            {this.props.vocab.STAGE.PERMISSIONS}
                        </div>
                    </div>
                </Box>
            </div>
        );
    }
}

StageSummary.propTypes = {
    vocab: PropTypes.object.isRequired,
    stage: PropTypes.object.isRequired,
    userGroups: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.shape({
        showStageModal: PropTypes.func.isRequired,
    }).isRequired,
};

export default StageSummary;
