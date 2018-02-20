import React from 'react';
import InfiniteCalendar from 'react-infinite-calendar';
import Time from '../../../utils/Time';

export default props => (
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

        onChange={(event) => {
            props.actions.updateTask(
                props.task.id,
                props.task.userIds,
                new Date(event),
                props.vocab.ERROR);
        }}
        value={Time.renderCommon(props.task.endDate)}
    />
);
