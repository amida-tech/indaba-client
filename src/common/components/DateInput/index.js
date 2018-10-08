import React, { Component } from 'react';
// import IonIcon from 'react-ionicons';
import moment from 'moment';
import enhanceWithClickOutside from 'react-click-outside';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class DateInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment(this.props.startDate.input.value.toString()),
            endDate: moment(this.props.endDate.input.value.toString()),
            focusedInput: null,
        };
    }

    render() {
        return (
            <div className='date-input'>
                <DateRangePicker
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="startDate" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="endDate" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => {
                        this.setState({ startDate, endDate });
                        this.props.startDate.input.onChange(startDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ'));
                        this.props.endDate.input.onChange(endDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ'));
                    }} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                />
            </div>
        );
    }
}

export default enhanceWithClickOutside(DateInput);
