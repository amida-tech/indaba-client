import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Time from '../../../utils/Time';

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
                    {this.props.vocab.PROJECT.LAST_UPDATED}
                    {` ${Time.renderForProjectList(this.props.project.lastUpdated)}`}
                </div>
            </div>
        );
    }
}

ProjectListEntry.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        lastUpdated: PropTypes.string.isRequired,
    }),
    survey: PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }),
    flags: PropTypes.number.isRequired,
};

export default withRouter(ProjectListEntry);
