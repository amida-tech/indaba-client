import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Checkboxes from './Checkboxes';
import Text from './Text';

class Choices extends Component {
    render() {
        const choices = this.props.choices.map((choice) => {
            switch (choice.type) {
            case 'bool':
                return (<Checkboxes
                    {...this.props}
                    key={`key-choice-${choice.id}`}
                    choicesId={choice.id}
                    choicesText={choice.text} />);
            default:
                return (<Text
                    {...this.props}
                    key={`key-choice-${choice.id}`}
                    choicesId={choice.id} />);
            }
        });

        return (
            <div className='choices'>
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
