import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

import Calendar from './Calendar';

class DateInput extends Component {
    render() {
        const { expanded, value, onChange, onExpand } = this.props;
        return (
            <div className='date-input'>
                {
                    expanded ?
                    <div className='date-input__calendar-wrapper'>
                        <Calendar value={value} onChange={onChange} />
                    </div> :
                    <div className='date-input__value'
                        onClick={onExpand}>
                        {Time.renderCommon(value)}
                        <IonIcon icon='ion-android-calendar' />
                    </div>
                }
            </div>
        );
    }
}

DateInput.propTypes = {
    expanded: PropTypes.bool.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
};

export default DateInput;
