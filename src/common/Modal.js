import React, { Component } from 'react';
import Layer from 'grommet/components/Layer';

class Modal extends Component {
  render() {
    return (
      <Layer align="center" closer={true}>
        Stuff will go here.
      </Layer>
    );
  }
}

export default Modal;
