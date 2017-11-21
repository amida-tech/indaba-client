import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

class MessageBodyField extends Component {
    render() {
        return (
            <div className='message-body-field'>
                {
                    this.props.input ?
                    <Field component='textarea'
                        className='message-body-field__value'
                        name={this.props.name}
                        autoFocus/> :
                    <div className='message-body-field__value'>
                        {this.props.value}
                    </div>
                }
            </div>
        );
    }
}

MessageBodyField.propTypes = {
    input: PropTypes.bool,

    name: PropTypes.string,
    value: PropTypes.string,
};

export default MessageBodyField;
