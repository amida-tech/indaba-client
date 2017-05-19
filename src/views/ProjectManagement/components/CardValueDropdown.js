import React, { Component } from 'react';

class CardValueDropdown extends Component {
  render() {
    return (
      <div className='card-value card-value-select' tabIndex="0">
        {this.props.value}
        <span className='card-value-select-arrow'></span>
        <div className='card-value-options'>
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

export default CardValueDropdown;
