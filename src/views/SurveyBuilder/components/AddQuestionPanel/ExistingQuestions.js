import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExistingQuestions extends Component {

    render() {
        return (
            <div>
                I exist therefore I question your every decision James.
            </div>
        );
    }
}

ExistingQuestions.propTypes = {
    sectionView: PropTypes.number.isRequired,
    actions: PropTypes.object,
    vocab: PropTypes.object.isRequired,
};

export default ExistingQuestions;
