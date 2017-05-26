import React, { Component } from 'react';
import IonIcon from 'react-ionicons';

class AndroidCheckbox extends Component {
  render() {
    return (
      <IonIcon
        icon={this.props.checked ? 'ion-android-checkbox' : 'ion-android-checkbox-outline-blank'}
        color={this.props.checked ? '#4EB276' : '#DADCDE'}
        className='android-checkbox' />
    );
  }
}

class ConfirmationCheckbox extends Component {
  render() {
    return (
      <label>
      <input type='checkbox'
        className='ion-replaced-checkbox'
        checked={this.props.checked}
        onChange={event => this.props.onCheck(this.props.name, event.target.checked)}/>
      <AndroidCheckbox checked={this.props.checked} />
      {this.props.label}
    </label>);
  }
}

export default ConfirmationCheckbox;
