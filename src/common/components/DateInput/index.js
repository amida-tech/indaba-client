import React, { Component } from 'react';
// import IonIcon from 'react-ionicons';
import enhanceWithClickOutside from 'react-click-outside';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
        };
    }

    render() {
        return (
            <div className='date-input'>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="StartDate" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="EndDate" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({
                        startDate,
                        endDate,
                    })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
        );
    }
}

export default enhanceWithClickOutside(DateInput);
