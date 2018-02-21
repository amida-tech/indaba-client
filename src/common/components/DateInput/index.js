import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';

import Calendar from './Calendar';

class DateInput extends Component {
    render() {
        const { expanded, value, onChange, onExpand } = this.props;
        return (
            expanded ?
            <Calendar value={value} onChange={onChange} /> :
            <div className='date-input'>
                <div className='date-input__value'
                    onClick={onExpand}>
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
    onChange: PropTypes.func.isRequired,
    onExpand: PropTypes.func.isRequired,
};

export default DateInput;
