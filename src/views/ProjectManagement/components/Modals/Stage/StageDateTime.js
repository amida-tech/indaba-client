import React, { Component } from 'react';
import DateInput from '../../../../../common/components/DateInput';

class StageDateTime extends Component {
    render() {
        return (
            <DateInput
                {...this.props}
                inline={true}
                className='stage-date-time' />
        );
    }
}

export default StageDateTime;
