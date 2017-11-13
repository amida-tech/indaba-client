import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { find } from 'lodash';

import Checkboxes from './Checkboxes';
import Text from './Text';
import Choice from './Choice';

class Choices extends Component {
    render() {
        const choices = this.props.choices.map((choice) => {
            switch (choice.type) {
            case 'bool':
                return (<Checkboxes
                    {...this.props}
                    answer={find(this.props.answer.choices, item => item.id === choice.id) || false}
                    key={`key-choice-${choice.id}`}
                    choicesId={choice.id}
                    choicesText={choice.text} />);
            case 'choice':
                return (<Choice
                    key={`key-choice-${choice.id}`}
                    choicesId={this.props.id}
                    answer={find(this.props.answer.choices, item => item.id === choice.id)}
                    {...this.props} />);
            default:
                return (<Text
                    key={`key-choice-${choice.id}`}
                    choicesId={this.props.id}
                    answer={find(this.props.answer.choices, item => item.id === choice.id) || ''}
                    {...this.props}/>);
            }
        });

        return (
            <div className='choices'>
                <div className='choices__label'>
                    {this.props.text}
                </div>
                <div className='choices__radio'>
                    {choices}
                </div>
            </div>
        );
    }
}

Choices.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Choices;
