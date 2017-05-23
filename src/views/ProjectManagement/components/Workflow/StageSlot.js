import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';


const Types = {
  ASSIGNEECARD: 'AssigneeCard'
};

const stageSpotTarget = {
  canDrop(props, monitor) {
    return true;
    // Checks if we can make the drop.
  },
  hover(props, monitor, component) {
    // ... Maybe make the assignee card opaque?
  },
  drop(props, monitor, component) {
    console.log("BEHOLD!");
    console.log(component);
    const item = component;
    // Dispatch to inform the state and DB of changes.
  }
}
function collect(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}

class StageSlot extends Component {
  componentWillReceiveProps(nextProps){
    this.props = nextProps;
  }

  constructor(props) {
    super(props);
  }

  render() {
    const display = this.props.name ? this.props.name : "Assign Task";
    const { position } = this.props;
    const { item } = this.props;
    const { isOver, canDrop, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className="stageslot workflow">
        {display}
        {isOver && canDrop}
      </div>
    )
  }
}

export default DropTarget(Types.ASSIGNEECARD, stageSpotTarget, collect)(StageSlot);
