import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TasksTab extends Component {
    render() {
        return (
            <div className='tasks-tab'>
                <div className='tasks-tab__row'>
                    <div className='tasks-tab__cell tasks-tab__cell--header'>
                        {this.props.vocab.PROJECT.STAGE}
                    </div>
                    <div className='tasks-tab__cell tasks-tab__cell--header'>
                        {this.props.vocab.COMMON.SUBJECTS}
                    </div>
                </div>
                {this.props.project.stages.map(stage =>
                    this.props.tasks.some(task => task.userIds.includes(this.props.userId)
                        && task.stepId === stage.id) &&
                    <div className='tasks-tab__row' key={stage.id}>
                        <div className='tasks-tab__cell'>
                            {stage.title}
                        </div>
                        <div className='tasks-tab__cell'>
                            {this.props.tasks.filter(task =>
                                task.userIds.includes(this.props.userId) &&
                                task.stepId === stage.id)
                                .map(task => this.props.project.subjects.find(
                                    subject => subject.id === task.uoaId).name)
                                .join(',')
                            }
                        </div>
                    </div>)}
            </div>
        );
    }
}

TasksTab.propTypes = {
    vocab: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired,
    userId: PropTypes.number.isRequired,
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        userIds: PropTypes.arrayOf(PropTypes.number).isRequired,
        stepId: PropTypes.number.isRequired,
        uoaId: PropTypes.number.isRequired,
    })).isRequired,
};

export default TasksTab;
