import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import enhanceWithClickOutside from 'react-click-outside';
import scroller from 'react-scroll/modules/mixins/scroller';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class SingleDateInput extends Component {
    constructor(props) {
        super(props);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.pastDates = this.pastDates.bind(this);
        this.state = {
            date: moment(get(this.props, 'value')),
            focused: null,
        };
    }

    onDateChange(date) {
        this.props.onDateChange(date);
        this.setState({ date });
    }

    onFocusChange(focused) {
        this.setState(focused);
        if (this.props.scrollTarget && focused.focused) {
            scroller.scrollTo(this.props.scrollTarget, {
                smooth: true,
                containerId: get(this.props, 'containerId', 'task-review__details-and-survey'),
            });
        }
    }

    pastDates() {
        return false;
    }

    render() {
        return (
            <SingleDatePicker
                date={this.state.date}
                isOutsideRange={this.pastDates}
                onDateChange={this.onDateChange}
                focused={this.state.focused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                id={this.props.id}
                hideKeyboardShortcutsPanel={true}
            />
        );
    }
}


SingleDateInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    containerId: PropTypes.string,
    scrollTarget: PropTypes.string,
    id: PropTypes.string.isRequired,
    onDateChange: PropTypes.func.isRequired,
};

export default enhanceWithClickOutside(SingleDateInput);
