import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

class MessageField extends Component {
    render() {
        return (
            <div className='message-field'>
                <div className='message-field__label'>{this.props.label}</div>
                {
                    this.props.input ?
                    <Field component='input'
                        className='message-field__value'
                        name={this.props.name}/> :
                    <div className='message-field__value'>
                        {this.props.value}
                    </div>
                }
            </div>
        );
    }
}

MessageField.propTypes = {
    label: PropTypes.string.isRequired,

    input: PropTypes.bool,

    name: PropTypes.string,
    value: PropTypes.string,
};

export default MessageField;
