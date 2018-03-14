import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get, unionBy } from 'lodash';

class Text extends Component {
    render() {
        return (
            <div className='text'>
                <textarea className={`text__field text__field${this.props.displayMode ? '--disabled' : ''}`}
                    placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                    disabled={this.props.displayMode}
                    defaultValue={get(this.props, 'answer.textValue', '')}
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
    answer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    assessmentId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string,
    type: PropTypes.string.isRequired,
    displayMode: PropTypes.bool,
    common: PropTypes.bool,
    vocab: PropTypes.object.isRequired,
};

export default Text;
