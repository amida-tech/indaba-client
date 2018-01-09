import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unionBy } from 'lodash';

class Text extends Component {
    render() {
        let currentAnswer;
        if (this.props.choicesId) {
            currentAnswer = find(this.props.answer.choices, item =>
                    item.id === this.props.choicesId);
        } else if (this.props.answer) {
            currentAnswer = this.props.answer.textValue;
        } else {
            currentAnswer = '';
        }
        return (
            <div className='text'>
                <input className={`text__field${this.props.displayMode ? '--disabled' : ''}`}
                    placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                    type='text'
                    disabled={this.props.displayMode}
                    defaultValue={currentAnswer}
                    onBlur={(event) => {
                        const entry = (this.props.choicesId !== undefined ?
                        { choices: unionBy([{ id: this.props.choicesId,
                            textValue: event.target.value }], this.props.answer, 'id') } :
                        { textValue: event.target.value });
                        this.props.upsertAnswer(entry);
                    }}
                />
            </div>
        );
    }
}

Text.propTypes = {
    answer: PropTypes.object,
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Text;
