import React, { Component } from 'react';
import { Layer } from 'grommet';

class Modal extends Component {
  render() {
    return (
      <Layer align="center"
        closer={true}
        flush={true}
        onClose={this.props.onClose}>
        {this.props.content}
      </Layer>
    );
  }
}

export default Modal;
