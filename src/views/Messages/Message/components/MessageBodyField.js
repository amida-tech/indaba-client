import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

class MessageBodyField extends Component {
    render() {
        return (
            <div className='message-body-field'>
                {
                    this.props.input ?
                    <Field component={
                            (
                                props =>
                                <textarea className={`message-body-field__value ${(props.meta.touched && props.meta.error) ? 'message-body-field__value--error' : ''}`}
                                    autoFocus
                                    {...props.input}/>
                            )
                        }
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
