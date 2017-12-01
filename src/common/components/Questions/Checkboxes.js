import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unionBy, find } from 'lodash';

class Checkboxes extends Component {
    render() {
        const choicesCheck = find(this.props.answer.choices, item =>
            item.id === this.props.choicesId);
        const choicesAnswer = choicesCheck ? choicesCheck.boolValue : false;
        return (
            <div className='checkboxes' >
                { !this.props.choicesId &&
                    <div className='checkboxes__label'>
                        {this.props.text}
                    </div> }
                <input className={`checkboxes__field${this.props.displayMode ? '--disabled' : ''}`}
                    type='checkbox'
                    disabled={this.props.displayMode}
                    defaultChecked={choicesAnswer}
                    onClick={(event) => {
                        const entry = this.props.choicesId ?
                        { choices: unionBy([{ id: this.props.choicesId,
                            boolValue: event.target.checked }], this.props.answer.choices, 'id') } :
                        { boolValue: event.target.checked };
                        return this.props.upsertAnswer(entry);
                    }} />
                { this.props.choicesId &&
                    <span className='checkboxes__choices-label'>
                        {` ${this.props.choicesText}`}
                    </span> }
            </div>
        );
    }
}

Checkboxes.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Checkboxes;
