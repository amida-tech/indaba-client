import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExistingQuestions extends Component {
    render() {
        return (
            <div className='existing-questions'>
                {this.props.vocab.ERROR.COMING_SOON}
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
