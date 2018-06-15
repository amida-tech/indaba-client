import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import DateInput from '../../../../common/components/DateInput';
import Time from '../../../../utils/Time';

class Date extends Component {
    render() {
        const currentAnswer = get(this.props, 'answer.dateValue', undefined);
        return (
            <div className='date'>
                {
                    (this.props.displayMode &&
                    (
                        currentAnswer ?
                        <div className='date__field'>
                            {currentAnswer}
                        </div> :
                        this.props.vocab.SURVEY.NO_DATE_ENTERED
                    )) ||
                    <DateInput className='date__field'
                        value={currentAnswer}
                        inline={true}
                        onChange={(date) => {
                            if (Time.validateTime(date)) {
                                this.props.upsertAnswer(
                                    { dateValue: Time.renderForSurvey(date) });
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
