import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';

class Text extends Component {
    render() {
        console.log('text component');
        console.log(this.props);
        return (
            <div className='text' >
                <div className='text__label'>
                    {this.props.text}
                </div>
                <Field name='email'
                    component='input'
                    placeholder={this.props.vocab.PROJECT.ENTER_ANSWER}
                    type='text'
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
