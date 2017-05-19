import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import StageColumn from './StageColumn';
import AssigneeCard from './AssigneeCard';

class MatrixContainer extends Component {
  render() {
    return(
      <div>
        <StageColumn />
        <AssigneeCard />
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(MatrixContainer);
