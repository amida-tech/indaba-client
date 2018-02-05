import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { toast } from 'react-toastify';

class Scale extends Component {
    render() {
        return (
            <div className='scale'>
                <span className='scale__instructions'>
                    {`${`${this.props.vocab.SURVEY.SCALE_ENTER + this.props.scaleLimits.min
                    }, ${this.props.scaleLimits.max}`}.` }
                </span>
                <input className={`scale__field${this.props.displayMode ? '--disabled' : ''}`}
                    placeholder={0}
                    type='number'
                    max={this.props.scaleLimits.max}
                    min={this.props.scaleLimits.min}
                    disabled={this.props.displayMode}
                    value={parseInt(get(this.props, 'answer.numberValue'), 10) || ''}
                    onChange={(event) => {
                        this.props.holdAnswer(this.props.id,
                            { numberValue: parseInt(event.target.value, 10) });
                    }}
                    onBlur={(event) => {
                        let value = parseInt(event.target.value, 10);
                        if (value < this.props.scaleLimits.min
                            || value > this.props.scaleLimits.max) {
                            toast(this.props.vocab.ERROR.MIN_MAX_INVALID);
                            value = this.props.scaleLimits.min;
                        }
                        this.props.upsertAnswer({ numberValue: value });
                    }}
                />
            </div>
        );
    }
}

Scale.propTypes = {
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    scaleLimits: PropTypes.shape({
        max: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
    }).isRequired,
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Scale;
