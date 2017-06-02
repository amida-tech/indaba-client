import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import IonIcon from 'react-ionicons';
import TaskStatus from '../../../../utils/TaskStatus';

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
    const diff = TaskStatus.daysUntilDue(this.props.assignee, [this.props.stageData]);
    var late = (diff <= 0);
    this.state = { diff, late, done: TaskStatus.responsesComplete(this.props.assignee)};
  }

  displayDueTime(){
    if(this.state.done) {
      return (this.props.vocab.DONE);
    } else if(this.state.diff <= 0) {
      return (this.props.vocab.LATE);
    } else if (this.state.diff === 1){
      return (this.props.vocab.DUE_TOMORROW);
    } else if (this.state.diff > 1) {
      return (this.props.vocab.DUE_IN + this.state.diff + this.props.vocab.DAYS);
    }
  }

  displayStatus(){
    if(this.state.done) {
      return this.props.vocab.DONE;
    }
    if(this.state.late) {
      return this.props.vocab.LATE;
    }
  }

  render() {
    const display = this.props.assignee.name ?
      <div>
        <div className='name-row'>
          <span>{this.props.assignee.name}</span>
          <IonIcon className='right-icon' icon='ion-ios-more'/>
        </div>
        <div>
          <span className='role-span'>{this.props.vocab.ASSIGNEE}</span>
          {this.state.done && <IonIcon className='right-icon' icon='ion-ios-flag'/> }
        </div>
        <div className='due-row'>
          <div>{this.displayDueTime()} &nbsp; <span>{this.displayStatus()}</span></div>
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
      <div className={`stageslot workflow ${this.props.filtered ? 'stageslot-filtered' : ''}`}>
        {display}
        {isOver && canDrop}
      </div>
    )
  }
}

export default DropTarget(Types.ASSIGNEECARD, stageSpotTarget, collect)(StageSlot);
