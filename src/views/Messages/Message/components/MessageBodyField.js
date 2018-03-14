import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const inputComponent = ({ input, meta: { touched, error } }) =>
(
    <textarea className={`message-body-field__value ${(touched && error) ? 'message-body-field__value--error' : ''}`}
        autoFocus
        {...input}/>
);

class MessageBodyField extends Component {
    render() {
        return (
            <div className='message-body-field'>
                {
                    this.props.input ?
                    <Field component={inputComponent}
                        name={this.props.name}/> :
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
