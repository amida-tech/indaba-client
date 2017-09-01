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
                    status={this.props.project.status ?
                        this.props.vocab.PROJECT.STATUS_ACTIVE :
                        this.props.vocab.PROJECT.STATUS_INACTIVE}
                    onStatusChangeClick={
                        this.props.onStatusChangeClick &&
                        (() => this.props.onStatusChangeClick('projectstatusmodal'))}
                    onNameChange={this.props.onProjectNameChange}/>
                <StatusCard
                    label={this.props.vocab.PROJECT.SURVEY}
                    name={this.props.survey ? this.props.survey.name : ''}
                    status={this.props.survey.status ?
                        this.props.vocab.SURVEY.STATUS_PUBLISHED :
                        this.props.vocab.SURVEY.STATUS_DRAFT}
                    onStatusChangeClick={
                        this.props.onStatusChangeClick &&
                        (() => this.props.onStatusChangeClick('surveystatusmodal'))}
                    onNameChange={this.props.onSurveyNameChange}>
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

    onStatusChangeClick: PropTypes.func,
    onProjectNameChange: PropTypes.func,
    onSurveyNameChange: PropTypes.func,
};

export default Summary;
