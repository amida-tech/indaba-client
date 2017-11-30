import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StaticQuestion extends Component {
    render() {
        return (
            <div>
                Coming soon need sleep so bad.
            </div>
        );
    }
}

StaticQuestion.propTypes = {
    type: PropTypes.string.isRequired,
    vocab: PropTypes.object.isRequired,
};

export default StaticQuestion;
