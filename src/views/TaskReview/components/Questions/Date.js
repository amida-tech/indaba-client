import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import SingleDateInput from '../../../../common/components/Dates/SingleDateInput';
import Time from '../../../../utils/Time';

class Date extends Component {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    onDateChange(event) {
        if (Time.validateTime(event.target.value)) {
            this.props.upsertAnswer(
                { dateValue: Time.renderForSurvey(event.target.value) },
            );
        }
    }

    onFocusChange() {
        return true;
    }

    render() {
        const currentAnswer = get(this.props, 'answer.dateValue', undefined);
        console.log(currentAnswer);
        return (
            <div className='date'>
                {
                    (this.props.displayMode
                    && (
                        currentAnswer
                            ? <div className='date__field'>
                                {currentAnswer}
                            </div>
                            : this.props.vocab.SURVEY.NO_DATE_ENTERED
                    ))
                    || <SingleDateInput
                        value={currentAnswer}
                        onDateChange={this.onDateChange}
                        focused={true}
                        onFocusChange={this.onFocusChange} />
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
