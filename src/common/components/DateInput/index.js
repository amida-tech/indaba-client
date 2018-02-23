import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IonIcon from 'react-ionicons';
import enhanceWithClickOutside from 'react-click-outside';

import Time from '../../../utils/Time';
import Calendar from './Calendar';

class DateInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
        };

        this.expand = this.expand.bind(this);
    }
    handleClickOutside() {
        this.setState({ expanded: false });
    }
    expand() {
        this.setState({ expanded: true });
    }
    render() {
        const { value, onChange, inline, pickerProps } = this.props;
        const { expanded } = this.state;
        return (
            <div className='date-input'>
                {
                    expanded ?
                    <div className={`date-input__calendar-wrapper ${inline ? 'date-input__calendar-wrapper--inline' : ''}`}>
                        <Calendar value={value} onChange={onChange}
                            pickerProps={pickerProps} />
                    </div> :
                    <div className='date-input__value'
                        onClick={this.expand}>
                        {Time.renderCommon(value)}
                        <IonIcon icon='ion-android-calendar'
                            className='date-input__value-icon'/>
                    </div>
                }
            </div>
        );
    }
}

DateInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
    onChange: PropTypes.func.isRequired,
    // true if the expanded picker should be kept in the document flow
    // otherwise, the expanded picker will have absolute position and
    // overlap other elements until collapsed
    inline: PropTypes.bool,
    // any props that will be passed down to the third party date picker component
    pickerProps: PropTypes.object,
};

export default enhanceWithClickOutside(DateInput);
