import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Questions extends Component {
    render() {
        return (
            <div className='questions'>
                ballz.
            </div>
        );
    }
}

Questions.propTypes = {
    type: PropTypes.string.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default Questions;
