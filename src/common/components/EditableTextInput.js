import React, { Component } from 'react';
import PropTypes from 'prop-types';

import IonIcon from 'react-ionicons';

class EditableTextInput extends Component {
    render() {
        return (
            <div className='editable-text-input'>
                <input className='editable-text-input'
                    type='text'
                    {...this.props.input}>
                </input>
                <IonIcon icon='ion-android-create' />
            </div>
        );
    }
}

EditableTextInput.propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default EditableTextInput;
