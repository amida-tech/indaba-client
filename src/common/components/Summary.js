import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
                <ProjectCard
                    {...this.props.project}
                    vocab={this.props.vocab}
                    onStatusChangeClick={this.props.onStatusChangeClick}/>
                <SurveyCard
                    {...this.props.survey}
                    vocab={this.props.vocab}
                    onStatusChangeClick={this.props.onStatusChangeClick}/>
            </Box>
        );
    }
}

Summary.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,

    onStatusChangeClick: PropTypes.func,
};

export default Summary;
