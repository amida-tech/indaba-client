import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { DateTime } from 'grommet';
import Time from '../../../../utils/Time';

class Date extends Component {
    render() {
        let currentAnswer = get(this.props, 'answer.dateValue', undefined);
        if (currentAnswer) {
            currentAnswer = Time.renderForQuestion(currentAnswer);
        }
        return (
            <div className='date'>
                {
                    this.props.displayMode ?
                    <div className='date__field'>
                        {currentAnswer}
                    </div> :
                    <DateTime className='date__field'
                        value={currentAnswer}
                        format='MM/DD/YYYY'
                        onChange={(event) => {
                            if (Time.validateTime(event)) {
                                this.props.upsertAnswer(
                                    { dateValue: Time.renderForSurvey(event) });
                            }
                        }} />
                }
            </div>
        );
    }
}

Date.propTypes = {
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Date;
