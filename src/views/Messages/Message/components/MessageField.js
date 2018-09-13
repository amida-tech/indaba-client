import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

const inputComponent = ({ input, meta: { touched, error } }) => (
    <input className={`message-field__value ${(touched && error) ? 'message-field__value--error' : ''}`}
        {...input}/>
);

class MessageField extends Component {
    render() {
        return (
            <div className='message-field'>
                <div className='message-field__label'>{this.props.label}: </div>
                {
                    this.props.input
                        ? <Field component={
                            this.props.component
                            || inputComponent
                        }
                        {...this.props.componentProps}
                        name={this.props.name}/>
                        : <div className='message-field__value'>
                            {this.props.value}
                        </div>
                }
            </div>
        );
    }
}

MessageField.propTypes = {
    label: PropTypes.string.isRequired,

    // true if this field receives user input, false if it only renders a value
    input: PropTypes.bool,

    // used as the field name if input is true
    name: PropTypes.string,
    // optional, used as a custom input component if input is true
    component: PropTypes.any,

    // used as the value if input is false
    value: PropTypes.string,
};

export default MessageField;
