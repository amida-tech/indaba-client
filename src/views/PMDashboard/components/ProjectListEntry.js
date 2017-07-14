import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import FlagCount from './FlagCount';

class ProjectListEntry extends Component {

    render() {
        return (
            <div className='project-list-entry'
                onClick={() => this.props.router.push(`/project/${this.props.project.id}`)}>
                <div className='project-list-entry__name'>
                    {this.props.project.name}
                </div>
                <div className={`project-list-entry__status${
                    this.props.project.status === 'Active' ?
                        ' project-list-entry__status--active' : ''}`}>
                    {this.props.project.status}
                </div>
                <div className='project-list-entry__name'>
                    {this.props.survey.name}
                </div>
                <div className={`project-list-entry__status${
                    this.props.survey.status === 'Published' ?
                        ' project-list-entry__status--active' : ''}`}>
                    {this.props.survey.status}
                </div>
                <div className='project-list-entry__flags'>
                    <FlagCount value={this.props.flags} />
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
        id: PropTypes.number,
    }),
    survey: PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
    }),
    flags: PropTypes.number,
};

export default withRouter(ProjectListEntry);
