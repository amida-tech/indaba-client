import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import IonIcon from 'react-ionicons';
import { Search } from 'grommet';

import TaskStatus from '../../../../utils/TaskStatus';
import StatusLabel, { StatusLabelType } from '../../../../common/components/StatusLabel';
import * as actions from '../../actions';
import * as taskActions from '../../../../common/actions/taskActions';
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
        this.handleSearchSelect = this.handleSearchSelect.bind(this);
    }

    handleTaskOptions() {
        this.props.actions.showTaskOptionsModal(this.props.task);
    }
    handleSearchSelect(selection) {
        this.props.actions.assignTask(selection.suggestion.value.id,
        { stageData: this.props.stageData, task: this.props.task },
        this.props.project,
        this.props.allVocab);
        this.props.actions.startTaskAssign(false);
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
                            title= {this.props.vocab.TASK_OPTIONS}
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
                  { (this.props.assignTaskInput.stepId === this.props.task.stepId &&
                     this.props.assignTaskInput.uoaId === this.props.task.uoaId) ?
                    <div className='stage-slot__assign-task-input'>
                        <Search
                            fill={true}
                            inline={true}
                            suggestions={this.props.users
                                .map(user => ({ label: renderName(user),
                                    value: user }))}
                            onSelect={this.handleSearchSelect}
                            />
                        <div className='stage-slot__assign-task-input-cancel'
                              onClick={() => this.props.actions.startTaskAssign(false)}>
                              x
                        </div>
                    </div> :
                    <div className='inline'
                      onClick={() => this.props.actions.startTaskAssign(this.props.task)}>
                        <IonIcon className='stage-slot__left-icon' icon='ion-ios-plus'/>
                        {this.props.vocab.ASSIGN_TASK}
                    </div>
                }
              </div>
         }
        {isOver && canDrop}
        </div>,
    );
    }
}

const mapStateToProps = state => ({
    assignTaskInput: state.manager.ui.assignTaskInput,
    users: state.user.users,
    allVocab: state.settings.language.vocabulary,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, taskActions), dispatch),
});

export default compose(
  DropTarget(Types.ASSIGNEECARD, stageSpotTarget, collect),
  connect(mapStateToProps, mapDispatchToProps),
)(StageSlot);
