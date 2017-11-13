import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import Bool from './Bool';
import Text from './Text';
import Choice from './Choice';
import Choices from './Choices';

class Questions extends Component {
    render() {
        let QuestionType;
        const value = find(this.props.answers, item => item.questionId === this.props.id);
        switch (this.props.type) {
        case 'bool':
            QuestionType = (<Bool
                {...this.props}
                answer={value ? value.answer : false} />);
            break;
        case 'choice':
            QuestionType = (<Choice
                {...this.props}
                answer={value ? value.answer : undefined} />);
            break;
        case 'choices':
            QuestionType = (<Choices
                {...this.props}
                answer={value ? value.answer : []} />);
            break;
        default:
            QuestionType = (<Text
                {...this.props}
                answer={value ? value.answer : ''} />);
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
