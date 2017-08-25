import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';
import _ from 'lodash';

import TaskStatus from '../../../../utils/TaskStatus';

class StageSummary extends Component {
    render() {
        const userGroups = this.props.stage.userGroups.map(stageGroup =>
            _.find(this.props.userGroups, userGroup => userGroup.id === stageGroup));
        return (
            <div className='stage-summary'>
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
                            {this.props.vocab.PROJECT.PERM_ARRAY[this.props.stage.permissions]}
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
};

export default StageSummary;
