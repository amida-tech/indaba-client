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
        if (Time.validateTime(event)) {
            this.props.upsertAnswer(
                { dateValue: Time.renderForSurvey(event) },
            );
        }
    }

    onFocusChange() {
        return true;
    }

    render() {
        const currentAnswer = get(this.props, 'answer.dateValue', undefined);
        return (
            <div className='date'>
                <SingleDateInput
                    value={currentAnswer}
                    placeholder={this.props.vocab.COMMON.ENTER_DATE}
                    onDateChange={this.onDateChange}
                    id={`date_pick_question${this.props.id}`}
                    scrollTarget={`question${this.props.questionIndex}`}
                    disabled={this.props.displayMode}
                />
            </div>
        );
    }
}

Date.propTypes = {
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Date;
