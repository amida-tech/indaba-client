import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StaticQuestion extends Component {
    render() {
        return (
            <div className='static-question'>
                Here we are.
            </div>
        );
    }
}

StaticQuestion.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default StaticQuestion;
