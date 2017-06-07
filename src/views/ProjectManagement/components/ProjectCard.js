import React, { Component } from 'react';
import { Box } from 'grommet';
import CardValueDropdown from './CardValueDropdown';
import { modalIDs } from './Modals';

class ProjectCard extends Component {
    render() {
        const ProjectStatusOptions = [{
            label: this.props.vocab.PROJECT.CHANGE_STATUS,
            value: modalIDs.PROJECT_STATUS_MODAL,
        }];

        return (
            <Box
                direction='row'
                justify='between'
                align='center'
                className='card'
                full='horizontal'
                margin={{ left: 'small', top: 'small' }}
                responsive={false}>
                <div className='project-card-left'>
                    <div className='card-title'>{this.props.vocab.PROJECT.PROJECT}</div>
                    <div className='card-value'>{this.props.name}</div>
                </div>
                <CardValueDropdown
                    value={this.props.status}
                    options={ProjectStatusOptions}
                    onClick={this.props.onStatusChangeClick} />
            </Box>
        );
    }
}

export default ProjectCard;
