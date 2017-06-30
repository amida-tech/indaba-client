import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import IonIcon from 'react-ionicons';

import TaskStatus from '../../../../utils/TaskStatus';
import { showTaskOptionsModal } from '../../actions';
import { renderName } from '../../../../utils/User';

const Types = {
    ASSIGNEECARD: 'AssigneeCard',
};

const stageSpotTarget = {
    canDrop(props) { // Possible args: monitor
        return props.task.userId === undefined;
    },
    hover() { // Possible args: props, monitor, component
    // ... Maybe make the assignee card opaque?
    },
    drop(props) { // Possible args: monitor, component
        return (props); // Dispatch to inform the state and DB of changes.
    },
};
function collect(connector, monitor) {
    return {
        connectDropTarget: connector.dropTarget(),
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
            done: TaskStatus.responsesComplete(this.props.task, this.props.surveySize),
            flag: TaskStatus.responsesFlagged(this.props.task),
        };
        this.handleTaskOptions = this.handleTaskOptions.bind(this);
    }

    handleTaskOptions() {
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
        return '';
    }

    displayStatus() {
        if (this.state.done) {
            return this.props.vocab.DONE;
        }
        if (this.state.late) {
            return this.props.vocab.LATE;
        }
        return '';
    }

    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
        return connectDropTarget(
        <div className={`stage-slot ${this.props.filtered ? 'stage-slot__filtered' : ''}`}>
            {this.props.user &&
                <div>
                    <div className='stage-slot__name-row'>
                        <Link to={`/task-review/${this.props.project.id}/${this.props.task.id}`}>
                            <span>{renderName(this.props.user)}</span>
                        </Link>
                        <button className='stage-slot__masked-button stage-slot__right-icon'
                            onClick={this.handleTaskOptions}>
                            <IonIcon icon='ion-ios-more'/>
                        </button>
                    </div>
                    <div>
                        <span className='stage-slot__role-span'>{this.props.vocab.ASSIGNEE}</span>
                        {this.state.flag &&
                            <IonIcon className='stage-slot__right-icon' icon='ion-ios-flag'/>
                        }
                    </div>
                    <div className='stage-slot__due-row'>
                        <div>
                            {this.displayDueTime()} &nbsp; <span>{this.displayStatus()}</span>
                        </div>
                    </div>
             </div>
         }
         {!this.props.user &&
             <div>
                 <label className='inline'>
                     <IonIcon className='stage-slot__left-icon' icon='ion-ios-plus'/>
                    {this.props.vocab.ASSIGN_TASK}
                 </label>
             </div>
         }
        {isOver && canDrop}
        </div>,
    );
    }
}

const mapDispatchToProps = dispatch => ({
    showTaskOptionsModal: task => dispatch(showTaskOptionsModal(task)),
});

export default compose(
  DropTarget(Types.ASSIGNEECARD, stageSpotTarget, collect),
  connect(null, mapDispatchToProps),
)(StageSlot);
