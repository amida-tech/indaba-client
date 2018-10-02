import React, { Component } from 'react';
import DateInput from '../../../../../common/components/DateInput';

class StageDateTime extends Component {
    render() {
        console.log('sdt');
        console.log(this.props);
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
