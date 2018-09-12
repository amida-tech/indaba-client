import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

import StatusCard from './StatusCard';

class Summary extends Component {
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
                    onStatusChangeClick={
                        this.props.onStatusChangeClick
                        && (() => this.props.onStatusChangeClick('projectstatusmodal'))}
                    onEditClick={this.props.onProjectEditClick} />
                <StatusCard
                    label={this.props.vocab.PROJECT.SURVEY}
                    name={this.props.survey ? this.props.survey.name : ''}
                    actions={this.props.actions}
                    status={this.props.vocab.SURVEY[this.props.survey.status.toUpperCase()]}
                    onStatusChangeClick={
                        this.props.onStatusChangeClick
                        && (() => this.props.onStatusChangeClick('surveystatusmodal'))}
                    onEditClick={this.props.onSurveyEditClick} >
                    <IonIcon
                        icon='ion-ios-paper-outline'
                        fontSize='4em'
                        className='summary__survey-icon' />
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
