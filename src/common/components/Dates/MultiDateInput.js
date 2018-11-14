import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { get } from 'lodash';
import enhanceWithClickOutside from 'react-click-outside';
import 'react-dates/initialize';
import scroller from 'react-scroll/modules/mixins/scroller';
import { DateRangePicker } from 'react-dates';

class MultiDateInput extends Component {
    constructor(props) {
        super(props);
        this.onChangeFocusedInput = this.onChangeFocusedInput.bind(this);
        this.onDatesChanged = this.onDatesChanged.bind(this);
        this.pastDates = this.pastDates.bind(this);
        this.state = {
            startDate: moment(get(this.props, 'startDate.input.value')),
            endDate: moment(get(this.props, 'endDate.input.value')),
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
        this.setState({
            startDate: selectedDates.startDate,
            endDate: selectedDates.endDate,
        });
        if (this.state.focusedInput === 'startDate') {
            this.props.startDate.input.onChange(
                selectedDates.startDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
            );
        } else {
            this.props.endDate.input.onChange(
                selectedDates.endDate.format('YYYY-MM-DDTHH:mm:ss.SSSZZ'),
            );
        }
    }

    pastDates() {
        return false;
    }

    render() {
        return (
            <DateRangePicker
                startDate={this.state.startDate}
                startDateId='startDate'
                endDate={this.state.endDate}
                endDateId='endDate'
                isOutsideRange={this.pastDates}
                onDatesChange={this.onDatesChanged}
                focusedInput={this.state.focusedInput}
                onFocusChange={this.onChangeFocusedInput}
                hideKeyboardShortcutsPanel={true}
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
};

MultiDateInput.defaultProps = {
    scrollTarget: 'stage-form__date',
    containerId: 'modal-c',
};

export default enhanceWithClickOutside(MultiDateInput);
