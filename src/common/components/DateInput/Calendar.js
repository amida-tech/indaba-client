import React from 'react';
import PropTypes from 'prop-types';

import InfiniteCalendar from 'react-infinite-calendar';

const Calendar = ({ onChange, value }) => (
    <InfiniteCalendar
        displayOptions={{
            layout: 'portrait',
        }}

        theme={{
            selectionColor: 'rgb(48, 130, 82)',
            textColor: {
                default: '#333',
                active: '#FFF',
            },
            weekdayColor: 'rgb(78, 178, 118)',
            headerColor: 'rgb(48, 130, 82)',
            floatingNav: {
                background: 'rgba(81, 67, 138, 0.96)',
                color: '#FFF',
                chevron: '#FFA726',
            },
        }}

        onSelect={onChange}
        selected={value}
    />
);

Calendar.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
};

export default Calendar;
