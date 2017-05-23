import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import ProjectActions from '../../actions';
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
    const dropResult = monitor.getDropResult();
    const assignment = {
      'id': props.id,
      'name': props.name,
      'role': props.role,
      'stage': dropResult.stage,
      'subject': dropResult.subject
    };
    console.log(component.store);
    console.log(assignment);
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class AssigneeCard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps){
    console.log(this.props);
  }

  render() {
    console.log(this.props);
    const name = this.props.name;
    const { id } = this.props;
    const { isDragging, connectDragSource } = this.props;

    return connectDragSource (
      <div className="assigneecard workflow">
        {name}
        {isDragging && '(Wendy! I can fly!)'}
      </div>
    );
  }
}

export default DragSource(Types.ASSIGNEECARD, cardSource, collect)(AssigneeCard);
