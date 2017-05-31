import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import IonIcon from 'react-ionicons';

const Types = {
  ASSIGNEECARD: 'AssigneeCard'
};

const stageSpotTarget = {
  canDrop(props, monitor) { // Checks if we can make the drop.
    return (props.name === undefined);
  },
  hover(props, monitor, component) {
    // ... Maybe make the assignee card opaque?
  },
  drop(props, monitor, component) {
    console.log(props);
    return(props); // Dispatch to inform the state and DB of changes.
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
    const display = this.props.name ?
      <div className="container">
          <div className="row">
            <div className="col-sm-2">{this.props.name}</div>
            <div className="col-sm-1"><IonIcon icon='ion-ios-more'/></div>
          </div>
          <div className="row">
            <div className="col-sm-2">{this.props.vocab.ASSIGN_TASK}</div>
            <div className="col-sm-1"><IonIcon icon='ion-ios-flag'/></div>
          </div>
          <div className="row">
            <div className="col-sm-1"></div>
          </div>
      </div> :
      <div>
        <label className="inline">
          <IonIcon icon='ion-ios-plus'/>{this.props.vocab.ASSIGN_TASK}
        </label>
      </div>;
    const { position } = this.props;
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
