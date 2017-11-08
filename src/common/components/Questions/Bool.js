import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bool extends Component {
    render() {
        return (
            <div className='bool'>
                I am a bool!
            </div>
        );
    }
}

Bool.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Bool;
