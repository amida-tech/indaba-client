import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

class MessageField extends Component {
    render() {
        return (
            <div className='message-field'>
                <div className='message-field__label'>{this.props.label}: </div>
                {
                    this.props.input ?
                    <Field component={this.props.component || 'input'}
                        {...this.props.componentProps}
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
