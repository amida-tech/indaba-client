import React, { Component } from 'react';

class ToggleSwitch extends Component {

  _determineView(blockName, stateCondition, orientation) {
    const determineClassName = () => {
      if(orientation==='vertical') {
        return blockName + '__toggle-switch-container';
      }
      else if(orientation==='horizontal') {
        return blockName + '__toggle-switch-container ' + blockName + '__toggle-switch-container--horizontal';
      } else {
        return blockName + '__toggle-switch-container';
      }
    };

    const isHorizontalAppend = this.props.orientation === 'horizontal'
      ? '--horizontal' : ''

    const classNameObject = {
      classNameA: this.props.stateCondition
        ? blockName + '__toggle-switch-button--on' + isHorizontalAppend
        : blockName + '__toggle-switch-button--off' + isHorizontalAppend,
      classNameB: this.props.stateCondition
        ? blockName + '__toggle-switch-button--off' + isHorizontalAppend
        : blockName + '__toggle-switch-button--on' + isHorizontalAppend,
    };

    return (
      <div
        className={determineClassName()}
        onClick={() => this.props.onClickAction()}
      >
        <div className={blockName + '__toggle-switch-header-label'}>
          {this.props.prompt}
        </div>
        <div className={classNameObject.classNameA}>
          {this.props.aBtnText}
        </div>
        <div className={classNameObject.classNameB}>
          {this.props.bBtnText}
        </div>
      </div>
    );
  }

  render() {
    // TODO: Would like to make the header-label adjust position ('top' or 'left')
    // ...but would need to create a separate layout for this mode
    // For now, header-label will always be on top of buttons

    // String value of either 'vertical' (stacked buttons) or 'horizontal' (side-by-side)
    const orientation = this.props.orientation;
    // Boolean value that determines state for buttons
    const stateCondition = this.props.stateCondition;
    // String value for className declarations
    const blockName = this.props.blockName;

    return (
      this._determineView(blockName, stateCondition, orientation)
    );
  }
}

export default ToggleSwitch;
