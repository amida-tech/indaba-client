import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';
import enhanceWithClickOutside from 'react-click-outside';
import 'react-dates/initialize';
import scroller from 'react-scroll/modules/mixins/scroller';
import { DateRangePicker, SingleDatePicker } from 'react-dates';

class MultiDateInput extends Component {
    constructor(props) {
        super(props);
        this.onChangeFocusedInput = this.onChangeFocusedInput.bind(this);
        this.onDatesChanged = this.onDatesChanged.bind(this);
        this.pastDates = this.pastDates.bind(this);
        this.state = {
            focusedInput: null,
        };
    }

    onChangeFocusedInput(focusedInput) {
        this.setState({ focusedInput });
        scroller.scrollTo(this.props.scrollTarget, {
            smooth: true,
            containerId: this.props.containerId,
        });
    }

    onDatesChanged(selectedDates) {
        if (this.state.focusedInput === 'startDate') {
            this.props.startDate.input.onChange(
                selectedDates.startDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
            );
        } else if (selectedDates.endDate) {
            this.props.endDate.input.onChange(
                selectedDates.endDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
            );
        }
        this.props.handleDates(selectedDates);
    }

    pastDates() {
        return false;
    }

    render() {
        return (
            <DateRangePicker
                startDate={this.props.startDate}
                startDateId='startDate'
                endDate={this.props.endDate}
                endDateId='endDate'
                isOutsideRange={this.pastDates}
                onDatesChange={this.props.handleDates}
                focusedInput={this.state.focusedInput}
                onFocusChange={this.onChangeFocusedInput}
                minimumNights={0}
                hideKeyboardShortcutsPanel={true}
                displayFormat="MM/DD/YYYY"
            />
        );
    }
}

MultiDateInput.propTypes = {
    startDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    endDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    scrollTarget: PropTypes.string,
    containerId: PropTypes.string,
    handleDates: PropTypes.func,
};

MultiDateInput.defaultProps = {
    scrollTarget: 'stage-form__date',
    containerId: 'modal-c',
};

export default enhanceWithClickOutside(MultiDateInput);
