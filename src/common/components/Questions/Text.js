import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import { isValid } from '../../../utils/Validation';

class Text extends Component {
    render() {
        let warn = '';
        return (
            <div className='text' >
                <div className='text__label'>
                    {this.props.text}
                </div>
                <Field name='email'
                    component='input'
                    placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                    type='text'
                    onChange={(event) => {
                        warn = isValid(['letters'], event.target.value, this.props.vocab.VALIDATE);
                    }}
                    onBlur={(event) => {
                        console.log(warn);
                        if (!warn) {
                            this.props.actions.postAnswer(event.target.value);
                        }
                    }}
                    className='text__field'/>
            </div>
        );
    }
}

Text.propTypes = {
    vocab: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Text;
