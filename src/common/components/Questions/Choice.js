import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unionBy } from 'lodash';

class Choice extends Component {
    render() {
        return (
            <div className='choice'>
                { !this.props.choicesId &&
                    <div className='choice__label'>
                        {this.props.text}
                    </div> }
                {this.props.choices.map(choice =>
                    <div className='choice__radio'
                        key={`key-choice-${choice.id}`}>
                        <input className={`choice__field${this.props.displayMode ? '--disabled' : ''}`}
                            type='radio'
                            name={`choice${this.props.id}`}
                            value={choice.id}
                            defaultChecked={choice.id === this.props.answer.choice}
                            disabled={this.props.displayMode}
                            onChange={(event) => {
                                const entry = (this.props.choicesId !== undefined ?
                                { choices: unionBy(this.props.answer, [{
                                    id: this.props.choicesId,
                                    choice: parseInt(event.target.value, 10) }], 'id') } :
                                    { choice: parseInt(event.target.value, 10) });
                                return this.props.actions.upsertAnswer(
                                            this.props.id,
                                            entry,
                                            this.props.required,
                                    );
                            }}
                        />
                        <span className='choice__field-label'>
                            {` ${choice.text}`}
                        </span>
                    </div>,
                )}
            </div>
        );
    }
}

Choice.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Choice;
