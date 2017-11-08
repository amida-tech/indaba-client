import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bool from './Bool';
import Text from './Text';
import Choice from './Choice';
import Choices from './Choices';

class Questions extends Component {
    render() {
        console.log('Questions component');
        console.log(this.props);
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
            QuestionType = (<Text {...this.props} />);
        }
        return (
            <div className='questions'>
                {QuestionType}
            </div>
        );
    }
}

Questions.propTypes = {
    vocab: PropTypes.object.isRequired,
};

export default Questions;
