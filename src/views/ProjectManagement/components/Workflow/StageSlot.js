import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { compose } from 'redux';
import IonIcon from 'react-ionicons';

import TaskStatus from '../../../../utils/TaskStatus';
import StatusLabel, { StatusLabelType } from '../../../../common/components/StatusLabel';
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
        this.handleTaskOptions = this.handleTaskOptions.bind(this);
    }

    handleTaskOptions() {
        this.props.showTaskOptionsModal(this.props.task);
    }

    displayDueTime(done, diff) {
        if (done) {
            return '';
        } else if (diff <= 0) {
            return '';
        } else if (diff === 1) {
            return this.props.vocab.DUE_TOMORROW;
        } else if (diff > 1) {
            return this.props.vocab.DUE_IN + diff + this.props.vocab.DAYS;
        }
        return '';
    }

    displayStatus(done, diff) {
        if (done) {
            return { label: this.props.vocab.DONE, type: StatusLabelType.GOOD };
        }
        if (diff <= 0) {
            return { label: this.props.vocab.LATE, type: StatusLabelType.BAD };
        }
        if (!TaskStatus.responsesExist(this.props.task)) {
            return { label: this.props.vocab.NOT_STARTED, type: StatusLabelType.NEUTRAL };
        }
        return null;
    }

    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;

        const diff = TaskStatus.daysUntilDue(this.props.task);
        const done = TaskStatus.responsesComplete(this.props.task, this.props.surveySize);

        const labelDisplay = this.displayStatus(done, diff);

        return connectDropTarget(
        <div className={`stage-slot ${this.props.filtered ? 'stage-slot__filtered' : ''}`}>
            {this.props.user &&
                <div className='stage-slot__container'>
                    <div className='stage-slot__name-row'>
                        <Link to={`/task-review/${this.props.project.id}/${this.props.task.id}`}>
                            <span>{renderName(this.props.user)}</span>
                        </Link>
                        <button className='stage-slot__masked-button stage-slot__right-icon'
                            title='Task Options'
                            onClick={this.handleTaskOptions}>
                            <IonIcon icon='ion-ios-more'/>
                        </button>
                    </div>
                    <div className='stage-slot__flag-row'>
                        <span className='stage-slot__role-span'>{this.props.vocab.ASSIGNEE}</span>
                        {TaskStatus.responsesFlagged(this.props.task) &&
                            <div className='stage-slot__right-icon-container'>
                                <IonIcon className='stage-slot__right-icon' icon='ion-ios-flag'/>
                            </div>
                        }
                    </div>
                    <div className='stage-slot__due-row'>
                        <div className='stage-slot__due-time'>
                            {this.displayDueTime(done, diff)}
                        </div>
                        { labelDisplay && <StatusLabel {...labelDisplay} /> }
                    </div>
             </div>
         }
         {!this.props.user &&
             <div className='stage-slot__unassigned'>
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
