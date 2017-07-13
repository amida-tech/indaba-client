import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Stamp extends Component {
    render() {
        return (
            <div className='stamp'>
                <div className='stamp__value'>
                    {this.props.value}
                </div>
                <div className='stamp__label'>
                    {this.props.label}
                </div>
            </div>
        );
    }
}

Stamp.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
};

export default Stamp;
