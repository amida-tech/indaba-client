import React from 'react';
import PropTypes from 'prop-types';

import InfiniteCalendar from 'react-infinite-calendar';

const Calendar = ({ onChange, value, pickerProps = {} }) => (
    <InfiniteCalendar
        {...pickerProps}

        displayOptions={Object.assign({},
            { layout: 'portrait' },
            pickerProps.displayOptions,
        )}

        theme={Object.assign({}, {
            selectionColor: 'rgb(48, 130, 82)',
            textColor: {
                default: '#333',
                active: '#FFF',
            },
            weekdayColor: 'rgb(78, 178, 118)',
            headerColor: 'rgb(48, 130, 82)',
            floatingNav: {
                background: 'rgba(72, 165, 109, 1)',
                color: '#FFF',
                chevron: '#FFA726',
            },
        },
        pickerProps.theme)}

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
