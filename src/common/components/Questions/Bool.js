import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bool extends Component {
    render() {
        const answer = this.props.answer ? this.props.answer.boolValue : false;
        return (
            <div className='bool' >
                <div className='bool__label'>
                    {this.props.text}
                </div>
                <label className='bool__field'>
                    <input className={`bool__input${this.props.displayMode ? '--disabled' : ''}`}
                        type='radio'
                        name={`bool${this.props.id}`}
                        disabled={this.props.displayMode}
                        defaultChecked={answer}
                        onClick={() => {
                            return this.props.actions.upsertAnswer(
                                        this.props.id,
                                        { boolValue: true },
                                        this.props.required,
                                );
                        }} />
                    {this.props.vocab.COMMON_BUTTONS.YES}
                </label>
                <label className='bool__field'>
                    <input className={`bool__input${this.props.displayMode ? '--disabled' : ''}`}
                        type='radio'
                        name={`bool${this.props.id}`}
                        disabled={this.props.displayMode}
                        defaultChecked={!answer}
                        onClick={() => {
                            return this.props.actions.upsertAnswer(
                                        this.props.id,
                                        { boolValue: false },
                                        this.props.required,
                                );
                        }} />
                    {this.props.vocab.COMMON_BUTTONS.NO}
                </label>
                { this.props.choicesId &&
                    <span className='bool__choices-label'>
                        {` ${this.props.choicesText}`}
                    </span> }
            </div>
        );
    }
}

Bool.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Bool;
