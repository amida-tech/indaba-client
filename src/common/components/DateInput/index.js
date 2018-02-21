import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

import Calendar from './Calendar';

class DateInput extends Component {
    render() {
        const { expanded, value, onChange } = this.props;
        return (
            expanded ?
            <Calendar value={value} onChange={onChange} /> :
            <div className='date-input'>
                <div className='date-input__value'>
                    {value}
                    <IonIcon icon='ion-android-calendar' />
                </div>
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
};

export default DateInput;
