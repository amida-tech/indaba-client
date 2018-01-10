import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Bool extends Component {
    render() {
        return (
            <div className='bool' >
                <label className='bool__field'>
                    <input className={`bool__input${this.props.displayMode ? '--disabled' : ''}`}
                        type='radio'
                        name={`bool${this.props.id}`}
                        disabled={this.props.displayMode}
                        defaultChecked={this.props.answer ? this.props.answer.boolValue : false}
                        onClick={() => this.props.upsertAnswer({ boolValue: true }) } />
                    <span className='bool__label'>
                        {this.props.vocab.COMMON_BUTTONS.YES}
                    </span>
                </label>
                <label className='bool__field'>
                    <input className={`bool__input${this.props.displayMode ? '--disabled' : ''}`}
                        type='radio'
                        name={`bool${this.props.id}`}
                        disabled={this.props.displayMode}
                        defaultChecked={this.props.answer ? !this.props.answer.boolValue : false}
                        onClick={() => this.props.upsertAnswer({ boolValue: false }) } />
                    <span className='bool__label'>
                        {this.props.vocab.COMMON_BUTTONS.NO}
                    </span>
                </label>
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
