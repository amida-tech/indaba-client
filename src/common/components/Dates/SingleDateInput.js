import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import enhanceWithClickOutside from 'react-click-outside';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class SingleDateInput extends Component {
    constructor(props) {
        super(props);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.state = {
            date: moment(get(this.props, 'value')),
            focused: null,
        };
    }

    onDateChange(event) {
        this.props.onDateChange(event);
        this.setState({ date: event });
    }

    onFocusChange(focused) {
        this.setState(focused);
    }

    render() {
        return (
            <div className='date-input'>
                <SingleDatePicker
                    date={this.state.date}
                    onDateChange={this.onDateChange}
                    focused={this.state.focused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    id={this.props.id}
                />
            </div>
        );
    }
}


SingleDateInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    onDateChange: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside(SingleDateInput);
