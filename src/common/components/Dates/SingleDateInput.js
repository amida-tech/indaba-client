import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import enhanceWithClickOutside from 'react-click-outside';
import scroller from 'react-scroll/modules/mixins/scroller';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import { ANCHOR_LEFT, ANCHOR_RIGHT } from 'react-dates/constants'

class SingleDateInput extends Component {
    constructor(props) {
        super(props);
        this.onFocusChange = this.onFocusChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.pastDates = this.pastDates.bind(this);
        const existingDate = get(this.props, 'value');
        this.state = {
            date: existingDate ? moment(existingDate): existingDate,
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
                placeholder={this.props.placeholder}
                onDateChange={this.onDateChange}
                focused={this.state.focused}
                displayFormat="MM/DD/YYYY"
                anchorDirection={this.props.align === "right" ? ANCHOR_RIGHT : ANCHOR_LEFT}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                id={this.props.id}
                hideKeyboardShortcutsPanel={true}
                disabled={this.props.disabled}
            />
        );
    }
}


SingleDateInput.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    align: PropTypes.string,
    placeholder: PropTypes.string,
    containerId: PropTypes.string,
    scrollTarget: PropTypes.string,
    id: PropTypes.string.isRequired,
    onDateChange: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
};

export default enhanceWithClickOutside(SingleDateInput);
