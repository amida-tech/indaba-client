import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';

class EditableTextInput extends Component {
    render() {
        return (
            <div className='editable-text-input'>
                <input className='editable-text-input__text-input'
                    type='text'
                    {...this.props.input}>
                </input>
                <IonIcon className='editable-text-input__icon'
                    icon='ion-android-create'/>
            </div>
        );
    }
}

EditableTextInput.propTypes = {
    placeholder: PropTypes.string,
    input: PropTypes.shape({
        value: PropTypes.string,
        onChange: PropTypes.func,
    }),
};

export default EditableTextInput;
