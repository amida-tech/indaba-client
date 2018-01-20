import React, { Component } from 'react';
import DateTime from 'grommet/components/DateTime';

class StageDateTime extends Component {
    render() {
        console.log(this.props);
        return (
            <DateTime
                {...this.props.input}
                format='MM/DD/YYYY'
                className='stage-date-time' />
        );
    }
}

export default StageDateTime;
