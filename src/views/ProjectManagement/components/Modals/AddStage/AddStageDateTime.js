import React, { Component } from 'react';
import DateTime from 'grommet/components/DateTime';

class AddStageDateTime extends Component {
    render() {
        return (
            <DateTime
                {...this.props.input}
                format='MM/DD/YYYY'
                className='add-stage-date-time' />
        );
    }
}

export default AddStageDateTime;
