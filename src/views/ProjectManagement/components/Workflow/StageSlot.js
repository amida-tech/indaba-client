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
      <div>
        <div className='name-row'>
          <span>{this.props.name}</span>
          <IonIcon className='right-icon' icon='ion-ios-more'/>
        </div>
        <div>
          <span className='role-span'>{this.props.vocab.ASSIGNEE}</span>
          <IonIcon className='right-icon' icon='ion-ios-flag'/>
        </div>
        <div className='due-row'>
          Whatever
        </div>
      </div> :
      <div>
        <label className='inline'>
          <IonIcon className='left-icon' icon='ion-ios-plus'/>{this.props.vocab.ASSIGN_TASK}
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
