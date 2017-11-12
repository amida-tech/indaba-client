import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Bool from './Bool';
import Text from './Text';
import Choice from './Choice';

class Choices extends Component {
    render() {
        const choices = this.props.choices.map((choice) => {
            console.log(choice);
            switch (choice.type) {
            case 'bool':
                return (<Bool
                    key={`key-choice-${choice.id}`}
                    choicesId={choice.id}
                    choicesText={choice.text}
                    {...this.props}/>);
            case 'choice':
                return (<Choice
                    key={`key-choice-${choice.id}`}
                    choicesId={this.props.id}
                    {...this.props} />);
            default:
                return (<Text
                    key={`key-choice-${choice.id}`}
                    choicesId={this.props.id}
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
