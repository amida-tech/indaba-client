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
                    name={this.props.project.name}
                    status={this.props.project.status}
                    onStatusChangeClick={
                        this.props.onStatusChangeClick &&
                        (() => this.props.onStatusChangeClick('projectstatusmodal'))}
                    onNameChange={this.props.onProjectNameChange}/>
                <StatusCard
                    label={this.props.vocab.PROJECT.SURVEY}
                    name={this.props.survey.name}
                    status={this.props.survey.status}
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
