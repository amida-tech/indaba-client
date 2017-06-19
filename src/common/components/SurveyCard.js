import React, { Component } from 'react';
import IonIcon from 'react-ionicons';
import { Box } from 'grommet';
import CardValueDropdown from './CardValueDropdown';

class SurveyCard extends Component {
    render() {
        const SurveyStatusOptions = [{
            label: this.props.vocab.PROJECT.CHANGE_STATUS,
            value: 'surveystatusmodal',
        }];

        return (
            <Box
                className='card'
                direction='row'
                justify='between'
                align='center'
                pad='medium'
                full='horizontal'
                responsive={false}
                margin={{ left: 'small', top: 'small' }}>
                <Box direction='row' align='center' responsive={false}>
                    <IonIcon
                        icon='ion-ios-paper-outline'
                        color='#4EB276'
                        fontSize='4em'
                        className='status-card-icon' />
                    <div className='survey-left-column'>
                        <div className='card-title'>{this.props.vocab.PROJECT.SURVEY}</div>
                        <div className='card-value'>{this.props.survey.name}</div>
                    </div>
                </Box>
                <CardValueDropdown
                    value={this.props.survey.status}
                    options={SurveyStatusOptions}
                    onClick={this.props.onStatusChangeClick}
                    />
            </Box>
        );
    }
}

export default SurveyCard;
