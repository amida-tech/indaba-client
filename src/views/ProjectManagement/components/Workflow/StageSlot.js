import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import IonIcon from 'react-ionicons';
import TaskStatus from '../../../../utils/TaskStatus';
import TaskView from '../Modals/TaskView';

const Types = {
    ASSIGNEECARD: 'AssigneeCard',
};

const stageSpotTarget = {
    canDrop(props, monitor) { // Checks if we can make the drop.
        return (props.assignee.unassigned === true);
    },
    hover(props, monitor, component) {
    // ... Maybe make the assignee card opaque?
    },
    drop(props, monitor, component) {
        return (props); // Dispatch to inform the state and DB of changes.
    },
};
function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
        itemType: monitor.getItemType(),
    };
}

class StageSlot extends Component {

    constructor(props) {
        super(props);
        const diff = TaskStatus.daysUntilDue(this.props.assignee, [this.props.stageData]);
        const late = (diff <= 0);
        this.state = {
            diff,
            late,
            done: TaskStatus.responsesComplete(this.props.assignee),
            flag: TaskStatus.responsesFlagged(this.props.assignee),
            showTaskModal: false,
        };
        this.onTaskViewClick = this.onTaskViewClick.bind(this);
    }

    renderTaskViewModal() {
        if (!this.state.showTaskModal) return null;
        return <TaskView
            vocab={this.props.vocab}
            assignee={this.props.assignee}
            stageData={this.props.stageData}
            project={this.props.project}
            onCancel={() => this.setState({ showTaskModal: false })} />;
    }

    onTaskViewClick() {
        this.setState({ showTaskModal: true });
    }

    onTaskOptionClick() {
    }

    displayDueTime() {
        if (this.state.done) {
            return (this.props.vocab.DONE);
        } else if (this.state.diff <= 0) {
            return (this.props.vocab.LATE);
        } else if (this.state.diff === 1) {
            return (this.props.vocab.DUE_TOMORROW);
        } else if (this.state.diff > 1) {
            return (this.props.vocab.DUE_IN + this.state.diff + this.props.vocab.DAYS);
        }
    }

    displayStatus() {
        if (this.state.done) {
            return this.props.vocab.DONE;
        }
        if (this.state.late) {
            return this.props.vocab.LATE;
        }
    }

    render() {
        const display = this.props.assignee.name ?
      <div>
          {this.renderTaskViewModal()}
        <div className='name-row'>
          <span onClick={this.onTaskViewClick}>{this.props.assignee.name}</span>
          <button className='masked-button right-icon' onClick={this.onTaskOptionClick}>
            <IonIcon icon='ion-ios-more'/>
          </button>
        </div>
        <div>
          <span className='role-span'>{this.props.vocab.ASSIGNEE}</span>
          {this.state.flag && <IonIcon className='right-icon' icon='ion-ios-flag'/> }
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
      </div>,
    );
    }
}

export default compose(
  DropTarget(Types.ASSIGNEECARD, stageSpotTarget, collect),
  connect(),
)(StageSlot);
