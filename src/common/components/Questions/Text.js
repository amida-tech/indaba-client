import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Text extends Component {
    render() {
        return (
            <div className='text'>
                I am a text!
            </div>
        );
    }
}

Text.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Text;
