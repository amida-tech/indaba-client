import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ToField extends Component {
    render() {
        return (
            <div className='to-field'>
            </div>
        );
    }
}

ToField.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,

    input: PropTypes.shape({
        value: PropTypes.arrayOf(PropTypes.string).isRequired,
        onChange: PropTypes.func.isRequired,
    }).isRequired,
};

export default ToField;
