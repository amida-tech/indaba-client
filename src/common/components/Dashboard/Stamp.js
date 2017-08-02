import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const StampType = {
    BAD: 'BAD',
    GOOD: 'GOOD',
    NEUTRAL: 'NEUTRAL',
};

const _modifiers = {
    [StampType.BAD]: 'bad',
    [StampType.GOOD]: 'good',
    [StampType.NEUTRAL]: 'neutral',
};

class Stamp extends Component {
    render() {
        return (
            <div className={`stamp stamp--${_modifiers[this.props.type]}`}>
                <div className='stamp__content'>
                    <div className='stamp__value'>
                        {this.props.value}
                    </div>
                    <div className='stamp__label'>
                        {this.props.label}
                    </div>
                </div>
            </div>
        );
    }
}

Stamp.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    type: PropTypes.oneOf(Object.values(StampType)),
};

Stamp.defaultProps = {
    type: StampType.NEUTRAL,
};

export default Stamp;
