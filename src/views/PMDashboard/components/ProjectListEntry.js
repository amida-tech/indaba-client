import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProjectListEntry extends Component {
    render() {
        return (
            <div className='project-list-entry'>
                <div className='project-list-entry__name'>
                    {this.props.project.name}
                </div>
                <div className='project-list-entry__status'>
                    {this.props.project.status}
                </div>
                <div className='project-list-entry__name'>
                    {this.props.survey.name}
                </div>
                <div className='project-list-entry__status'>
                    {this.props.survey.status}
                </div>
                <div className='project-list-entry__flags'>
                    {this.props.flags}
                </div>
                <div className='project-list-entry__last-updated'>
                    Last updated
                </div>
            </div>
        );
    }
}

ProjectListEntry.propTypes = {
    project: PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
    }),
    survey: PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
    }),
    flags: PropTypes.number,
};

export default ProjectListEntry;
