import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import IonIcon from 'react-ionicons';
import { Search } from 'grommet';
import { flatten } from 'lodash';

import TaskStatus from '../../../../utils/TaskStatus';
import StatusLabel, { StatusLabelType } from '../../../../common/components/StatusLabel';
import * as actions from '../../actions';
import * as taskActions from '../../../../common/actions/taskActions';
import { renderName } from '../../../../utils/User';

const Types = {
    ASSIGNEECARD: 'AssigneeCard',
};

const stageSpotTarget = {
    canDrop(props, monitor) {
        if (props.task.userId !== undefined) {
            return false;
        }
        return flatten(props.stageData.userGroups.map(id =>
            props.project.userGroups.find(group => group.id === id).users),
            ).includes(monitor.getItem().id);
    },
    drop(props) {
        return props; // Dispatch to inform the state and DB of changes.
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
        this.filterToStageGroups = this.filterToStageGroups.bind(this);
        this.filterToQuery = this.filterToQuery.bind(this);
    }

    handleTaskOptions() {
        this.props.actions.showTaskOptionsModal(this.props.task,
            this.props.stageData.userGroups);
    }
    handleSearchSelect(selection) {
        this.props.actions.assignTask(selection.suggestion.value.id,
        { stageData: this.props.stageData, task: this.props.task },
        this.props.project,
        this.props.vocab);
        this.props.actions.startTaskAssign(false);
    }
    filterToStageGroups(user) {
        return user.usergroupId.some(groupId => this.props.stageData.userGroups.includes(groupId));
    }
    filterToQuery(user) {
        return renderName(user).toLowerCase().includes(this.props.assignTaskQuery.toLowerCase());
    }

    displayDueTime(done, diff) {
        if (done) {
            return '';
        } else if (diff <= 0) {
            return '';
        }
        if (diff > 0 && diff < 1) {
            return this.props.vocab.PROJECT.CARD.DUE_TODAY;
        } else if (diff >= 1 && diff < 2) {
            return this.props.vocab.PROJECT.CARD.DUE_TOMORROW;
        } else if (diff > 1) {
            return this.props.vocab.PROJECT.CARD.DUE_IN + diff + this.props.vocab.PROJECT.CARD.DAYS;
        }
        return '';
    }

    displayStatus(done, diff) {
        if (done) {
            return { label: this.props.vocab.PROJECT.CARD.DONE, type: StatusLabelType.GOOD };
        }
        if (diff <= 0) {
            return { label: this.props.vocab.PROJECT.CARD.LATE, type: StatusLabelType.BAD };
        }
        if (!this.props.task.flagHistory && this.props.task.assessmentStatus === 'new') {
            return {
                label: this.props.vocab.PROJECT.CARD.NOT_STARTED,
                type: StatusLabelType.NEUTRAL };
        }
        return null;
    }

    render() {
        const { isOver, canDrop, connectDropTarget } = this.props;
        const diff = TaskStatus.daysUntilDue(this.props.task);
        const done = this.props.task.status === 'completed';
        const labelDisplay = this.displayStatus(done, diff);
        let stageClass = 'stage-slot ';
        if (this.props.filtered) {
            stageClass += 'stage-slot__filtered';
        }
        if (isOver && canDrop) {
            stageClass += 'stage-slot--accept';
        } else if (isOver && !canDrop) {
            stageClass += 'stage-slot--deny';
        }
        return connectDropTarget(
        <div className={stageClass}>
            {this.props.user &&
                <div className='stage-slot__container'>
                    <div className='stage-slot__name-row'>
                        <Link to={{
                            pathname: `/task-review/${this.props.project.id}/${this.props.task.id}`,
                            state: { referrer: document.location.pathname },
                        }}>
                            <span>{renderName(this.props.user)}</span>
                        </Link>
                        <button className='stage-slot__masked-button stage-slot__right-icon'
                            title= {this.props.vocab.PROJECT.CARD.TASK_OPTIONS}
                            onClick={this.handleTaskOptions}>
                            <IonIcon icon='ion-ios-more'/>
                        </button>
                    </div>
                    <div className='stage-slot__flag-row'>
                        <span className='stage-slot__role-span'>
                            {this.props.vocab.PROJECT.CARD.ASSIGNEE}
                        </span>
                        {this.props.task.flagged &&
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
                            value={this.props.assignTaskQuery}
                            onDOMChange={evt =>
                                this.props.actions.setAssignTaskQuery(evt.target.value)}
                            suggestions={this.props.users
                                .filter(this.filterToStageGroups)
                                .filter(this.filterToQuery)
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
                        {this.props.vocab.PROJECT.CARD.ASSIGN_TASK}
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
    assignTaskQuery: state.manager.ui.assignTaskQuery,
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(Object.assign({}, actions, taskActions), dispatch),
});

export default compose(
  DropTarget(Types.ASSIGNEECARD, stageSpotTarget, collect),
  connect(mapStateToProps, mapDispatchToProps),
)(StageSlot);
