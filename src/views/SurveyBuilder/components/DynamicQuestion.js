import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DynamicQuestion extends Component {
    render() {
        return (
            <div className='static-question'>
                Here we are, dynamo.
            </div>
        );
    }
}

DynamicQuestion.propTypes = {
    sectionIndex: PropTypes.number.isRequired,
    questionIndex: PropTypes.number.isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default DynamicQuestion;
