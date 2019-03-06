import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { has, some } from 'lodash';

import StatusCard from './StatusCard';

class Summary extends Component {
    constructor(props) {
        super(props);
        this.onProjectStatusClick = this.onProjectStatusClick.bind(this);
        this.onSurveyStatusClick = this.onSurveyStatusClick.bind(this);
    }

    onProjectStatusClick() {
        if (this.props.onStatusChangeClick) {
            this.props.onStatusChangeClick('projectstatusmodal');
        } else {
            toast(this.props.vocab.PROJECT.WIZARD_INSTRUCTIONS);
        }
    }

    onSurveyStatusClick() {
        // check survey was finished (no blanks)
        const blanks = some(this.props.survey.sections, (section) => {
            return some(section.questions, (question) => {
                if (question.text.match(/^\s*$/) !== null) {
                    return true;
                }
                if (has(question, 'choices')) {
                    return some(question.choices, choice => choice.text.match(/^\s*$/) !== null);
                }
                return false;
            });
        });
        const blankSection = some(this.props.survey.sections, (section) => {
            return (section.name.match(/^\s*$/) !== null);
        });
        if (blanks || blankSection) {
            toast(this.props.vocab.ERROR.UNFILLED_SURVEY, { autoClose: false });
        }
        if (this.props.project.status) {
            toast(this.props.vocab.PROJECT.SURVEY_DRAFT_INSTRUCTIONS);
        } else if (this.props.onStatusChangeClick) {
            if (!blanks && !blankSection) {
                this.props.onStatusChangeClick('surveystatusmodal');
            }
        } else {
            toast(this.props.vocab.PROJECT.WIZARD_INSTRUCTIONS);
        }
    }

    render() {
        return (
            <div className='summary'>
                <StatusCard
                    label={this.props.vocab.PROJECT.PROJECT}
                    name={this.props.project ? this.props.project.name : ''}
                    actions={this.props.actions}
                    status={this.props.project.status
                        ? this.props.vocab.PROJECT.STATUS_ACTIVE
                        : this.props.vocab.PROJECT.STATUS_INACTIVE}
                    onStatusChangeClick={this.onProjectStatusClick}
                    onEditClick={this.props.onProjectEditClick} />
                <StatusCard
                    label={this.props.vocab.PROJECT.SURVEY}
                    name={this.props.survey ? this.props.survey.name : ''}
                    actions={this.props.actions}
                    status={this.props.vocab.SURVEY[this.props.survey.status.toUpperCase()]}
                    onStatusChangeClick={this.onSurveyStatusClick}
                    onEditClick={this.props.onSurveyEditClick} >
                </StatusCard>
            </div>
        );
    }
}

Summary.propTypes = {
    project: PropTypes.object.isRequired,
    survey: PropTypes.object.isRequired,
    vocab: PropTypes.object.isRequired,
    actions: PropTypes.object,

    onStatusChangeClick: PropTypes.func,
    onProjectEditClick: PropTypes.func,
    onSurveyEditClick: PropTypes.func,
};

export default Summary;
