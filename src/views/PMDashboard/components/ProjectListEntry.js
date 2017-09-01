import React, { Component } from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import Time from '../../../utils/Time';

import EditableTextInput from '../../../common/components/EditableTextInput';
import FlagCount from '../../../common/components/Dashboard/FlagCount';

class ProjectListEntry extends Component {
    render() {
        return (
            <div className='project-list-entry'
                onClick={evt =>
                    ![...document.querySelectorAll('.project-list-entry__name')].some(
                        container => container.contains(evt.target),
                    ) &&
                    this.props.router.push(`/project/${this.props.project.id}`)}>
                <div className='project-list-entry__name'>
                    <EditableTextInput input={{
                        defaultValue: this.props.project.name,
                        onChange: evt =>
                        this.props.onProjectNameChange(evt.target.value, this.props.project.id),
                        onBlur: evt => this.props.onProjectNameBlur(evt.target.value),
                    }} />
                </div>
                <div className={`project-list-entry__status${
                    this.props.project.status ?
                        ' project-list-entry__status--active' : ''}`}>
                    { this.props.project.status ?
                        this.props.vocab.PROJECT.STATUS_ACTIVE :
                        this.props.vocab.PROJECT.STATUS_INACTIVE}
                </div>
                <div className='project-list-entry__name'>
                    <EditableTextInput input={{
                        defaultValue: this.props.survey.name,
                        onChange: evt =>
                        this.props.onSurveyNameChange(evt.target.value, this.props.project.id),
                        onBlur: evt => this.props.onSurveyNameBlur(evt.target.value),
                    }} />
                </div>
                <div className={`project-list-entry__status${
                    this.props.survey.status ?
                        ' project-list-entry__status--active' : ''}`}>
                    {this.props.survey.status ?
                        this.props.vocab.SURVEY.STATUS_PUBLISHED :
                        this.props.vocab.SURVEY.STATUS_DRAFT}
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
        status: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        lastUpdated: PropTypes.string.isRequired,
    }),
    survey: PropTypes.shape({
        name: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
    }),
    flags: PropTypes.number.isRequired,
    onProjectNameChange: PropTypes.func.isRequired,
    onProjectNameBlur: PropTypes.func.isRequired,
    onSurveyNameChange: PropTypes.func.isRequired,
    onSurveyNameBlur: PropTypes.func.isRequired,
};

export default withRouter(ProjectListEntry);
