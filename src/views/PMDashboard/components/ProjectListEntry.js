import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import Time from '../../../utils/Time';
import FlagCount from '../../../common/components/Dashboard/FlagCount';

class ProjectListEntry extends Component {
    render() {
        return (
            <div className='project-list-entry'
                onClick={() =>
                    this.props.router.push(`/project/${this.props.project.id}`)}>
                <div className='project-list-entry__name'>
                    {this.props.project.name}
                </div>
                <div className={`project-list-entry__status${
                    this.props.project.status ?
                        ' project-list-entry__status--active' : ''}`}>
                    { this.props.project.status ?
                        this.props.vocab.PROJECT.STATUS_ACTIVE :
                        this.props.vocab.PROJECT.STATUS_INACTIVE}
                </div>
                <div className='project-list-entry__name'>
                    {this.props.survey.name}
                </div>
                <div className={`project-list-entry__status${
                    this.props.survey.status ?
                        ' project-list-entry__status--active' : ''}`}>
                    {this.props.survey.status === 'published' ?
                        this.props.vocab.SURVEY.STATUS_PUBLISHED :
                        this.props.vocab.SURVEY.STATUS_DRAFT}
                </div>
                <div className='project-list-entry__flags'>
                    <FlagCount value={this.props.flags} />
                </div>
                <div className='project-list-entry__last-updated'>
                    {Time.renderCommon(this.props.project.lastUpdated)}
                </div>
            </div>
        );
    }
}

ProjectListEntry.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        lastUpdated: PropTypes.string,
    }),
    survey: PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
    }),
    flags: PropTypes.number.isRequired,
};

export default withRouter(ProjectListEntry);
