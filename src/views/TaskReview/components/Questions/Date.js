import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateTime from 'grommet';
import Time from '../../../../utils/Time';

class Date extends Component {
    render() {
        return (
            <div className='date'>
                <DateTime className={`date__field${this.props.displayMode ? '--disabled' : ''}`}
                    disabled={this.props.displayMode}
                    value={this.props.answer.dateValue || undefined}
                    format='MM/DD/YYYY'
                    onChange={(event) => {
                        if (Time.validateTime(event)) {
                            this.props.upsertAnswer({ dateValue: event });
                        }
                    }}
                />
            </div>
        );
    }
}

Date.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
};

export default Text;
