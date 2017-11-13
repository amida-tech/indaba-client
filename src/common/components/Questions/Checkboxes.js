import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { unionBy } from 'lodash';

class Checkboxes extends Component {
    render() {
        return (
            <div className='bool' >
                { !this.props.choicesId &&
                    <div className='bool__label'>
                        {this.props.text}
                    </div> }
                <input className={`bool__field${this.props.displayMode ? '--disabled' : ''}`}
                    type='checkbox'
                    disabled={this.props.displayMode}
                    defaultChecked={this.props.answer ? this.props.answer.boolValue : false}
                    onClick={(event) => {
                        const entry = this.props.choicesId ?
                        { choices: unionBy([{ id: this.props.choicesId,
                            boolValue: event.target.checked }],
                                this.props.answer, 'id') } :
                            { boolValue: !this.props.answer };
                        return this.props.actions.upsertAnswer(
                                    this.props.id,
                                    entry,
                                    this.props.required,
                            );
                    }} />
                { this.props.choicesId &&
                    <span className='bool__choices-label'>
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
