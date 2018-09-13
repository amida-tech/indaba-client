import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unionBy } from 'lodash';

class Choice extends Component {
    render() {
        return (
            <div className='choice'>
                {this.props.choices.map(choice => <div className='choice__radio'
                    key={`key-choice-${choice.id}`}>
                    <input className={`choice__field choice__field${this.props.displayMode ? '--disabled' : ''}`}
                        type='radio'
                        name={`choice${this.props.id}`}
                        value={choice.id}
                        defaultChecked={this.props.answer
                            ? choice.id === this.props.answer.choice : false }
                        onChange={(event) => {
                            const entry = (this.props.choicesId !== undefined
                                ? {
                                    choices: unionBy([{
                                        id: this.props.choicesId,
                                        choice: parseInt(event.target.value, 10),
                                    }], this.props.answer, 'id'),
                                }
                                : { choice: parseInt(event.target.value, 10) });
                            this.props.upsertAnswer(entry);
                        } }
                        disabled={this.props.displayMode} />
                    <span className='choice__field-label'>
                        {` ${choice.text}`}
                    </span>
                </div>)}
            </div>
        );
    }
}

Choice.propTypes = {
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Choice;
