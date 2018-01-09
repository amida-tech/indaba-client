import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

class Integer extends Component {
    render() {
        let currentAnswer = get(this.props, 'answer.integerValue', undefined);
        if (currentAnswer) {
            currentAnswer = parseInt(currentAnswer, 10);
        }
        return (
            <div className='integer'>
                <input className={`integer__field${this.props.displayMode ? '--disabled' : ''}`}
                    placeholder={0}
                    type='number'
                    disabled={this.props.displayMode}
                    defaultValue={currentAnswer}
                    onBlur={(event) => {
                        this.props.upsertAnswer({ integerValue: parseInt(event.target.value, 10) });
                    }}
                />
            </div>
        );
    }
}

Integer.propTypes = {
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Integer;
