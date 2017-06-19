import React, { Component } from 'react';
import { Box } from 'grommet';
import ProjectCard from './ProjectCard';
import SurveyCard from './SurveyCard';

class Summary extends Component {
    render() {
        return (
            <Box
                className='summary-spacer'
                direction='row'
                align='center'
                justify='center'
                margin={{ vertical: 'medium', right: 'small' }}
                pad={{ horizontal: 'medium' }}>
                <ProjectCard {...this.props} />
                <SurveyCard {...this.props} />
            </Box>
        );
    }
}

export default Summary;
