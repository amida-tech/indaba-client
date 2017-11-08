import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Choice extends Component {
    render() {
        return (
            <div className='choice'>
                I am a choice!
            </div>
        );
    }
}

Choice.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Choice;
