import React, { Component } from 'react';
import DateInput from '../../../../../common/components/DateInput';

class StageDateTime extends Component {

    /* TODO: Need to find a way to add this here to reflect endOfDay
        onChange={(event) => {
            const endOfDay = new Date(event).setHours(23, 59, 59, 999);
            this.props.actions.updateTask(
                this.props.task.id,
                this.props.task.userIds,
                new Date(endOfDay),
                this.props.vocab.ERROR);
        }}
    */

    render() {
        return (
            <DateInput
                {...this.props.input}
                inline={true}
                format='MM/DD/YYYY'
                className='stage-date-time' />
        );
    }
}

export default StageDateTime;
