import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import ProjectCard from './ProjectCard';
import SurveyCard from'./SurveyCard';

class Summary extends Component {
  render() {
    return (
      <Box
        className='summary-spacer'
        direction='row'
        align='center'
        justify='center'
        pad={{horizontal: 'medium'}}>
        <ProjectCard />
        <SurveyCard />
      </Box>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    data: state,
    vocab: state.settings.language.vocabulary
  }
}

export default connect(mapStateToProps)(Summary);
