import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import Bool from './Bool';
import Text from './Text';
import Choice from './Choice';
import Choices from './Choices';

class Questions extends Component {
    render() {
        let QuestionType;
        const value = _.find(this.props.answers, item => item.questionId === this.props.id);
        switch (this.props.type) {
        case 'bool':
            QuestionType = (<Bool
                answer={value ? value.answer : false}
                {...this.props}/>);
            break;
        case 'choice':
            QuestionType = (<Choice
                answer={value ? value.answer : undefined}
                {...this.props} />);
            break;
        case 'choices':
            QuestionType = (<Choices
                answer={value ? value.answer : []}
                {...this.props} />);
            break;
        default:
            QuestionType = (<Text
                answer={value ? value.answer : ''}
                {...this.props}/>);
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
