import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Choices extends Component {
    render() {
        return (
            <div className='bool'>
                So many choices!
            </div>
        );
    }
}

Choices.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Choices;
