import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import IonIcon from 'react-ionicons';

import TaskStatus from '../../../../utils/TaskStatus';
import { showTaskOptionsModal } from '../../actions';

const Types = {
    ASSIGNEECARD: 'AssigneeCard',
};

const stageSpotTarget = {
    canDrop(props, monitor) { // Checks if we can make the drop.
        return props.task.unassigned === true;
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
        const diff = TaskStatus.daysUntilDue(this.props.task, [this.props.stageData]);
        const late = (diff <= 0);
        this.state = {
            diff,
            late,
            done: TaskStatus.responsesComplete(this.props.task),
            flag: TaskStatus.responsesFlagged(this.props.task),
        };
        this.handleTaskOptions = this.handleTaskOptions.bind(this);
    }

    handleTaskOptions(){
        this.props.showTaskOptionsModal(this.props.task);
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
    const { position, isOver, canDrop, connectDropTarget } = this.props;
    return connectDropTarget(
        <div className={`stageslot workflow ${this.props.filtered ? 'stageslot-filtered' : ''}`}>
            {this.props.user &&
                <div>
                    <div className='name-row'>
                        <Link to={'/task-review/' + this.props.project.id+'/'+this.props.task.userId}>
                            <span>{this.props.user.name}</span>
                        </Link>
                        <button className='masked-button right-icon'
                            onClick={this.handleTaskOptions}>
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
             </div>
         }
         {!this.props.user &&
             <div>
                 <label className='inline'>
                     <IonIcon className='left-icon' icon='ion-ios-plus'/>{this.props.vocab.ASSIGN_TASK}
                 </label>
             </div>
         }
        {isOver && canDrop}
        </div>,
    );
    }
}

const mapDispatchToProps = dispatch => ({
    showTaskOptionsModal: (task) => dispatch(showTaskOptionsModal(task)),
});

export default compose(
  DropTarget(Types.ASSIGNEECARD, stageSpotTarget, collect),
  connect(null, mapDispatchToProps),
)(StageSlot);
