import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unionBy } from 'lodash';

class Text extends Component {
    render() {
        return (
            <div className='text' >
                { !this.props.choicesId &&
                    <div className='text__label'>
                        {this.props.text}
                    </div> }
                <input className={`text__field${this.props.displayMode ? '--disabled' : ''}`}
                    placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                    type='text'
                    disabled={this.props.displayMode}
                    defaultValue={this.props.answer ? this.props.answer.textValue : ''}
                    onBlur={(event) => {
                        const entry = (this.props.choicesId !== undefined ?
                        { choices: unionBy(this.props.answer, [{
                            id: this.props.choicesId,
                            textValue: event.target.value }], 'id') } :
                            { textValue: event.target.value });
                        return this.props.actions.upsertAnswer(
                                    this.props.id,
                                    entry,
                                    this.props.required,
                                );
                    }}
                />
            </div>
        );
    }
}

Text.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Text;
