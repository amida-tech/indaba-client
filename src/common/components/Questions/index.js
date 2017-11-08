import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bool from './Bool';
import Text from './Text';
import Choice from './Choice';
import Choices from './Choices';

class Questions extends Component {
    render() {
        let QuestionType;
        switch (this.props.type) {
        case 'bool':
            QuestionType = (<Bool {...this.props} />);
            break;
        case 'choice':
            QuestionType = (<Choice {...this.props} />);
            break;
        case 'choices':
            QuestionType = (<Choices {...this.props} />);
            break;
        default:
            QuestionType = (<Text
                vocab={this.props.vocab}
                {...this.props} />);
        }
        return (
            <div className='questions'>
                {QuestionType}
            </div>
        );
    }
}

Questions.propTypes = {
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
    choices: PropTypes.array,
};

export default Questions;
