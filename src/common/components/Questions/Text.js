import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form';

class Text extends Component {
    render() {
        console.log('text component');
        console.log(this.props);
        return (
            <div className='text'>
                <label className='text__label'>
                    <Field name='email'
                        component='input'
                        type='text'
                        className='text__field'/>
                </label>
            </div>
        );
    }
}

Text.propTypes = {
    type: PropTypes.string.isRequired,
    common: PropTypes.bool,
    text: PropTypes.string.isRequired,
    required: PropTypes.bool,
};

export default Text;
