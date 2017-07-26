import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TasksTab extends Component {
    render() {
        return (
            <div className='tasks-tab'>
                <div className='task-tab__row'>
                    <div className='task-tab__cell task-tab__cell--header'>
                        {this.props.vocab.PROJECT.STAGE}
                    </div>
                    <div className='task-tab__cell task-tab__cell--header'>
                        {this.props.vocab.COMMON.SUBJECTS}
                    </div>
                </div>
                {this.props.project.stages.map(stage =>
                    this.props.tasks.some(task => task.userId === this.props.userId
                        && task.stage === stage.id) &&
                    <div className='task-tab__row' key={stage.id}>
                        <div className='task-tab__cell'>
                            {stage.title}
                        </div>
                        <div className='task-tab__cell'>
                            {this.props.tasks.filter(task =>
                                task.userId === this.props.userId &&
                                task.stage === stage.id)
                                .map(task => this.props.project.subjects[task.subject])
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
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TasksTab;
