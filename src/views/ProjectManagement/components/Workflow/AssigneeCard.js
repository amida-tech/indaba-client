import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
/* Take in props for name, function for whatever edit will be,
   state of completion and the date the task is due. Based on
   the last two factors, decide whether to flag as late, not
   started. in progress or done.
*/
const Types = {
  ASSIGNEECARD: 'AssigneeCard'
};

const cardSource = {
  canDrag(props) {
    //console.log(props.isReady);
    return true;
  },
  isDragging(props, monitor) {
    console.log("omg omg omg draggin'!");
    return monitor.getItem().id === props.id;
  },
  beginDrag(props, monitor, component) {
    const item = {id: props.id};
    return item;
  },
  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
       return;
    }
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class AssigneeCard extends Component {
  render() {
    const { id } = this.props;
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource (
      <div className="assigneecard workflow">
        Assignee {id}
        {isDragging && '(Stop touching me!)'}
      </div>
    );
  }
}

export default DragSource(Types.ASSIGNEECARD, cardSource, collect)(AssigneeCard);
