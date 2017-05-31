import React, { Component } from 'react';
import { Box } from 'grommet';

class StageSummary extends Component {
  render() {
    return (
      <div className='stage-summary'>
        <Box direction='row'
          justify='between'
          responsive={false}
          className='stage-summary-row'>
          <div className='stage-left'>
            <div className='stage-summary-value'>{this.props.stage.startStage}</div>
            <div className='stage-summary-label'>{this.props.vocab.STAGE.START_STAGE}</div>
          </div>
          <div className='stage-right'>
            <div className='stage-summary-value'>{this.props.stage.userGroup}</div>
            <div className='stage-summary-label'>{this.props.vocab.STAGE.USER_GROUP}</div>
          </div>
        </Box>
        <Box direction='row'
          justify='between'
          responsive={false}
          className='stage-summary-row'>
          <div className='stage-left'>
            <div className='stage-summary-value'>{this.props.stage.endStage}</div>
            <div className='stage-summary-label'>{this.props.vocab.STAGE.END_STAGE}</div>
          </div>
          <div className='stage-right'>
            <div className='stage-summary-value'>{this.props.stage.permissions}</div>
            <div className='stage-summary-label'>{this.props.vocab.STAGE.PERMISSIONS}</div>
          </div>
        </Box>
      </div>
    );
  }
}

export default StageSummary
