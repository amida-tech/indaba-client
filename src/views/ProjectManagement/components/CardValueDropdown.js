import React, { Component } from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import IonIcon from 'react-ionicons';

class CardValueDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: false
    };
  }
  toggleFocus() {
    this.setState(Object.assign({}, this.state, {focus: !this.state.focus}));
  }
  handleClickOutside() {
    this.setState(Object.assign({}, this.state, {focus: false}));
  }
  render() {
    return (
      <div className='card-value card-value-select' onClick={this.toggleFocus.bind(this)}>
        {this.props.value}
        <IonIcon icon='ion-ios-arrow-down' className='card-value-select-arrow' color='#A4AEBF'/>
        <div
          className={`card-value-options ${this.state.focus ? 'card-value-options-open' : ''}`}>
          {this.props.options.map(option =>
            <div
              className='card-value-option'
              key={option.value}
              onClick={() => this.props.onClick(option.value)}>
              {option.label}
            </div>)}
        </div>
      </div>
    )
  }
}

export default enhanceWithClickOutside(CardValueDropdown);
