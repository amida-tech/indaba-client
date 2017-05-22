import React, { Component } from 'react';
import AddSubject from './AddSubject';

const modalIDToComponent = {
  'addsubject': AddSubject
};

class ModalContent extends Component {
  render() {
    const ContentComponent = modalIDToComponent[this.props.id];
    return (
        <ContentComponent {...this.props}/>
    )
  }
}

export default ModalContent;
