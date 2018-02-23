import React, { Component } from 'react';
import DateInput from '../../../../../common/components/DateInput';

class StageDateTime extends Component {
    render() {
        return (
            <DateInput
                {...this.props.input}
                format='MM/DD/YYYY'
                className='stage-date-time' />
        );
    }
}

export default StageDateTime;
