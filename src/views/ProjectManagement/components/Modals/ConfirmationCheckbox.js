import React, { Component } from 'react';
import IonIcon from 'react-ionicons';

class AndroidCheckbox extends Component {
    render() {
        return (
            <IonIcon
                icon={this.props.checked ? 'ion-android-checkbox' : 'ion-android-checkbox-outline-blank'}
                className={`android-checkbox confirmation-checkbox--${this.props.checked}`} />
        );
    }
}

class ConfirmationCheckbox extends Component {
    render() {
        return (
            <label>
                <input type='checkbox'
                    className='ion-replaced-checkbox'
                    checked={this.props.input.value}
                    value={this.props.input.value}
                    onChange={this.props.input.onChange}/>
                <AndroidCheckbox checked={this.props.input.value} />
                {this.props.label}
            </label>
        );
    }
}

export default ConfirmationCheckbox;
